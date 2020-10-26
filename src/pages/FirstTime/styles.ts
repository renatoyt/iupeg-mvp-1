import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import TextSemiBold from '../../components/Text/TextSemiBold';
import TextRegular from '../../components/Text/TextRegular';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;

  background: #f9fafb;
  padding-top: ${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TitleHeader = styled(TextSemiBold)`
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.1px;
  color: #757f8c;
`;

export const SloganHeader = styled(TextSemiBold)`
  font-size: 22px;
  line-height: 28px;
  letter-spacing: 0.1px;
  color: #757f8c;

  margin-top: 20px;
`;

export const Section = styled.View``;

export const Footer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-top: 12px;
  border-radius: 12px;
`;

export const TitleFooter = styled(TextSemiBold)`
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.1px;

  color: #525252;
`;

export const InfoFooter = styled(TextRegular)`
  font-size: 18px;
  line-height: 28px;
  margin: 0 93px 0 93px;
  letter-spacing: 0.1px;
  text-align: center;

  color: #999;
`;

export const ButtonsFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 18px 0 ${25 + getBottomSpace()}px;
`;

export const JumpButton = styled(Button)`
  width: 157px;
  margin-right: 7px;
`;

export const AllowButton = styled(Button)`
  width: 157px;
  margin-left: 7px;
`;
