import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const MenuContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
    margin-bottom: 20px;

`;

export const  CondominumContainer = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CondominumNameText = styled.Text`
    font-family: "Roboto-Bold";
    font-size: 18px;
    color: ${Colors.white};
`;

export const CondominumAddressText = styled.Text`
    font-family: "Roboto-Light";
    font-size: 14px;
    max-width: 80%;
    text-align: center;
    color: ${Colors.gray};
`;

export const LineView = styled.View`
    width:50%;
    margin: 8px;
    border-bottom-color: ${Colors.yellow};
    border-bottom-width: 1px;
`;

export const NotificationRow = styled.View`
    display: flex;
    flex-direction: row;
    padding-right: 30px;
    justify-content: flex-end;
`;

export const ItemView = styled.View`
    margin: 10px;
    width: 45%;
`;

export const ChangeCondominiumButton = styled.TouchableOpacity`
    margin-top: 30px;
    background-color: ${Colors.yellow};
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    height: 30px;
    align-items: center;
    border-radius: 15px;
`;

export const ButtonText = styled.Text`
    font-family: 'Roboto-Black';
    font-size: 15px;
    color: ${Colors.white};
`;