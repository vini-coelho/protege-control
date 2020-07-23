import React, { useState } from 'react';
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

import Colors from '../styles/Colors';

import Header from '../components/Header';

export default props => {

    const [ name, setName ] = useState('');
    const [ doc, setDoc ] = useState('');
    const [ date, setDate ] = useState(new Date());
    const [ type, setType ] = useState('visitor');
    const [ comments, setComments ] = useState('');
    const [ car, setCar] = useState('')
    const [ pickerVisible, setPickerVisible ] = useState(false);

    const setDateInPicker = (dt) => {
        setPickerVisible(false);
        setDate(dt || date);
    }

    const submitForm = async () => {
        props.closeModal();
        await props.onSubmit({
            name,
            doc,
            date: moment(date).utc().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
            type,
            comments,
            car
        }).catch(err => { throw err; })
    }

    return(
        <Modal {...props}>
                <Header title='Agendar visita'
                iconLeft='close'
                onPressLeft={props.closeModal}/>
                <View style={styles.form}>
                    <TextInput 
                    style={styles.input} 
                    onChangeText={name => setName(name)}
                    placeholder='Nome do visitante*'/>

                    <TextInput  
                    style={styles.input} 
                    keyboardType='number-pad'
                    onChangeText={doc => setDoc(doc)}
                    placeholder='Número de RG*'/>

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
                    
                    <TextInput  
                    style={styles.input} 
                    onChangeText={car => setCar(car)}
                    placeholder='Placa do carro'/>

                    <TextInput  
                    style={styles.input} 
                    onChangeText={com => setComments(com)}
                    placeholder='Comentários'
                    multiline={true}
                    numberOfLines={3}/>

                    <TouchableOpacity onPress={submitForm}>
                        <Text style={styles.button}>AGENDAR VISITA</Text>
                    </TouchableOpacity>
                </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        justifyContent: 'center'
    },
    input: {
        marginBottom: 10,
        backgroundColor: Colors.yellow,
        borderRadius: 5,
        padding: 10,
        fontFamily: 'Roboto',
        fontSize: 17
    },
    form: {
        flex: 1,
        backgroundColor: Colors.light,
        padding: 20,
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