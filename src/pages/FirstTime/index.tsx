/* eslint-disable global-require */
import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  Header,
  TitleHeader,
  SloganHeader,
  Section,
  ImageContent,
  Footer,
  TitleFooter,
  InfoFooter,
  ButtonsFooter,
  JumpButton,
  AllowButton,
} from './styles';

const FirstTime = (): JSX.Element => {
  return (
    <Container>
      <Header>
        <TitleHeader>BEM-VINDO</TitleHeader>
        <SloganHeader>Faça compras sem pegar filas!</SloganHeader>
      </Header>
      <Section>
        <Image source={require('../../assets/home-image-png.png')} />
      </Section>
      <Footer>
        <TitleFooter>Permitir acesso a câmera</TitleFooter>
        <InfoFooter>
          Para o escaneamento dos produtos no seu aplicativo
        </InfoFooter>
        <ButtonsFooter>
          <JumpButton
            buttonStyle={{
              backgroundColor: '#fff',
              height: 72,
              borderColor: '#3d8979',
              borderRadius: 12,
              borderWidth: 1.3,
            }}
            title="Pular"
            titleProps={{
              style: {
                color: '#3d8979',
                fontSize: 22,
                fontFamily: 'SarabunSemiBold',
              },
            }}
          />
          <AllowButton
            buttonStyle={{
              backgroundColor: '#3d8979',
              height: 72,
              borderRadius: 12,
            }}
            title="Permitir"
            titleProps={{
              style: {
                color: '#fff',
                fontFamily: 'SarabunSemiBold',
                fontSize: 22,
              },
            }}
          />
        </ButtonsFooter>
      </Footer>
    </Container>
  );
};

export default FirstTime;
