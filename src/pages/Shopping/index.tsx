import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import BarCodeInput from '../../components/Popups/BarCodeInput';
import Scanner from '../../components/Scanner';
import Search from '../../components/Search';
import TextRegular from '../../components/Text/TextRegular';
import GoToPaymentButton from '../../components/Touchable/GoToPaymentButton';
import { useCart } from '../../hooks/useCartContext';
import formatValue from '../../util/formatValue';
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
  quantity: number;
}

const Shopping: React.FC = () => {
  const [formattedList, setFormattedList] = useState<ProductProps[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const { navigate } = useNavigation();
  const { products } = useCart();

  const handleSearch = useCallback(text => {
    setSearchValue(text);
  }, []);

  useEffect(() => {
    const formattedData = products.map(dt => {
      return {
        ...dt,
        formattedPrice: formatValue(dt.price),
      };
    });

    const searchProducts = formattedData.filter(data => {
      return data.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setFormattedList(searchProducts);
  }, [products, searchValue]);

  const navigateToProductDetails = useCallback(
    (id: string) => {
      navigate('ProductDetails', { id });
    },
    [navigate],
  );

  const totalPrice = useMemo(() => {
    const total = products.reduce((acc, product) => {
      const subtotal = product.price * product.quantity;
      return acc + subtotal;
    }, 0);

    return formatValue(total);
  }, [products]);

  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Header>
          <ContentHeader>
            <HeaderTitle>Valor da compra</HeaderTitle>
            <TotalValueText>{totalPrice}</TotalValueText>
          </ContentHeader>
          <Scanner />
          <BarCodeInput />
        </Header>
      </TouchableWithoutFeedback>
      <Section>
        <CartTitle>Carrinho de compras</CartTitle>
        <Search onChangeText={text => handleSearch(text)} value={searchValue} />
        <Product>
          <ItensList
            data={formattedList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ProductList onPress={() => navigateToProductDetails(item.id)}>
                <ProductDescription>
                  <TextName>
                    <TextRegular style={{ color: '#a6aab4' }}>iu: </TextRegular>
                    {item.name}
                  </TextName>
                  <TextQuantity>{item.quantity} unidade</TextQuantity>
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
