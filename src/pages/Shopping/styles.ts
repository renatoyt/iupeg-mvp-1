import styled, { css } from 'styled-components/native';
import { FlatList, Platform } from 'react-native';
import Constants from 'expo-constants';
import { RectButton } from 'react-native-gesture-handler';
import { createAnimatableComponent as Animated } from 'react-native-animatable';
import TextRegular from '../../components/Text/TextRegular';
import TextSemiBold from '../../components/Text/TextSemiBold';
import TouchableIcon from '../../components/Touchable/TouchableIcon';
import { ProductProps } from './index';

interface PatternProps {
  isSelected?: boolean;
}

export const Container = styled.View`
  flex: 1;

  padding-top: ${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
`;

export const Header = Animated(
  styled.View<PatternProps>`
    flex: 1;

    align-items: center;
    justify-content: center;

    ${props =>
      props.isSelected &&
      css`
        display: none;
      `}
  `,
);

export const HeaderTitle = styled(TextRegular) <PatternProps>`
  font-size: 16px;
  letter-spacing: 0.2px;

  color: #a6aab4;

  ${props =>
    props.isSelected &&
    css`
      font-size: 22px;
    `}
`;

export const TotalValueText = styled(TextSemiBold) <PatternProps>`
  font-size: 32px;
  letter-spacing: 0.5px;

  color: #171d33;

  ${props =>
    props.isSelected &&
    css`
      font-size: 38px;
    `}
`;

export const Section = styled.View<PatternProps>`
  flex: 1;
  background-color: #f9fafb;
  margin: 0;
  padding: 0;

  ${props =>
    props.isSelected &&
    css`
      margin-top: 30px;
    `}
`;

export const Product = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
`;

export const ItensList = styled(FlatList as new () => FlatList<ProductProps>)`
  width: 100%;
  height: 60px;
`;

export const ProductList = styled(RectButton)`
  border-radius: 6px;

  margin: 13px 16px 0 16px;

  background: #fff;

  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.06);
  elevation: 0.4;
`;

export const ProductDescription = styled.View`
  margin-left: 60px;
  top: 10px;
`;

export const ProductPrice = styled.View``;

export const TextName = styled(TextRegular)`
  color: #171d33;
  font-size: 16px;
  letter-spacing: 0.1px;
`;

export const TextQuantity = styled(TextRegular)`
  color: #757f8c;
  font-size: 14px;
  letter-spacing: 0.2px;
`;

export const TextPrice = styled(TextSemiBold)`
  bottom: 26px;
  margin-right: 16px;

  font-size: 16px;
  text-align: right;
  color: red;
  letter-spacing: 0.1px;
`;

export const CartTitle = styled(TextRegular)`
  color: #757f8c;
  font-size: 16px;

  margin: 0 0 15px 15px;
`;

export const Footer = styled.View`
  height: 70px;

  background: #fff;
  box-shadow: 0px -4px 14px rgba(0, 0, 0, 0.06);
  elevation: 15;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const IconStyled = styled(TouchableIcon)`
  margin: 0 15px 0 15px;
`;

export const PaymentIcon = styled.View`
  margin-left: 30px;
`;
