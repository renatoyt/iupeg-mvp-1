import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Alert, Button, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { find, propEq } from 'ramda';
import TextRegular from '../Text/TextRegular';
import { Products } from '../../util/Products';
import { useCart } from '../../hooks/useCartContext';

interface ProductType {
  id: string;
  name: string;
  description: string;
  // eslint-disable-next-line camelcase
  image_url: string;
  price: number;
  quantity: number;
}

const Container = styled.View`
  flex-direction: column;

  margin-top: 20px;
  height: 50%;
  width: 70%;

  border-radius: 10px;
`;

interface BarCodeScannerResult {
  type: string;
  data: string;
}

const Scanner: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);

  const { addItem } = useCart();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeScannerResult): void => {
    const forCompare = propEq('id', data);
    const findAndCompare: ProductType | any = find(forCompare)(Products);

    const sucess = (): void => {
      addItem(findAndCompare);
    };

    const notFound = (): void => {
      Alert.alert(
        'Erro na leitura',
        'Ocorreu um erro ao realizar a leitura do código de barras, tente novamente',
        [
          {
            text: 'Escanear novamente.',
            onPress: () => setScanned(false),
          },
        ],
      );
    };

    setScanned(true);
    return findAndCompare ? sucess() : notFound();
  };

  if (hasPermission === null) {
    return <TextRegular>Permissão para uso da câmera</TextRegular>;
  }
  if (hasPermission === false) {
    return <TextRegular>Sem acesso a câmera</TextRegular>;
  }

  return (
    <Container>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button
          title="Toque aqui para escanear novamente"
          onPress={() => setScanned(false)}
        />
      )}
    </Container>
  );
};

export default Scanner;
