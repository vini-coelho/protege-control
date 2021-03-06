import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    TextInput, 
    Picker,
    Text, 
    Modal,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../styles/Colors';

import Header from '../../components/Header';
import { CheckBoxLabelText, LabelText, SubmitButton, ButtonText, CheckBoxRow, CheckBoxGroup, Scroll, ContainerForm } from './styles';
import Checkbox from '../../components/Checkbox/Checkbox';
import { getUser } from '../../auth';
import { USER } from '../../utils/UserTypes';

export default props => {

    const [ name, setName ] = useState('');
    const [ doc, setDoc ] = useState('');
    const [ date, setDate ] = useState(new Date());
    const [ type, setType ] = useState('visitor');
    const [ comments, setComments ] = useState('');
    const [ car, setCar] = useState('')
    const [responsible, setResponsible] = useState(null)
    const [dwellers, setDwellers] = useState([])
    
    const [ pickerVisible, setPickerVisible ] = useState(false);
    const [user, setUser] = useState(null)
    const [isChecked, setIsChecked] = useState(false)
    
    useEffect(()=>{
        const getDwellers = async ()=>{
            const _dwellers = await props.listDewllers()
            setResponsible(_dwellers[0])
            setDwellers(_dwellers)
        }
        const _getUser = async () => {
            const _user = await getUser()
            setUser(_user)
        }
        _getUser()
        getDwellers()
    },[])


    const setDateInPicker = (dt) => {
        setPickerVisible(false);
        setDate(dt || date);
    }

    const clearStates = () =>{
        setName('')
        setDoc('')
        setDate(new Date())
        setType('visitor')
        setComments('')
        setCar('')
    }

    const handleCheckBoxClick = (checked)=>{
        if(!checked)setIsChecked(!isChecked)
    }

    const submitForm = async () => {
        clearStates()
        props.closeModal();
        const hosted_by = user?.type != USER ? responsible.id : undefined
        const data = {
            name,
            doc,
            cond_id: props.cond_id,
            date: moment(date).utc().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
            type,
            comments,
            hosted_by,
            car
        }
        console.log(data);
        await props.onSubmit(data).catch(err => { throw err; })
    }

    return(
        <Modal {...props}>
            <Header title='Agendar visita'
            iconLeft='arrow-back'
            onPressLeft={props.closeModal}/>
            <View style={styles.form}>
                <Scroll>
                    <ContainerForm>
                        <View style={ styles.input }>
                            <Picker mode='dropdown'
                            style={{ padding: 0, height: 30 }} 
                            selectedValue={type}
                            onValueChange={value => setType(value)}>
                                <Picker.Item label='Visitante' value={'visitor'}/>
                                <Picker.Item label='Entregas' value={'delivery'}/>
                                <Picker.Item label='Prestador de serviços' value={'service'}/>
                            </Picker>
                        </View>
                    
                        <LabelText>Nome</LabelText>
                        <TextInput 
                        style={styles.input} 
                        onChangeText={name => setName(name)}/>

                        <LabelText>Documento</LabelText>
                        <TextInput  
                        style={styles.input} 
                        keyboardType='number-pad'
                        placeholder='RG ou CPF'
                        onChangeText={doc => setDoc(doc)}/>
                        
                        <LabelText>Possui veículo?</LabelText>
                        <CheckBoxRow>
                            <CheckBoxGroup>
                                <Checkbox checked={isChecked} onPress={checked=>handleCheckBoxClick(checked)} preventDefault={true}/>
                                <CheckBoxLabelText>SIM</CheckBoxLabelText>
                            </CheckBoxGroup>
                            <CheckBoxGroup>
                                <Checkbox checked={!isChecked} onPress={checked=>handleCheckBoxClick(checked)} preventDefault={true}/>
                                <CheckBoxLabelText>NÃO</CheckBoxLabelText>
                            </CheckBoxGroup>
                        </CheckBoxRow>

                        {isChecked && 
                            <> 
                                <LabelText>Placa</LabelText>
                                <TextInput  
                                style={styles.input} 
                                onChangeText={car => setCar(car)}/>
                            </>}

                        <TouchableHighlight onPress={() => setPickerVisible(true)}>
                            <Text style={[styles.input, { paddingVertical: 13 }]}>
                                Data da visita: {moment(date).format('DD/MM/YYYY')}
                            </Text>
                        </TouchableHighlight>

                        { pickerVisible && <DateTimePicker value={date}
                        mode='date'
                        display='calendar'
                        onTouchCancel={() => setDateInPicker(new Date())}
                        onChange={(event, date) => setDateInPicker(date)}/> }
                        
                        <LabelText>Descrição</LabelText>
                        <TextInput  
                        style={styles.input} 
                        onChangeText={com => setComments(com)}
                        multiline={true}
                        numberOfLines={3}/>

                      {user?.type != USER && <>
                        <LabelText>Responsável</LabelText>
                        <View style={ styles.input }>
                            <Picker mode='dropdown'
                            style={{ padding: 0, height: 30 }} 
                            selectedValue={responsible}
                            onValueChange={value => setResponsible(value)}>
                                {dwellers?.map( (s, i) => {
                                        return <Picker.Item key={i} value={s} label={s.name} />
                                    })}
                            </Picker>
                        </View>

                        <LabelText>Apartamento</LabelText>
                        <View style={ styles.input }>
                            <Text>{responsible?`${responsible.tower}/${responsible.apartment}`:''}</Text>
                        </View>
                      </>}
                        <SubmitButton onPress={submitForm}>
                            <ButtonText>Salvar</ButtonText>
                        </SubmitButton>
                    </ContainerForm>
                </Scroll>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
        padding: 10,
        justifyContent: 'center'
    },
    input: {
        marginBottom: 10,
        backgroundColor: Colors.white,
        borderWidth:1,
        borderColor: Colors.light,
        borderRadius: 5,
        padding: 10,
        fontFamily: 'Roboto',
        fontSize: 17
    },
    form: {
        flex: 1,
        backgroundColor: Colors.lightGray,
        shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 1,
		shadowRadius: 6,

        elevation: 3,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    button: {
        alignSelf: 'flex-end',
        color: Colors.yellow,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 15
    },
});