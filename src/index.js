import React, { useState, useEffect} from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';

import { getUser, isLoggedIn, getDecriptedToken  } from './auth';
import { createRootNavigator } from './routes';

import Colors from './styles/Colors';

export default () => {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userType, setUserType ] = useState('');
    const [ firstLogin, setFirstLogin ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const setLogin = async () => {

            setLoggedIn(await isLoggedIn());
            const userInfo = await getDecriptedToken()
            if(userInfo) {
                setFirstLogin(userInfo?.data?.isFirstLogin)
                console.log(`userInfo: ${userInfo?.data?.isFirstLogin}`);
            }
            if (loggedIn) 
            {
                const user = await getUser();
                setUserType(user.type);
            }

            setLoading(false);
        }

        setLogin();
    }, []);

    const App = createRootNavigator(loggedIn, userType, firstLogin);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle='dark-content' backgroundColor={Colors.yellow}/>
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: Colors.main }}>
                    <ActivityIndicator size='large' color={Colors.yellow}/>
                </View> 
                :
                <App/>
            }
        </View>
    )
}