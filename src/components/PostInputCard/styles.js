import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.ScrollView`
    background-color: ${Colors.white};
    border-radius: 15px;
    margin-bottom: 10px;
    margin: 20px 0;
`;


export const Header = styled.View`
    padding: 15px;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.gray};
`;

export const Body = styled.View`
    padding: 15px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-family: 'Roboto-Bold';
    color: ${Colors.dark};
    margin-bottom: 5px;
`;

export const CommomText = styled.Text`
    font-size: 15px;
    font-family: 'Roboto';
    color: ${Colors.dark};
    margin-bottom: 5px;
`;

export const Info = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;

export const DateText = styled.Text`
    font-family: 'Roboto';
    color: ${Colors.yellow};
`;

export const SenderWrapper = styled.View`
    flex-direction: row;
`;

export const Sender = styled.Text`
    font-family: 'Roboto-Bold';
    font-size: 15px;
    color: ${Colors.dark};
`;

export const Button = styled.TouchableOpacity`
    align-self: center;
    background-color: ${props => !props.isSelected ? Colors.yellow: Colors.white};
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 17px;
    margin-bottom: 15px;
    margin-left: 15px;
`;

export const ButtonText = styled.Text`
    font-family: 'Roboto-Bold';
    font-size: 15px;
    color: ${props => props.isSelected ? Colors.yellow: Colors.white};
`;

export const ButtonRow = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    margin: 10px 0;
`;

export const MessageInput = styled.TextInput`
  border-radius: 10px;
  border-width: 1px;
  max-height: 60%;
  border-color: ${Colors.dark};
  background-color: ${Colors.lightGray};
`;