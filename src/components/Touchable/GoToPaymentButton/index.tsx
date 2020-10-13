import React from 'react';
import styled from 'styled-components/native';
import Icon from '../../Icon/index';

interface TouchableIconPropsElement {
  iconName: string;
}

const TouchableStyled = styled.TouchableOpacity`
  height: 56px;
  width: 56px;
  background-color: #54d3ad;
  border-radius: 28px;

  position: relative;

  justify-content: center;
  align-items: center;

  box-shadow: 0px 4px 12px rgba(97, 62, 234, 0.5);
  elevation: 10;
`;

const IconStyled = styled(Icon)`
  position: absolute;
  color: #fff;
  font-size: 40px;
`;

const GoToPaymentButton: React.FC<TouchableIconPropsElement> = ({
  iconName,
  ...props
}) => {
  return (
    <TouchableStyled {...props}>
      <IconStyled iconName={iconName} />
    </TouchableStyled>
  );
};

export default GoToPaymentButton;
