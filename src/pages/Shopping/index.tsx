import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import BarCodeInput from '../../components/Popups/BarCodeInput';
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
  SectionHeader,
  CameraIcon,
  TotalValueText,
  ScannerStyled,
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

interface HeaderRef {
  fadeInUp(): void;
}

const Shopping: React.FC = () => {
  const [formattedList, setFormattedList] = useState<ProductProps[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [camera, setCamera] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);

  const { navigate } = useNavigation();
  const { products } = useCart();
  const headerRef = useRef<HeaderRef | any>(null);

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

  const handleSearch = useCallback(text => {
    setSearchValue(text);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchFocus(!searchFocus);
    if (headerRef) {
      headerRef.current?.fadeInUp();
    }
  }, [searchFocus]);

  const navigateToProductDetails = useCallback(
    (id: string) => {
      navigate('ProductDetails', { id });
    },
    [navigate],
  );

  const toggleCamera = useCallback(() => setCamera(!camera), [camera]);

  const totalPrice = useMemo(() => {
    const total = products.reduce((acc, product) => {
      const subtotal = product.price * product.quantity;
      return acc + subtotal;
    }, 0);

    return formatValue(total);
  }, [products]);

  return (
    <Container>
      <Header
        ref={headerRef}
        delay={3000}
        useNativeDriver
        isSelected={searchFocus}
      >
        <ContentHeader>
          <HeaderTitle>Valor da compra</HeaderTitle>
          <TotalValueText>{totalPrice}</TotalValueText>
        </ContentHeader>
        <ScannerStyled />
        <SectionHeader>
          <BarCodeInput />
          <CameraIcon
            isSelected={camera}
            onPress={toggleCamera}
            iconName="camera-off"
          />
        </SectionHeader>
      </Header>
      <Section isSelected={searchFocus}>
        <CartTitle>Carrinho de compras</CartTitle>
        <Search
          onBlur={toggleSearch}
          onFocus={toggleSearch}
          onChangeText={text => handleSearch(text)}
          value={searchValue}
        />
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
