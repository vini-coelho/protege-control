import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container,
        Circle,
        InfoContainer,
        NameText,
        AdressText} from './styles';
import Colors from '../../styles/Colors';

const DwellerCard = ({name, address}) => {
  return (
      <Container>
        <Circle>
            <Icon name='person' size={30} color={Colors.white} />
        </Circle>
        <InfoContainer>
            <NameText>{name}</NameText>
            <AdressText>{address}</AdressText>
        </InfoContainer>
      </Container>
  );
}

export default DwellerCard;