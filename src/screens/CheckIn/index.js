import React, { useState } from 'react';
import { View, StatusBar, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { ListHeaderContainer, RowContainer, ListHeaderText, VisitorText, TextWrapper } from '../visitor/styles';
import Colors from '../../styles/Colors';
import { Button, ButtonText } from '../../components/PostInputCard/styles';
import { AlertCard } from '../../components/AlertCard';

import { AlertRow } from './styles';

const CheckIn = ({navigation}) => {

    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    
    const data = [
        {id: 1, name: 'Patricia souza'},
        {id: 2, name: 'Patricia souza'},
        {id: 3, name: 'Patricia souza'},
    ]
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
                    <AlertCard></AlertCard>
                </AlertRow>
                    <ListHeaderContainer>
                        <RowContainer>
                                <TextWrapper width={`32%`}>
                                    <ListHeaderText >Nome</ListHeaderText>
                                </TextWrapper>
                                <TextWrapper width={`15%`}>
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
                            <TextWrapper width={`32%`}>
                                <VisitorText >{item.name}</VisitorText>
                            </TextWrapper>
                        <TextWrapper width={`15%`}>
                                <VisitorText>25-08-2020</VisitorText>
                        </TextWrapper>
                            <TextWrapper width={`25%`}>
                                <VisitorText>18:55</VisitorText>
                            </TextWrapper>
                        </RowContainer>
                    )}/>
                    <Button onPress={()=>navigation.navigate('NewCheckIn')}>
                        <ButtonText>Realizar check-in</ButtonText>
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