import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import AnimatedContentHeader from '../../components/Animatable/AnimatedContetHeader';
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

interface HeaderRef {
  fadeInUp(): void;
}

const Shopping: React.FC = () => {
  const [formattedList, setFormattedList] = useState<ProductProps[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [statusCamera, setStatusCamera] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusCamera(true);
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }, [statusCamera]);

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

  const toggleStatusCamera = useCallback(() => setStatusCamera(false), []);

  const totalPrice = useMemo(() => {
    const total = products.reduce((acc, product) => {
      const subtotal = product.price * product.quantity;
      return acc + subtotal;
    }, 0);

    return formatValue(total);
  }, [products]);

  return (
    <Container>
      <TouchableWithoutFeedback onPress={toggleStatusCamera}>
        <Header
          ref={headerRef}
          delay={3000}
          useNativeDriver
          isSelected={searchFocus}
        >
          <AnimatedContentHeader statusCamera={statusCamera}>
            <HeaderTitle isSelected={statusCamera}>Valor da compra</HeaderTitle>
            <TotalValueText isSelected={statusCamera}>
              {totalPrice}
            </TotalValueText>
          </AnimatedContentHeader>
          <Scanner statusCamera={statusCamera} />
          <BarCodeInput statusCamera={statusCamera} />
        </Header>
      </TouchableWithoutFeedback>
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
