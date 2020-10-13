import React from 'react';
import styled from 'styled-components/native';

export const InputStyled = styled.TextInput`
  max-width: 100%;
  height: 32px;
  border-radius: 6px;
  padding: 0 8px 0 8px;

  font-family: 'SarabunRegular';

  background: #f0f1f4;
`;

const Input: React.FC = ({ ...props }) => {
  return (
    <InputStyled
      placeholder="Buscar produto no carrinho"
      placeholderTextColor="#a6aab4"
      {...props}
    />
  );
};

export default Input;
