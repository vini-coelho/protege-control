import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Platform,
	StatusBar,
	ScrollView,
	TouchableOpacity,
	FlatList
} from 'react-native';

import { onSignOut } from '../auth';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../styles/Colors';
import Header from '../components/Header';

export default ({ navigation }) => {

	const listData = [
		{ id: Math.random().toString(), 
			title: 'Avisos', 
			icon: 'notifications', 
			color: Colors.yellow,
			to: 'Alerts',
			description: 'Acompanhe o quadro de avisos da administração do seu condomínio'
		},
		{ id: Math.random().toString(), 
			title: 'Visitantes', 
			icon: 'directions-walk', 
			color: Colors.yellow,
			to: 'Visitors',
			description: 'Avise a portaria que você está esperando visitas!'
		},
		// { id: Math.random().toString(), title: 'Mensagens', icon: 'mail', color: Colors.yellow },
		// { id: Math.random().toString(), title: 'Ocorrências', icon: 'error', color: Colors.yellow },
		// { id: Math.random().toString(), title: 'Arquivos', icon: 'folder', color: Colors.yellow },
	]

	return (
		<View style={{ flex: 1, backgroundColor: Colors.main }}>
			<StatusBar barStyle='dark-content' backgroundColor={Colors.yellow} />
			
			<Header onPressLeft={() => navigation.openDrawer()}
			iconLeft='menu' 
			iconRight='cancel' 
			onPressRight={async () => await onSignOut(navigation)}
			title='PROTEGE CONTROL' />

			<View style={styles.container}>
				<View>
					<FlatList contentContainerStyle={{ paddingBottom: 15}} data={listData}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => navigation.navigate(`${item.to}`)} style={styles.listItem} key={item.id}>

								<View style={styles.listItemIconContainer}>
									<Icon size={30} name={item.icon} color={item.color} />
								</View>
								<View style={{ marginLeft: 15, flex: 1 }}>
									<Text style={styles.listItemTitle}>{item.title}</Text>
									<View style={{ flexDirection: 'row' }}>
										<Text
											style={styles.listItemDescription}>{item.description}</Text>
									</View>
								</View>

								<Icon name='keyboard-arrow-right'
									color={Colors.yellow} size={25} />
							</TouchableOpacity>
						)}
					/>
				</View>
			</View>
		</View>

	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 30,
		marginTop: 10,
		marginHorizontal: 10,
		borderRadius: 5,
		backgroundColor: Colors.light
	},
	listItemTitle: {
		fontFamily: 'Roboto-Light',
		fontSize: 18,
		marginBottom: 5,
		color: Colors.yellow,
	},
	listItemIconContainer: {
		height: 60,
		width: 60,
		borderRadius: 30,
		backgroundColor: Colors.main,
		alignItems: 'center',
		justifyContent: 'center',
	},
	listItemDescription: {
		flex: 1,
		flexWrap: 'wrap',
		color: 'white',
		fontFamily: 'Roboto-Thin'
	}
});