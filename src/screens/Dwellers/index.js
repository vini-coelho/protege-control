import React from 'react';
import { View, StatusBar, FlatList } from 'react-native';

import { Container, FAB, CondRow, CondText } from './styles';
import DwellerCard from '../../components/DwellerCard';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dwellers = ({navigation}) => {
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
  return(
<>
    <StatusBar barStyle='dark-content' backgroundColor={Colors.main}/>
    <Header iconRight='search'
                onPressRight={() => {}}
                iconLeft='arrow-back' 
                onPressLeft={() => navigation.navigate(`Home`)}
                title='Moradores'/>
    <Container>
        <CondRow>
            <CondText>Condomínio Bairro Flores II</CondText>
        </CondRow>
        <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
        renderItem = {({item})=>
            (<DwellerCard
            name={item.name}
            address={`${item.tower}/${item.apartment}`}
            ></DwellerCard>)
        }/>
        <FAB>
            <Icon name='add' size={30} color={Colors.yellow}></Icon>
        </FAB>
    </Container>
</>
  );
}

export {Dwellers};