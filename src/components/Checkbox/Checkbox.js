import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { Container } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../styles/Colors';

const Checkbox = ({checked=false, onPress=()=>{}, preventDefault=false}) => {

  const [isChecked, setIsChecked] = useState(checked)

  const onPressHandler = ()=>{
    if(!preventDefault) setIsChecked(!isChecked)
    onPress(isChecked)
  } 

  useEffect(()=>{
      setIsChecked(checked)
  },[checked])

  return <>
            <Container checked={isChecked} onPress ={onPressHandler}>
                <Icon name='done' size={25} color={Colors.white}/>
            </Container>
  </>;
}

export default Checkbox;