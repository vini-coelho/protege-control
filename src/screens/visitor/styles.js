import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const FilterContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 20px;
    elevation: 3;
`;

export const FilterButton = styled.TouchableOpacity`
    width: 83px;
    height: 29px;
    border-radius: 14px;
    background-color:${props => props.theme};; 
    border-color: ${Colors.yellow};
    border-width: 2px;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.Text`
    text-align:center;
    align-self:center;
    color: ${Colors.secondary}
`;