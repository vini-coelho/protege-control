import React, { useState } from 'react';
import { View, Alert, Image } from 'react-native';
import Header from '../../components/Header';

import { Container } from './styles';
import Post from '../../components/Post';
import ImagePicker from 'react-native-image-picker'
import AWS from "aws-sdk";
import {decode} from 'base64-arraybuffer'
import {readFile} from 'react-native-fs'
import RNFetchBlob from 'react-native-fetch-blob'
import AppBarPhoto from '../../assets/images/AppBarPhoto.png'

const PostDetail = ({navigation, route}) => {
    const {item} = navigation.state.params;

   const onButtonClick = () => {
     navigation.navigate('NewAlert', {item})
   }
  return (<>
    <Header 
            iconLeft='arrow-back'
            onPressLeft={() => navigation.goBack()}
            title='Avisos'/>
    <Container>
    <Post title={item.title}
        date={item.created_at.split(' ').join('T')}
        description={item.content}
        senderName={item?.sender?.name||"Protege"}
        onItemClick={() =>{}}
        onButtonClick={onButtonClick}
        />
    </Container>
  </>);
}

export {PostDetail};