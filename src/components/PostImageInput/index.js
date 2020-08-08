import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TitleText, InfoTest, ImageContainer, MessageWrapper, ImageWrapper } from './styles';
import Colors from '../../styles/Colors';

const PostImageInput = ({image=null, onClick}) => {
  return (
      <Container onPress={onClick}>
          {!image ?
          <MessageWrapper>
                <Icon name='insert-photo' size={35} color={Colors.yellow} />
                <TitleText>Adcione uma foto</TitleText>
                <InfoTest>Formatos suportados: PNG e JPEG</InfoTest>
                <InfoTest>As imagens devem conter o tamanho de 38x234</InfoTest>
            </MessageWrapper>
            :<ImageWrapper>
              <ImageContainer source={image&&{uri: image}} />
            </ImageWrapper>
            }
      </Container>
  );
}

export default PostImageInput;