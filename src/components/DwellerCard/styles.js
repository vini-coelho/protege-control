import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 16px 24px;
`;

export const Circle = styled.View`
    border-radius: 25px;
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items:center;
    background-color: ${Colors.yellow};
`;

export const InfoContainer = styled.View`
    flex-direction: column;
    align-items: flex-start;
    margin-left: 16px;
`;

export const NameText = styled.Text`
    font-family: 'Roboto-Bold';
    font-size: 14px;
    color: ${Colors.main};
`;

export const AdressText = styled.Text`
    font-family: 'Roboto';
    font-size: 12px;
    color: ${Colors.dark};
`;