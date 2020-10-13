import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

const TextSemiBoldStyled = styled.Text<TextProps>`
  font-family: 'SarabunSemiBold';
`;

const TextSemiBold: React.FC = ({ ...props }) => {
  return <TextSemiBoldStyled {...props} />;
};

export default TextSemiBold;
