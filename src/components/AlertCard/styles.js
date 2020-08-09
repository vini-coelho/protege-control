import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.View`
  background-color: ${Colors.gray};
  border-radius: 15px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Divider = styled.View`
    height: 100%;
    border-width: 1px;
    border-color: ${Colors.white};
`;

export const WarningText = styled.Text`
    width: 70%;
    color: ${Colors.white};
    font-size: 13px;
    font-family: 'Roboto'
`;