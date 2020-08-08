import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Divider, WarningText } from './styles';
import Colors from '../../styles/Colors';

const AlertCard = () => {
  return (
  <Container>
        <Icon name='warning' size={30} color={Colors.dark} />
        <Divider/>
        <WarningText>Todos os horários são baseados no fuso horário local</WarningText>
  </Container>);
}

export  {AlertCard};