import React, { useState, useEffect } from 'react';
import { View, StatusBar, FlatList, ActivityIndicator } from 'react-native';

import { Container, FAB, CondRow, CondText } from './styles';
import DwellerCard from '../../components/DwellerCard';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUser } from '../../auth';
import api from '../../services/api';
import {  USER } from '../../utils/UserTypes';

const Dwellers = ({navigation}) => {

    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [user, setUser] = useState(null)
    const [dwellers, setDwellers] = useState([])

    const data = [
        {id: 1, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
        {id: 2, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
        {id: 3, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
        {id: 4, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
        {id: 5, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
        {id: 6, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
        {id: 7, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
        {id: 8, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
        {id: 9, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
        {id: 10, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
        {id: 11, name: "Carlos Andrade", tower: "Predio 10", apartment: "Apartamento 5" },
    ]

    useEffect(()=>{
        const findUser= async () => {
			const _user = await getUser()
            setUser(_user)
            listDewllers(_user)
		}
        findUser()
    },[])

    useEffect(()=>{
        if (user) listDewllers(user)
    },[refresh])

    const listDewllers = async (_user) => {
        setLoading(true);
        setRefresh(false)
        try {
            const _dwellers = await api.get(`/getDewllers/${_user.cond_id}`)
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
                <CondText>{user?.condominium?.name||""}</CondText>
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