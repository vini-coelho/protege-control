import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

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
    width: 20%;
    height: 30px;
    align-items: center;
    border-radius: 15px;
    align-self:center;
`;

export const ButtonText = styled.Text`
    font-family: 'Roboto-Black';
    font-size: 15px;
    color: ${Colors.white};
`;

export const CheckBoxRow = styled.View`
    display: flex;
    flex-direction: row;
`;

export const CheckBoxLabelText = styled.Text`
    font-family: 'Roboto';
    font-size: 14px;
    margin: 0 15px;
`;

export const Scroll = styled.ScrollView`
    flex:1;
    background-color: ${Colors.lightGray}
`;
export const ContainerForm = styled.View`
    padding: 20px;
`;

export const CheckBoxGroup = styled.View`
    display: flex;
    flex-direction: row;
    padding:10px 0;
    align-items: center;
`;