import React from 'react';
import styled from 'styled-components/native';
import Icon from '../Icon';
import Input from '../Input';

export const Container = styled.View`
  margin: 0 16px 10px 16px;
`;

export const InputStyled = styled(Input)`
  position: relative;
`;

export const IconStyled = styled(Icon)`
  position: absolute;
  right: 0;
  font-size: 12px;

  margin: 10px 16px 0 0;
`;

const Search: React.FC = ({ ...props }) => {
  return (
    <Container>
      <InputStyled {...props} />
      <IconStyled iconName="search" />
    </Container>
  );
};

export default Search;
