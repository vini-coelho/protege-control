import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    FlatList, 
    Alert, 
    ActivityIndicator 
} from 'react-native';

import Colors from '../../styles/Colors';

import Header from '../../components/Header';
import Post from '../../components/Post';
import { getUser, getCond } from '../../auth';

import api from '../../services/api';

export default ({ navigation }) => {

    const [ posts, setPosts ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);

    useEffect(() => {
        async function getPosts() {
            setRefresh(false);
            setLoading(true);
            try{
                const {id: cond_id} = await getCond()
                const response = await api.get('/postsbycond/'+cond_id);
                setPosts(response.data);
            }
            catch(err) {
                Alert.alert('Erro de conexão', 'Verifique sua conexão com a internet.')
            }
            setLoading(false);
        }

        getPosts();
    }, [refresh]);


    const onItemClick= item => {
        navigation.navigate("AlertsDetail", {item: item})
    }

    return (
        <View style={styles.screen}>
            <Header 
            // iconRight='add'
            iconLeft='arrow-back'
            onPressLeft={() => navigation.navigate(`Home`)}
            title='Avisos'/>
            <View style={{ flex: 1 }}>

                { loading ?
                    <View style={{ flex: 1, justifyContent: 'center' }}> 
                        <ActivityIndicator size='large' color={Colors.yellow}/>
                    </View>
                    : <FlatList refreshing={refresh}
                    onRefresh={() => setRefresh(true)}
                    contentContainerStyle={styles.list} 
                    data={posts}
                    keyExtractor={(item ) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Post title={item.title}
                        date={item.created_at.split(' ').join('T')}
                        description={item.content}
                        senderName={item?.sender?.name||"Protege"}
                        onItemClick={() => onItemClick(item)}
                        />
                    )}/>
                }
                    
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.light,
    },
    scroll: {
        flex: 1,
        padding: 10
    },
    list: {
        // flex: 1,
        padding: 20,
        paddingBottom: 0,
    },
});