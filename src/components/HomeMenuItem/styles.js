import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.TouchableOpacity`
    width: 160px;
    height: 100px;
    border-radius: 5px;
    background-color: ${Colors.gray};
    padding: 20px;
`;
export const Text = styled.Text`
    font-size: 14px;
    font-family: "Roboto-light";
    color: ${Colors.dark};
    margin-top: 8px;
`;
