import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Button: React.FC<ButtonProps> = ({ title, onPress, ...rest }) => (
  <ButtonContainer onPress={onPress} {...rest}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);

export default Button;
