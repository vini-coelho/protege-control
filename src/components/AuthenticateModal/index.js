import React, { useState } from 'react';
import { View } from 'react-native';

import { Container, PassInput, SubmitButton, ButtonText, PassLabel, PassModal, Card } from './styles';

const AuthenticateModal = (props) => {

    const [password, setPassword] = useState('')
    const onSubmit = () => {
        props.closeModal();
        props.onSubmit(password)
        setPassword('')
    }
  return (
    <PassModal transparent={true} {...props}>
        <Container >
            <Card>
                <PassLabel>Digite sua senha</PassLabel>
                <PassInput
                    onChangeText ={pass => setPassword(pass)}
                    secureTextEntry/>
                <SubmitButton onPress={onSubmit}><ButtonText>Confirmar</ButtonText></SubmitButton>
            </Card>
        </Container>
    </PassModal>);
}

export {AuthenticateModal};