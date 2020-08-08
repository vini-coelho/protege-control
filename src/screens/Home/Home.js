import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	FlatList,
	Alert,
	ActivityIndicator
} from 'react-native';
import { onSignOut, getUser, setCond } from '../../auth';

import AppBarPhoto from '../../assets/images/AppBarPhoto.png'

import RNFS from 'react-native-fs'

import Colors from '../../styles/Colors';
import Header from '../../components/Header';
import HomeMenuItem from '../../components/HomeMenuItem';
import { MenuContainer, ItemView, CondominumContainer, CondominumNameText, CondominumAddressText, LineView, NotificationRow, ChangeCondominiumButton, ButtonText } from './styles';
import HomeHeader from '../../components/HomeHeader';
import HomeNotification from '../../components/HomeNotification';
import { ROOT } from '../../utils/UserTypes';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../services/api';


export default ({ navigation }) => {

	const [user,setUser] = useState(null)
	const [number, setNumber] = useState(0)
	const [condominium, setCondominium] = useState(null)

	const [loading, setLoading] = useState(false)
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
		// { id: Math.random().toString(),
		// 	title: 'Falar com a Protege',
		// 	to: 'Alerts',
		// },
	]

	const formatAddress = ()=>{
		let str = `${condominium?.street||" - "}`;
		if(condominium?.street) str += `, ${condominium?.number}`
		if(condominium?.neighborhood) str += ` - ${condominium?.neighborhood}`
		return str
	}




	useEffect(()=>{
		const findUser= async () => {
			const _user = await getUser()
			setUser(_user)
			setupCond(_user.condominium)
		}
		findUser()
		
	},[])

	const setupCond = (cond) => {
		if(cond) {
			setCondominium(cond)
			setCond(cond)
		}
		else listConds().then(data=> {
			setCond(data[0])
			setCondominium(data[0])
		})
	}

	const listConds = () => {
		setLoading(true)
		return api.get("/condominiums").then(res=> {
			setLoading(false)
			return res.data
		}).catch(err=>{
			setLoading(false)
			Alert.alert('Error',err)
		})
	}

	return (
		<>
				<ScrollView style={{ flex: 1, backgroundColor: Colors.main }}>

					<HomeHeader onPressLeft={() => navigation.openDrawer()}
					iconLeft='subject'
					iconRight='cancel'
					image = {AppBarPhoto}
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
				{loading ?
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<ActivityIndicator color={Colors.yellow} size='large' />
					</View>
					:
					<CondominumContainer>
						<CondominumNameText>{condominium?.name||""}</CondominumNameText>
						<LineView/>
						<CondominumAddressText>{formatAddress()}</CondominumAddressText>
						{user?.type == ROOT &&
							<ChangeCondominiumButton onPress={()=>{}}><ButtonText>Alterar</ButtonText></ChangeCondominiumButton>}
					</CondominumContainer>
				}
			</ScrollView>
		</>
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