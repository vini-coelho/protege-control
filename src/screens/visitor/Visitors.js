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

import NewVisitor from '../NewVisitor/NewVisitor'; 
import Header from '../../components/Header';
import VisitorCard from '../../components/VisitorCard';
import { FilterButton, ButtonText, FilterContainer, RowContainer, VisitorText, TextWrapper, ListHeaderText,ListHeaderContainer } from './styles';
import { getUser } from '../../auth';

export default ({ navigation }) => {

    const [ visitors, setVisitors ] = useState([]);
    const [ _visitors, _setVisitors ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ newVisitorVisible, setNewVisitorVisible ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);
    const [filterSelected, setFilterSelected] = useState("visitor")
  
    function onFilterClick(type) {
        setFilterSelected(type!=filterSelected? type : filterSelected)
    }
 
    function filterVisitors(type) {
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
                const response = await api.get(`/visitorbycond`);
                setVisitors(response.data.filter(visitor => visitor.type == filterSelected));
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
            console.log(data);
            await api.post('/visitors', data)
            .then(() => {
                setLoading(false);
                Alert.alert('Sucesso!', 'Visita agendada com sucesso!');
            })
            .then(() => setRefresh(true))
        } catch (err) {
            console.log(err);
            setLoading(false);
            Alert.alert('Erro', 'Não foi possível agendar a visita.')
        }
    }

    const listDewllers = async () => {
        setLoading(true);
        const user = await getUser()
        try {
            return await api.get(`/getDewllers/${user.cond_id}`)
            .then((res) => {
                setLoading(false);
                return res.data;
            })
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível listar moradores.')
        }
    }

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={Colors.main}/>

            <NewVisitor animationType='slide' 
            visible={newVisitorVisible}
            onRequestClose={() => setNewVisitorVisible(false)}
            closeModal={() => setNewVisitorVisible(false)}
            onSubmit={storeVisitor}
            listDewllers={listDewllers}/>

            <View style={styles.container}>
                <Header iconRight='add'
                onPressRight={() => setNewVisitorVisible(true)}
                iconLeft='arrow-back' 
                onPressLeft={() => navigation.navigate(`Home`)}
                title='Visitas'/>

                { loading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}> 
                        <ActivityIndicator size='large' color={Colors.yellow}/>
                    </View>
                    : <>
                        <FilterContainer>
                            <FilterButton theme={filterSelected=="delivery"?Colors.yellow:Colors.white} onPress = {()=>onFilterClick("delivery")} key="delivery">
                                <ButtonText isSelected={filterSelected=="delivery"}>Entrega</ButtonText></FilterButton>
                            <FilterButton theme={filterSelected=="visitor"?Colors.yellow:Colors.white} onPress = {()=>onFilterClick("visitor")}  key="visitor">
                                <ButtonText isSelected={filterSelected=="visitor"}>Visita</ButtonText></FilterButton>
                            <FilterButton theme={filterSelected=="service"?Colors.yellow:Colors.white} onPress = {()=>onFilterClick("service")}  key="service">
                                <ButtonText isSelected={filterSelected=="service"}>Serviço</ButtonText></FilterButton>
                        </FilterContainer>
                        <ListHeaderContainer>
                            <RowContainer>
                                    <TextWrapper width={`32%`}>
                                        <ListHeaderText >Nome</ListHeaderText>
                                    </TextWrapper>
                                    <TextWrapper width={`15%`}>
                                        <ListHeaderText>AP/CS</ListHeaderText>
                                    </TextWrapper>
                                    <TextWrapper width={`25%`}>
                                        <ListHeaderText>Responsável</ListHeaderText>
                                    </TextWrapper>
                            </RowContainer>
                        </ListHeaderContainer>
                        <FlatList onRefresh={() => setRefresh(true)} 
                        refreshing={refresh}
                        contentContainerStyle={styles.list} 
                        data={visitors}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (

                            <RowContainer>
                                <TextWrapper width={`32%`}>
                                    <VisitorText >{item.name}</VisitorText>
                                </TextWrapper>
                               <TextWrapper width={`15%`}>
                               { (!!item.user.tower || !!item.user.apartment) && 
                                    <VisitorText>{`${item.user.tower}/${item.user.apartment}`}</VisitorText>
                               }</TextWrapper>
                                <TextWrapper width={`25%`}>
                                    <VisitorText>{item.user.name}</VisitorText>
                                </TextWrapper>
                            </RowContainer>
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