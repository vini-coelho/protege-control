
import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const PassModal = styled.Modal`
`;

export const Container = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height:100%;
`;

export const Card = styled.View`
    width: 80%;
    border-radius: 25px;
    background-color: ${Colors.white};
    padding: 30px;

`;

export const PassLabel = styled.Text`
    font-family: 'Roboto-Bold';
    font-size: 16px;
    margin-bottom:40px;
`;

export const PassInput = styled.TextInput`
    margin-bottom: 10px;
    background-color: ${Colors.gray};
    border-width: 1px;
    border-color: ${Colors.softGray};
    border-radius: 10px;
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
