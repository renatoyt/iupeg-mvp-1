import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Scanner from '../../components/Scanner';
import Search from '../../components/Search';
import TextRegular from '../../components/Text/TextRegular';
import GoToPaymentButton from '../../components/Touchable/GoToPaymentButton';
import formatValue from '../../util/formatValue';
import { Products } from '../../util/Products';
import {
  Container,
  Header,
  ContentHeader,
  Section,
  HeaderTitle,
  TotalValueText,
  Product,
  ItensList,
  ProductDescription,
  ProductList,
  ProductPrice,
  TextName,
  TextQuantity,
  TextPrice,
  CartTitle,
  Footer,
  IconStyled,
  PaymentIcon,
} from './styles';

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
}

const Shopping: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const { navigate } = useNavigation();

  useEffect(() => {
    const formattedData = Products.map(dt => {
      return {
        ...dt,
        formattedPrice: formatValue(dt.price),
      };
    });

    setProducts(formattedData);
  }, []);

  const navigateToProductDetails = useCallback(() => {
    navigate('ProductDetails');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <ContentHeader>
          <HeaderTitle>Valor da compra</HeaderTitle>
          <TotalValueText>R$ 178,21</TotalValueText>
        </ContentHeader>
        <Scanner />
      </Header>
      <Section>
        <CartTitle>Carrinho de compras</CartTitle>
        <Search />
        <Product>
          <ItensList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ProductList onPress={navigateToProductDetails}>
                <ProductDescription>
                  <TextName>
                    <TextRegular style={{ color: '#a6aab4' }}>iu: </TextRegular>
                    {item.name}
                  </TextName>
                  <TextQuantity>01 unidade</TextQuantity>
                </ProductDescription>
                <ProductPrice>
                  <TextPrice>{item.formattedPrice}</TextPrice>
                </ProductPrice>
              </ProductList>
            )}
          />
        </Product>
      </Section>
      <Footer>
        <IconStyled iconName="home" />
        <IconStyled iconName="credit-card" />
        <IconStyled iconName="settings" />
        <PaymentIcon>
          <GoToPaymentButton iconName="arrow-right" />
        </PaymentIcon>
      </Footer>
    </Container>
  );
};

export default Shopping;
