import styled from 'styled-components/native';
import Colors from '../../styles/Colors';

export const Container = styled.TouchableOpacity`
  border-style: dashed;
  border-radius: 10px;
  border-width: 1px;
  max-height: 60%;
  border-color: ${Colors.dark};
  background-color: ${Colors.lightGray};

`;

export const MessageWrapper = styled.View`
    padding:30px;
    flex-direction: column;
    align-items: center;
`;

export const  TitleText = styled.Text`
    font-size: 15px;
    font-family: 'Roboto';
    margin-bottom: 12px;
    color: ${Colors.dark};
`;

export const InfoTest = styled.Text`
    font-family: 'Roboto-Bold';
    font-size: 10px;
    color: ${Colors.dark};
`;
export const ImageWrapper = styled.View`
`;
export const ImageContainer = styled.Image`
    border-radius: 10px;
    height: 300px;
`;