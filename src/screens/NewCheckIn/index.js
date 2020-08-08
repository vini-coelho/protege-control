import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';

import { Container, ContainerForm, LabelText, Input, SubmitButton, ButtonText } from './styles';
import Header from '../../components/Header';
import { getUser } from '../../auth';

const NewCheckIn = ({navigation}) => {
    const [date] = useState(new Date())
    const [name, setName] = useState('')
    useEffect(()=>{
        const setupUser = async () => {
            const {name} = await getUser()
            setName(name)
        }
        setupUser()
    },[])

    const onSubmit = async () => {
        Alert.alert("W.i.p", date)
    } 

    const getFormatedDate = () => {
        const day =date.getDay() >= 10 ? date.getDay():'0'+date.getDay() 
        const month = date.getMonth() >= 10 ? date.getMonth(): '0'+date.getMonth()
        return `${day}-${month}-${date.getFullYear()}`
    }

    const getFormatedHour = () => {
        const hour = date.getHours() >= 10 ? date.getHours(): '0'+date.getHours()
        const minute = date.getMinutes() >= 10 ? date.getMinutes(): '0'+date.getMinutes()
        return `${hour}:${minute}`
    }

  return (
      <Container>
          <Header             
            iconLeft='arrow-back' 
            onPressLeft={() => navigation.goBack()}
            title='Check-in'/>
            <ContainerForm>
                <LabelText>Usuário</LabelText>
                <Input>{name}</Input>
                <LabelText>Horário</LabelText>
                <Input>{getFormatedHour()}</Input>
                <LabelText>Data</LabelText>
                <Input>{getFormatedDate()}</Input>
            </ContainerForm>
            <SubmitButton onPress={onSubmit}>
                <ButtonText>Confirmar</ButtonText>
            </SubmitButton>
      </Container>
  );
}

export {NewCheckIn};