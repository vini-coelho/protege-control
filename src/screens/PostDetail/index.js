import React from 'react';
import { View, Alert } from 'react-native';
import Header from '../../components/Header';

import { Container } from './styles';
import Post from '../../components/Post';

const PostDetail = ({navigation, route}) => {
    const {item} = navigation.state.params;
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
        onButtonClick={()=>Alert.alert("W.I.P.")}
        />
    </Container>
  </>);
}

export {PostDetail};