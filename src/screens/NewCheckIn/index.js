import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import moment from 'moment';

import { Container, ContainerForm, LabelText, Input, SubmitButton, ButtonText } from './styles';
import Header from '../../components/Header';
import { getUser } from '../../auth';
import api from '../../services/api';

const NewCheckIn = ({navigation}) => {
    const {attendance, handleOnNavigateBack} = navigation.state.params;

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
        if (!!attendance) {
            update()
        } else {
            save()
        }
        handleOnNavigateBack()
        navigation.navigate('CheckIn')
    } 

    const save = async () => {
        const data = {
            arrived_at: moment(date).utc().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }
        console.log(data);
        await api.post('/attendance',data).catch(err=>Alert.alert('Error', "não foi possivel registrar!"))
    }

    const update = async () => {
        const data = {
            id: attendance.id,
            left_at: moment(date).utc().format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }
        console.log(data);
        await api.post('/attendance',data).catch(err=>Alert.alert('Error', "não foi possivel registrar!"))
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
            title={!!attendance?'Check-out':'Check-in' }/>
            <ContainerForm>
                <LabelText>Usuário</LabelText>
                <Input>{name}</Input>
                <LabelText>Horário</LabelText>
                <Input>{getFormatedHour()}</Input>
                <LabelText>Data</LabelText>
                <Input>{getFormatedDate()}</Input>
            </ContainerForm>
            <SubmitButton onPress={onSubmit}>
                <ButtonText>Confirmar {!!attendance?'Check-out':'Check-in'}</ButtonText>
            </SubmitButton>
      </Container>
  );
}

export {NewCheckIn};