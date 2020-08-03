import React, { useState } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { onSignOut } from '../../auth';
import { Scroll, ContainerForm, LabelText, Input, SubmitButton, ButtonText } from './styles';
import api from '../../services/api';
import Colors from '../../styles/Colors';

// import { Container } from './styles';

 const UpdatePassword = ({navigation}) => {

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  async function onSubmit(){
      if(password == newPassword){
        Alert.alert('senhas devem ser diferentes')
      }
      setLoading(true)
      
      await api.post('/changePassword', {password, newPassword})
      .then(res=>{
        setLoading(false)
        navigation.navigate('LoggedInAsUser')
      }).catch(err =>{
        console.log(err);
        setLoading(false)
        Alert.alert('Não foi possível alterar senha')
      })

  }

  return (<>
     <Header
        iconLeft='arrow-back' 
        onPressLeft={ async () => await onSignOut(navigation)}
        title='Nova senha'/>
        {loading ?
          <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator color={Colors.yellow} size='large' />
          </View>:
        <Scroll>
            <ContainerForm>
                <LabelText>Senha atual</LabelText>
                <Input onChangeText={value => setPassword(value)}></Input>
                <LabelText>Nova senha</LabelText>
                <Input onChangeText={value => setNewPassword(value)}></Input>

                <SubmitButton onPress={onSubmit}>
                    <ButtonText>Salvar</ButtonText>
                </SubmitButton>
            </ContainerForm>
        </Scroll>}
  </>);
}

export  {UpdatePassword};
