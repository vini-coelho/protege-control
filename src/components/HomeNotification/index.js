import React from 'react';
import { View } from 'react-native';

import { Container, Circle, NumberCircle, NumberText } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../styles/Colors';

const HomeNotification = ({numberText=null, onPress}) => {
  return (
  <Container>
    { (numberText!=null && numberText > 0) &&
      <NumberCircle>
        <NumberText>{numberText<100? numberText: "..."}</NumberText>
      </NumberCircle>}
      <Circle>
      <Icon name='notifications' size={30} color={Colors.white} onPress={onPress}/>
      </Circle>
  </Container>
  );
}

export default HomeNotification;