import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Divider, WarningText } from './styles';
import Colors from '../../styles/Colors';

const AlertCard = ({text}) => {
  return (
  <Container>
        <Icon name='warning' size={30} color={Colors.dark} />
        <Divider/>
        <WarningText>{text}</WarningText>
  </Container>);
}

export  {AlertCard};