import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Modal,
    ActivityIndicator,
    StyleSheet, 
    Alert, 
    StatusBar,
    FlatList, 
    Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import Colors from '../../styles/Colors';

import NewVisitor from '../NewVisitor'; 
import Header from '../../components/Header';
import VisitorCard from '../../components/VisitorCard';
import { FilterButton, ButtonText, FilterContainer } from './styles';

export default ({ navigation }) => {

    const [ visitors, setVisitors ] = useState([]);
    const [ _visitors, _setVisitors ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ newVisitorVisible, setNewVisitorVisible ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);
    const [filterSelected, setFilterSelected] = useState(null)
    function onFilterClick(type) {
        console.log(`${type} != ${filterSelected} == ${type!=filterSelected}`);
        setFilterSelected(type!=filterSelected? type : null)
    }
    function filterVisitors(type) {
        console.log(type)
        if (type != null) {
            const filteredVisitors = _visitors.filter(visitor => visitor.type == type)
            setVisitors(filteredVisitors)
        } else {
            setVisitors(_visitors)
        }
    }

    useEffect(()=>{
        filterVisitors(filterSelected)
    },[filterSelected])
    useEffect(() => {
        async function getVisitors() {
            setRefresh(false);
            setLoading(true);
            try{
                const response = await api.get(`/visitorbyhost`);
                setVisitors(response.data);
                _setVisitors(response.data)
            }
            catch(err) {
                Alert.alert('Erro de conexão', err.message)
            }
            setLoading(false);
        }

        getVisitors();
    }, [refresh]);

    const storeVisitor = async data => {
        setLoading(true);
        try {
            await api.post('/visitors', data)
            .then(() => {
                setLoading(false);
                Alert.alert('Sucesso!', 'Visita agendada com sucesso!');
            })
            .then(() => setRefresh(true))
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível agendar a visita.')
        }
    }

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={Colors.yellow}/>

            <NewVisitor animationType='slide' 
            visible={newVisitorVisible}
            onRequestClose={() => setNewVisitorVisible(false)}
            closeModal={() => setNewVisitorVisible(false)}
            onSubmit={storeVisitor}/>

            <View style={styles.container}>
                <Header iconRight='add'
                onPressRight={() => setNewVisitorVisible(true)}
                iconLeft='menu'
                onPressLeft={() => navigation.openDrawer()}
                title='Visitantes'/>

                { loading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}> 
                        <ActivityIndicator size='large' color={Colors.yellow}/>
                    </View>
                    : <>
                        <FilterContainer>
                            <FilterButton theme={filterSelected=="delivery"?Colors.light:Colors.main} onPress = {()=>onFilterClick("delivery")} key="delivery">
                                <ButtonText>Entrega</ButtonText></FilterButton>
                            <FilterButton theme={filterSelected=="visitor"?Colors.light:Colors.main} onPress = {()=>onFilterClick("visitor")}  key="visitor">
                                <ButtonText>Visita</ButtonText></FilterButton>
                            <FilterButton theme={filterSelected=="service"?Colors.light:Colors.main} onPress = {()=>onFilterClick("service")}  key="service">
                                <ButtonText>Serviço</ButtonText></FilterButton>
                        </FilterContainer>
                        <FlatList onRefresh={() => setRefresh(true)} 
                        refreshing={refresh}
                        contentContainerStyle={styles.list} 
                        data={visitors}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <VisitorCard name={item.name}
                            date={item.date}
                            type={item.type}
                            comments={item.comments}
                            status={item.status}
                            arrivedAt={item.arrived_at}
                            leftAt={item.left_at}
                            car={item.car}
                            />
                        )}/>
                    </>
                }

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.main,
    },
    list: {
        // flex: 1,
        padding: 10,
        paddingBottom: 0,
    },
    title: {
        color: '#fff',
        fontSize: 30
    }
});