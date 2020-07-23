import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    FlatList, 
    Alert, 
    ActivityIndicator 
} from 'react-native';

import Colors from '../styles/Colors';

import Header from '../components/Header';
import Post from '../components/Post';

import api from '../services/api';

export default ({ navigation }) => {

    const [ posts, setPosts ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ refresh, setRefresh ] = useState(false);

    useEffect(() => {
        async function getPosts() {
            setRefresh(false);
            setLoading(true);
            try{
                const response = await api.get('/postsbycond');
                setPosts(response.data);
            }
            catch(err) {
                Alert.alert('Erro de conexão', 'Verifique sua conexão com a internet.')
            }
            setLoading(false);
        }

        getPosts();
    }, [refresh]);

    return (
        <View style={styles.screen}>
            <Header 
            // iconRight='add'
            iconLeft='menu'
            onPressLeft={() => navigation.openDrawer()}
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
                        description={item.content}/>
                    )}/>
                }
                    
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.main,
    },
    scroll: {
        flex: 1,
        padding: 10
    },
    list: {
        // flex: 1,
        padding: 10,
        paddingBottom: 0,
    },
});