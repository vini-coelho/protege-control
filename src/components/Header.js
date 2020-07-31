import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../styles/Colors';

export default ({ iconLeft, iconRight, title, onPressLeft, onPressRight }) => {
	return (
		<View style={styles.header}>
			<View style={styles.div}>
				<TouchableOpacity onPress={onPressLeft} style={styles.iconContainer}>
					<Icon name={iconLeft} size={25} color={Colors.yellow} />
				</TouchableOpacity>
				<Text style={styles.title}>{title}</Text>
			</View>
			<TouchableOpacity onPress={onPressRight} style={styles.iconContainer}>
				<Icon name={iconRight} size={25} color={Colors.yellow} />
			</TouchableOpacity>
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

		elevation: 3,
	},
	div:{
		flexDirection: "row",
		alignItems: "center"
	},
	title: {
		color: Colors.white,
		fontFamily: 'Roboto-Bold',
		fontSize: 20,
		textAlign: 'left',
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		width: 50,
		borderRadius: 25
	},
});