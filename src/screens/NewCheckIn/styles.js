import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.View`
  flex: 1;
`;

export const LabelText = styled.Text`
    font-family: 'Roboto-Bold';
    font-size: 16px;
`;

export const Input = styled.Text`
    margin-bottom: 10px;
    background-color: ${Colors.gray};
    border-width: 1px;
    border-color: ${Colors.softGray};
    border-radius: 5px;
    padding: 13px;
    font-family: 'Roboto-Bold';
    font-size: 13px;
`;

export const SubmitButton = styled.TouchableOpacity`
    margin-top: 30px;
    background-color: ${Colors.yellow};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 10px;
    align-items: center;
    border-radius: 10px;
    align-self:center;
`;

export const ButtonText = styled.Text`
    font-family: 'Roboto-Black';
    font-size: 15px;
    color: ${Colors.white};
`;

export const ContainerForm = styled.View`
    padding: 20px;
`;