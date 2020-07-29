import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.View`
    width: 100%;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`;

export const MenuText = styled.Text`
    font-size: 18px;
    font-family: "Roboto-Black";
    color: ${Colors.white}
`;
