import styled from 'styled-components/native';
import AnimatedContainer from '../../Animatable/AnimatedContainer';
import Input from '../../Input';

export const Container = styled(AnimatedContainer)`
  flex: 1;
`;

export const Content = styled.View`
  background-color: white;
  padding: 22px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border-color: 'rgba(0, 0, 0, 0.1)';
`;

export const InputStyled = styled(Input)`
  width: 290px;
  height: 42px;
  margin-bottom: 42px;
  font-size: 15.5px;
`;

export const ContentButtons = styled.View`
  flex-direction: row;
`;
