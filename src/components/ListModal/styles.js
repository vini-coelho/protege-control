import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height:100%;
`;
export const Card = styled.View`
    width: 80%;
    height:40%;
    border-radius: 25px;
    background-color: ${Colors.white};
    padding: 30px;
`;
export const TextWrapper = styled.TouchableOpacity`
    padding: 10px 0;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.softGray}
`;

export const ItemText = styled.Text`
    font-size: 14px;
    font-family: "Roboto-Bold";
    color: ${Colors.main};
`;