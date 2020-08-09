import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.View`
  height: 100%;
  flex: 1;
`;

export const FAB = styled.TouchableOpacity`
    border-radius: 28px;
    height: 56px;
    width: 56px;
    justify-content: center;
    align-items:center;
    background-color: ${Colors.main};
    position: absolute;
    bottom: 50px;
    right: 16px;
    z-index:100;
`;

export const CondRow = styled.View`
    background-color: ${Colors.gray};
    padding: 15px 24px;
    width: 100%;
`;

export const CondText =styled.Text`
    font-family: 'Roboto-Bold';
    font-size: 16px;
    color: ${Colors.main};
`;