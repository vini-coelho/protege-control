import React, { useState } from 'react';
import { View, Image, Alert, ActivityIndicator } from 'react-native';

import { Container, Main } from './styles';
import PostInputCard from '../../components/PostInputCard';
import Header from '../../components/Header';

import ImagePicker from 'react-native-image-picker'
import AWS from "aws-sdk";
import {decode} from 'base64-arraybuffer'
import {readFile} from 'react-native-fs'
import RNFetchBlob from 'react-native-fetch-blob'
import Colors from '../../styles/Colors';
import api from '../../services/api';
import { getUser, getCond } from '../../auth';

const NewPost = ({navigation, route}) => {
  const {item} = navigation.state.params;

  const [loading, setLoading] = useState(false)

  const [image, setImage] = useState(null)
  const [text, setText] = useState('')
  const chooseImage = async () => {
    let options = {
      title: 'Upload Prescription',
      takePhotoButtonTitle: 'Tirar uma foto',
      chooseFromLibraryButtonTitle: 'Selecionar na galeria',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const file = {
            uri: response.uri,
            name: response.fileName,
            type: 'image/jpeg',
            key:  `posts/${new Date().getTime()}_${response.fileName}`
          };
          setImage(file)
        }
    });
 };
  
 const onSubmit = async () => {
  setLoading(true)
  if (!!image){
    var response = await uploadImageOnS3(image)
    if(!response) {
      setLoading(false)
      return
    };
  }
  await savePost()
  setLoading(false)
 }

 const uploadImageOnS3 = async (file) => {
  var s3 = new AWS.S3({
    accessKeyId: "minio",
    secretAccessKey: "miniostorage",
    endpoint: "http://142.11.215.48:9091",
    s3ForcePathStyle: true,
    signatureVersion: "v4"
    }); 

    const signedUrl = await s3.getSignedUrl('putObject', {
      Bucket: 'protege',
      Key: file.key,
      ContentType: `image/jpg`,
  });
  return RNFetchBlob.fetch(
    'PUT', 
    signedUrl, 
    { 'Content-Type': `image/jpg` }, 
    RNFetchBlob.wrap(file.uri))
    .catch(err=>Alert.alert('Erro!', 'Erro ao enviar imagem!'));
 }

 const savePost = async () => {
    const {id: user_id} = await getUser()
    const {id:cond_id} = await getCond()
    const data = {
      title: item.title,
      content: text,
      cond_id: cond_id,
      previous: item.id,
      recv_id: item?.sender?.type != 'root' ? item?.user_id: null,
      user_id: user_id||null,
      status: item?.sender?.type,
      key: image?.key || null
    }
    api.post('/posts', data)
    .then(res=>console.log(res.data))
    .catch(err=>Alert.alert("Erro", "Ocorreu um erro ao publicar resposta"));
 }

 const clearState = () => {
   setImage(null);
   setText('')
 }

 const goBack = () => {
   clearState()
   navigation.goBack()
 }
  return (
  <Main>
      <Header 
            iconLeft='arrow-back'
            onPressLeft={goBack}
            title='Avisos'/>
    {loading ?
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color={Colors.yellow} size='large' />
        </View>:
      <Container>
      <PostInputCard
        title={item.title}
        date={item.created_at.split(' ').join('T')}
        description={item.content}
        senderName={item?.sender?.name||"Protege"}
        onImageClick={chooseImage}
        image={image?.uri}
        onSaveClick={onSubmit}
        onCancelClick={goBack}
        onTextChange={value=>setText(value)}
      />
    </Container>}
  </Main>);
}

export {NewPost};