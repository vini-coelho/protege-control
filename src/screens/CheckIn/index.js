import React, { useState, useEffect } from 'react';
import { View, StatusBar, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { ListHeaderContainer, RowContainer, ListHeaderText, VisitorText, TextWrapper } from '../visitor/styles';
import Colors from '../../styles/Colors';
import { Button, ButtonText } from '../../components/PostInputCard/styles';
import { AlertCard } from '../../components/AlertCard';
import api from '../../services/api';
import moment from 'moment';

import { AlertRow } from './styles';

const CheckIn = ({navigation}) => {

    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    
    const [data, setData] = useState([])
    const [attendance, setAttendance] = useState(null)
    const alertText = "Todos os horários são baseados no fuso horário local"
    useEffect(()=>{
        setRefresh(false)
        setLoading(true)
        const getOpenAttendance = async () => {
            const _attendance = await api.get('/getOpenAttendance').then(res=>res.data)
            setAttendance(_attendance)
            setLoading(false)
        }
        const getAttendance = async () => {
            const attendances = await api.get('/attendance').then(res=>res.data)
            setData(attendances)
             getOpenAttendance()
         }
        getAttendance()
    }, [refresh])

    const formatDate = (date) => {
        const dateFormated = moment(date).local().format('YYYY-MM-DD HH:mm:ss');
        return dateFormated.split(' ')[0]
    }

    const formatHour = (date) => {
        const dateFormated = moment(date).local().format('YYYY-MM-DD HH:mm:ss');
        return dateFormated.split(' ')[1]
    }

  return (
        <>
        <StatusBar barStyle='dark-content' backgroundColor={Colors.main}/>

        <View style={styles.container}>
            <Header             
            iconLeft='arrow-back' 
            onPressLeft={() => navigation.navigate(`Home`)}
            title='Check-in'/>

            { loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}> 
                    <ActivityIndicator size='large' color={Colors.yellow}/>
                </View>
                : <>
                <AlertRow>
                    <AlertCard text={alertText}></AlertCard>
                </AlertRow>
                    <ListHeaderContainer>
                        <RowContainer>
                                <TextWrapper width={`35%`}>
                                    <ListHeaderText >Nome</ListHeaderText>
                                </TextWrapper>
                                <TextWrapper width={`25%`}>
                                    <ListHeaderText>Dia</ListHeaderText>
                                </TextWrapper>
                                <TextWrapper width={`25%`}>
                                    <ListHeaderText>Hora</ListHeaderText>
                                </TextWrapper>
                        </RowContainer>
                    </ListHeaderContainer>
                    <FlatList onRefresh={() => setRefresh(true)} 
                    refreshing={refresh}
                    contentContainerStyle={styles.list} 
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (

                        <RowContainer>
                            <TextWrapper width={`35%`}>
                                <VisitorText >{item.user.name}</VisitorText>
                            </TextWrapper>
                        <TextWrapper width={`25%`}>
                                <VisitorText>{formatDate(item.arrived_at)}</VisitorText>
                        </TextWrapper>
                            <TextWrapper width={`25%`}>
                                <VisitorText>{formatHour(item.arrived_at)}</VisitorText>
                            </TextWrapper>
                        </RowContainer>
                    )}/>
                    <Button onPress={()=>navigation.navigate('NewCheckIn',{attendance, handleOnNavigateBack :()=>setRefresh(true)})}>
                        <ButtonText>Realizar {!!attendance?'Check-out':'Check-in'}</ButtonText>
                    </Button>
                </>
            }

        </View>
    </>

  );
}

export {CheckIn};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    list: {
        // flex: 1,
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
    },
    title: {
        color: '#fff',
        fontSize: 30
    }
});