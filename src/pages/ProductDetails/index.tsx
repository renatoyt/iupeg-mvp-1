import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  Header,
  IconBackToShopping,
  ScrollContainer,
  ProductContainer,
  Product,
  ProductImageContainer,
  ProductContent,
  ProductTitle,
  ProductDescription,
  ProductPricing,
  TotalContainer,
  TotalTitle,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  IconDecrement,
  AdittionalItemText,
  IconIncrement,
  FinishOrderButton,
  ButtonText,
  IconContainer,
  IconCheck,
} from './styles';

const ProductDetails: React.FC = () => {
  return (
    <Container>
      <Header>
        <IconBackToShopping />
      </Header>

      <ScrollContainer>
        <ProductContainer>
          <Product>
            <ProductImageContainer>
              <Image
                style={{ margin: 20 }}
                // eslint-disable-next-line global-require
                source={require('../../assets/jack-daniels.png')}
              />
            </ProductImageContainer>

            <ProductContent>
              <ProductTitle>Jack Daniels</ProductTitle>
              <ProductDescription>
                Whisky Americano JACK DANIELs Garrafa 750 ML
              </ProductDescription>
              <ProductPricing>R$ 79,90</ProductPricing>
            </ProductContent>
          </Product>
        </ProductContainer>

        <TotalContainer>
          <TotalTitle>Total do pedido</TotalTitle>

          <PriceButtonContainer>
            <TotalPrice>R$ 158,80</TotalPrice>

            <QuantityContainer>
              <IconDecrement iconName="minus" />
              <AdittionalItemText>2</AdittionalItemText>
              <IconIncrement iconName="plus" />
            </QuantityContainer>
          </PriceButtonContainer>

          <FinishOrderButton>
            <ButtonText>Confirmar pedido</ButtonText>
            <IconContainer>
              <IconCheck iconName="check-square" />
            </IconContainer>
          </FinishOrderButton>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default ProductDetails;
