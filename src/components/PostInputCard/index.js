import React, { useState } from 'react';
import { View, Image } from 'react-native';

import { Container, Header, Body, Title, Info, SenderWrapper, CommomText, Sender, DateText, ImageContainer, ImageWrapper, Button, ButtonText, ButtonRow, MessageInput } from './styles';
import PostImageInput from '../PostImageInput';

const PostInputCard = ({ title, description,senderName, date, image=null, onImageClick, onCancelClick, onSaveClick,onTextChange }) => {

    const [isImageSelected, setIsImageSelected] = useState(false)

    function formatedDate(stringDate){

        const monthNames = [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", 
        "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ];

        const dt = new Date(stringDate),
        dia  = dt.getUTCDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (dt.getUTCMonth()+1).toString(),
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = dt.getUTCFullYear();

        return diaF+" de "+monthNames[dt.getMonth()]+" de "+anoF;
    }
  
    return (
  <Container>
      <Header>
        <Title>{title}</Title>
        <Info>
            <SenderWrapper>
                <CommomText>Por: </CommomText>
                <Sender>{senderName}</Sender>
            </SenderWrapper>
            <DateText>{`Manaus, ${formatedDate(date)}`}</DateText>
        </Info>
      </Header>
      <Body>
        <CommomText>{description}</CommomText>
        <ButtonRow>
            <Button 
                isSelected={!isImageSelected}
                onPress={()=>setIsImageSelected(!isImageSelected)}
                >
                <ButtonText isSelected={!isImageSelected}>Texto</ButtonText>
            </Button>
            <Button 
                isSelected={isImageSelected}
                onPress={()=>setIsImageSelected(!isImageSelected)}>
                    <ButtonText isSelected={isImageSelected}>Imagem</ButtonText>
            </Button>
        </ButtonRow>
        {!isImageSelected?
        <MessageInput
        onChangeText={text => onTextChange(text)}
        multiline={true}
        numberOfLines={3}
            />
        :<PostImageInput image={image} onClick={onImageClick}></PostImageInput>}
        <ButtonRow>
            <Button 
             isSelected={false}
             onPress={onCancelClick}>
                <ButtonText isSelected={false}>Cancelar</ButtonText>
            </Button>
            <Button
             isSelected={true}
             onPress={onSaveClick}>
                <ButtonText isSelected={true}>Salvar</ButtonText>
            </Button>
        </ButtonRow>
      </Body>
  </Container>);
}

export default PostInputCard;