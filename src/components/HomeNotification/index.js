import React from 'react';
import { View } from 'react-native';

import { Container, Circle, NumberCircle, NumberText } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../styles/Colors';

const HomeNotification = ({numberText, onPress}) => {
  return (
  <Container>
      <NumberCircle>
        <NumberText>{numberText}</NumberText>
      </NumberCircle>
      <Circle>
      <Icon name='notifications' size={30} color={Colors.white} onPress={onPress}/>
      </Circle>
  </Container>
  );
}

export default HomeNotification;