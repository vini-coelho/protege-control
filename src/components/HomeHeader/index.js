import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../styles/Colors';
import {  MenuText } from './styles';

export default ({ iconLeft, iconRight, title, onPressLeft, onPressRight, image }) => {
	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={onPressLeft} style={styles.iconContainer}>
				<Icon name={iconLeft} size={35} color={Colors.yellow} />
			</TouchableOpacity>
			<MenuText>Menu</MenuText>
			    <Image source={image} style={{position:"relative", height:140, width:320}}/>

		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.main,
		padding: 5,
		paddingTop: Platform.OS == 'ios' ? (30 + 5) : 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 2,

	},
	title: {
		color: Colors.main,
		fontFamily: 'Roboto-Light',
		fontSize: 20,
		textAlign: 'center',
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		width: 50,
		borderRadius: 25
	},
});