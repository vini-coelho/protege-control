import React, { useState, useEffect } from 'react';
import { View, StatusBar, FlatList, ActivityIndicator, Alert } from 'react-native';

import { Container, FAB, CondRow, CondText } from './styles';
import DwellerCard from '../../components/DwellerCard';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUser, getCond } from '../../auth';
import api from '../../services/api';
import {  USER } from '../../utils/UserTypes';

const Dwellers = ({navigation}) => {

    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [user, setUser] = useState(null)
	const [condominium, setCondominium] = useState(null)
    const [dwellers, setDwellers] = useState([])


    useEffect(()=>{
        const findUser= async () => {
            const _user = await getUser()
            const cond = await getCond()
            setUser(_user)
            setupCond(cond)
            listDewllers(cond)
		}
        findUser()
    },[])

    function setupCond (cond) {
        if (cond) setCondominium(cond)
        else getCond().then(data => setCondominium(data))
    }

    useEffect(()=>{
        if (condominium) listDewllers(condominium)
    },[refresh])

    const listDewllers = async (cond) => {
        setLoading(true);
        setRefresh(false)
        try {
            const _dwellers = await api.get(`/getDewllers/${cond.id}`)
            .then((res) => {
                setLoading(false);
                return res.data;
            })
            setDwellers(_dwellers)
        } catch (err) {
            setLoading(false);
            Alert.alert('Erro', 'Não foi possível listar moradores.')
        }
    }

  return(
<>
    <StatusBar barStyle='dark-content' backgroundColor={Colors.main}/>
    <Header
        // iconRight='search'
        // onPressRight={() => {}}
        iconLeft='arrow-back' 
        onPressLeft={() => navigation.navigate(`Home`)}
        title='Moradores'/>
    {loading ?
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color={Colors.yellow} size='large' />
        </View>:
        <Container>
            <CondRow>
                <CondText>{condominium?.name||""}</CondText>
            </CondRow>
            <FlatList onRefresh={() => setRefresh(true)} 
                refreshing={refresh}    
                data={dwellers}
                keyExtractor={item => item.id.toString()}
            renderItem = {({item})=>
                (<DwellerCard
                name={item.name}
                address={`${item.tower}/${item.apartment}`}
                ></DwellerCard>)
            }/>
            {user?.type != USER &&
                <FAB onPress={() => navigation.navigate(`NewDweller`)}>
                    <Icon name='add' size={30} color={Colors.yellow}></Icon>
                </FAB>}
        </Container>}
</>
  );
}

export {Dwellers};