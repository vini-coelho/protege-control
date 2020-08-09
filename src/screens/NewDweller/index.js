import React, { useEffect, useState } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Scroll, ContainerForm, LabelText, Input, SubmitButton, ButtonText } from './styles';
import { getUser, getCond } from '../../auth';
import Header from '../../components/Header';
import { USER } from '../../utils/UserTypes';
import api from '../../services/api';
import Colors from '../../styles/Colors';
import { AlertCard } from '../../components/AlertCard';
import { AlertRow } from '../CheckIn/styles';


const NewDweller = ({navigation}) => {

    const [cond, setCond] = useState(null)
    const [loading, setLoading] = useState(false)
    const [towerLabel, setToweLabel] = useState('')
    const [apLabel, setApLabel] = useState('')

    const [name, setName] = useState('')
    const [tower, setTower] = useState('')
    const [apartment, setApartment] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    const alertText = "Lembre-se de avisar ao morador a necessidade de redefinir a senha durante o primeiro acesso."
    function setupLabel (condType){
        switch (condType) {
            case "blocks":
                setToweLabel('Bloco')
                setApLabel('Apartamento')
                break;
            case "building":
                setToweLabel('Prédio')
                setApLabel('Apartamento')
                break;
            case "towers":
                setToweLabel('Torre')
                setApLabel('Apartamento')
                break;
            case "houses":
                setToweLabel('Casa')
                setApLabel('Número da Casa')
                break;       
            default:
                break;
        }
    }

    function setupData(){
        return {
            name,
            tower,
            apartment,
            cpf: cpf.replace(/[.,\-\s]/g,''),
            email,
            password: cpf.replace(/[.,\-\s]/g,''),
            cond_id: cond.id,
            type: USER
        }
    }

    async function onSubmit() {
        setLoading(true)
        const data = setupData()
       
        await api.post('/register', data)
        .then(res =>{
            setLoading(false)
            navigation.goBack()})
        .catch(err => {
            console.log(err);
            setLoading(false)
            Alert.alert("Não foi possível cadastar morador")}) 
    }

    useEffect(()=>{
        const findUser = async () =>{
            const _cond = await getCond()
            setCond(_cond)
            setupLabel(_cond?.type)
        }
        findUser()
    },[])

  return (<>
   <Header
        iconLeft='arrow-back' 
        onPressLeft={() => navigation.goBack()}
        title='Moradores'/>
    {loading ?
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color={Colors.yellow} size='large' />
        </View>:
        <Scroll>
            <AlertRow>
                    <AlertCard text={alertText}></AlertCard>
            </AlertRow>
            <ContainerForm>
                <LabelText>Nome</LabelText>
                <Input onChangeText={value => setName(value)}></Input>
                <LabelText>{towerLabel}</LabelText>
                <Input onChangeText={value => setTower(value)}></Input>
                <LabelText>{apLabel}</LabelText>
                <Input 
                    keyboardType='number-pad'
                    onChangeText={value => setApartment(value)}></Input>
                <LabelText>Documento</LabelText>
                <Input 
                    keyboardType='number-pad'
                    onChangeText={value => setCpf(value)}
                    placeholder='RG ou CPF'
                ></Input>
                <LabelText>E-mail</LabelText>
                <Input 
                    onChangeText={value => setEmail(value)}></Input>
                {/* <LabelText>Senha</LabelText>
                <Input onChangeText={value => setPassword(value)}></Input>
                <LabelText>Confirmar Senha</LabelText>
                <Input onChangeText={value => setConfirmPassword(value)}></Input> */}
                <SubmitButton onPress={onSubmit}>
                    <ButtonText>Salvar</ButtonText>
                </SubmitButton>
            </ContainerForm>
        </Scroll>}
  </>);
}

export  {NewDweller};