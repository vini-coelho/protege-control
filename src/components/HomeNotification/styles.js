import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.View`
  
`;

export const Circle = styled.TouchableOpacity`
    border-radius: 25px;
    height: 50px;
    width: 50px;
    justify-content: center;
    align-items:center;
    background-color: ${Colors.yellow};
`;
export const NumberCircle = styled.View`
    border-radius: 10px;
    height: 20px;
    width: 20px;
    justify-content: center;
    align-items:center;
    position: absolute;
    top: -3px;
    left: -3px;
    z-index:100;
    background-color: ${Colors.white};
    color: ${Colors.main};
`;

export const NumberText = styled.Text`
    font-family: 'Roboto-Bold';
    font-size: 15px;
`;