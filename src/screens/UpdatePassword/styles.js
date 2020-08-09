import styled from "styled-components";
import Colors from "../../styles/Colors";

export const Scroll = styled.ScrollView`
    flex:1;
    background-color: ${Colors.lightGray};
`;

export const ContainerForm = styled.View`
    padding: 20px;
`;

export const LabelText = styled.Text`
    font-family: 'Roboto-Bold';
    font-size: 16px;
`;

export const Input = styled.TextInput`
    margin-bottom: 10px;
    background-color: ${Colors.white};
    border-width: 1px;
    border-color: ${Colors.light};
    border-radius: 5px;
    padding: 10px;
    font-family: 'Roboto';
    font-size: 17px;
`;

export const SubmitButton = styled.TouchableOpacity`
    margin-top: 30px;
    background-color: ${Colors.yellow};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8px 15px;
    align-items: center;
    border-radius: 10px;
    align-self:center;
`;

export const ButtonText = styled.Text`
    font-family: 'Roboto-Black';
    font-size: 15px;
    color: ${Colors.white};
`;