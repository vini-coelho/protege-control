import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Text } from './styles';
import Colors from '../../styles/Colors';

export default ({text,onPress}) => {
  return (
  <Container onPress={onPress}>
      <Icon name='chat' color={Colors.darkYelow} size={20} ></Icon>
      <Text>
          {text}
      </Text>
  </Container>
  );
}
