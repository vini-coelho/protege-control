import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	FlatList
} from 'react-native';

import { onSignOut, getUser } from '../../auth';


import Colors from '../../styles/Colors';
import Header from '../../components/Header';
import HomeMenuItem from '../../components/HomeMenuItem';
import { MenuContainer, ItemView, CondominumContainer, CondominumNameText, CondominumAddressText, LineView, NotificationRow, ChangeCondominiumButton, ButtonText } from './styles';
import HomeHeader from '../../components/HomeHeader';
import HomeNotification from '../../components/HomeNotification';
import { ROOT } from '../../utils/UserTypes';

export default ({ navigation }) => {

	const [user,setUser] = useState(null)
	const [number, setNumber] = useState(0)
	const listData = [
		{ id: Math.random().toString(), 
			title: 'Moradores', 
			to: 'Dwellers',
		},
		{ id: Math.random().toString(), 
			title: 'Avisos', 
			to: 'Alerts',
		},
		{ id: Math.random().toString(), 
			title: 'Visitas', 
			to: 'Visitors',
		},
		{ id: Math.random().toString(), 
			title: 'Falar com a Protege', 
			to: 'Alerts',
		},
	]

	const formatAddress = ()=>{
		let str = `${user?.condominium?.street||" - "}`;
		if(user?.condominium?.street) str += `, ${user?.condominium?.number}`
		if(user?.condominium?.neighborhood) str += ` - ${user?.condominium?.neighborhood}`
		return str
	}

	useEffect(()=>{
		const findUser= async () => {
			const _user = await getUser()
			setUser(_user)
		}
		findUser()
	},[])

	return (
		<View style={{ flex: 1, backgroundColor: Colors.main }}>
			
			<HomeHeader onPressLeft={() => navigation.openDrawer()}
			iconLeft='subject' 
			iconRight='cancel' 
			onPressRight={async () => await onSignOut(navigation)}
			title='PROTEGE CONTROL' />

			<MenuContainer>
				<FlatList 
				numColumns={2}
				data={listData}
					renderItem={({ item }) => (
						<ItemView>
							<HomeMenuItem 
								key={item.id}
								onPress={() => navigation.navigate(`${item.to}`)}
								text = {item.title}
							/>
						</ItemView>
					)}
				/>

			</MenuContainer>
			<NotificationRow>
				<HomeNotification onPress={()=>navigation.navigate(`Alerts`)} numberText={number}></HomeNotification>
			</NotificationRow>
			<CondominumContainer>
				<CondominumNameText>{user?.condominium?.name||""}</CondominumNameText>
				<LineView/>
				<CondominumAddressText>{formatAddress()}</CondominumAddressText>
				{user?.type == ROOT &&
					<ChangeCondominiumButton onPress={()=>{}}><ButtonText>Alterar</ButtonText></ChangeCondominiumButton>}
			</CondominumContainer>
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