import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const FilterContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 20px;
`;

export const FilterButton = styled.TouchableOpacity`
    width: 83px;
    height: 29px;
    border-bottom-color:${props => props.theme};
    border-bottom-width: 2px;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    margin-top: 20px
`;

export const ButtonText = styled.Text`
    text-align:center;
    align-self:center;
    font-family: ${props => props.isSelected? "Roboto-Bold": "Roboto"};
    font-size: 18px;
    color: ${Colors.main};
`;

export const ListHeaderContainer = styled.View`
    padding: 0 20px;
`;

export const RowContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 5px 0;
`;

export const TextWrapper = styled.View`
    width: ${props => props.width};
    max-height: 17px;
    overflow: hidden;
    align-self: center;
`;

export const ListHeaderText = styled.Text`
    font-size: 13px;
    font-family: "Roboto-Bold";
    color: ${Colors.main}
`;

export const VisitorText = styled.Text`
    font-size: 13px;
    font-family: "Roboto";
    color: ${Colors.main}
`;