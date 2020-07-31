import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.TouchableOpacity`
    background-color:${props=> props.checked? Colors.yellow : Colors.white};
    border-color:${props=> props.checked? Colors.yellow : Colors.main};
    border-width:1px;
    width: 30px;
    height: 30px;
    border-radius: 5px;
`;
