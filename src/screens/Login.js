import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Image, 
    TouchableOpacity,
    ActivityIndicator, 
    Alert
} from 'react-native';

import { logIn, setUser, setCond } from '../auth';

import Logo from '../assets/images/logo.png'
import Colors from '../styles/Colors';
import api from '../services/api';

export default ({ navigation }) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const logUser = async () => {

        setLoading(true);

        const success = await logIn(email, password)
        .catch(err => Alert('Erro', 'Não foi possível realizar seu login'));

        if (success) {
            const { data: user } = await api.get('/showuser'); 

            const { data: userCond } = await api.get(`/condominiums/${user.cond_id}`); 

            setUser(user);
            setCond(userCond);

            navigation.navigate('LoggedInAsUser');
        }
        
        setLoading(false);

    }

    return (
        <View style={styles.container}>
            { loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator color={Colors.yellow} size='large' />
                </View>
                :
                <>
                    <View style={styles.image}>
                        <Image resizeMode='contain' source={Logo}/>
                    </View>
                    <Text style={styles.title}>PROTEGE CONTROL</Text>
                    <View style={styles.form}>
                        <TextInput value={email}
                        onChangeText={email => setEmail(email)} 
                        placeholderTextColor={Colors.yellow}
                        style={styles.input} 
                        placeholder='E-mail'
                        autoCapitalize='none'/>

                        <TextInput value={password}
                        onChangeText={password => setPassword(password)}
                        placeholderTextColor={Colors.yellow} 
                        style={styles.input} 
                        placeholder='Senha'
                        autoCapitalize='none'
                        secureTextEntry/>

                        <TouchableOpacity onPress={logUser}>
                            <Text style={styles.button}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }       
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.main,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        color: Colors.yellow,
        marginBottom: 10,
        borderBottomColor: Colors.yellow,
        borderBottomWidth: 1,
        fontFamily: 'Roboto',
        fontSize: 17
    },
    form: {
        backgroundColor: Colors.main,
        padding: 20,
        shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 1,
		shadowRadius: 6,

		elevation: 3,
    },
    button: {
        alignSelf: 'flex-end',
        color: Colors.yellow,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 15
    },
    image: {
        alignSelf: "center",
        height: 180,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        alignSelf: 'center',
        fontSize: 25,
        color: Colors.yellow,
        fontFamily: 'Roboto-Light',
        fontWeight: 'bold'
    }
});