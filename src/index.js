import React, { useState, useEffect} from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';

import { getUser, isLoggedIn  } from './auth';
import { createRootNavigator } from './routes';

import Colors from './styles/Colors';

export default () => {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userType, setUserType ] = useState('');
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const setLogin = async () => {

            setLoggedIn(await isLoggedIn());

            if (loggedIn) 
            {
                const user = await getUser();
                setUserType(user.type);
            }

            setLoading(false);
        }

        setLogin();
    }, []);

    const App = createRootNavigator(loggedIn, userType);

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