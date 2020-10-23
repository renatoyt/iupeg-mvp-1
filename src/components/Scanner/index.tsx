import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Alert, Button, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { createAnimatableComponent as Animated } from 'react-native-animatable';
import TextRegular from '../Text/TextRegular';
import { useCart } from '../../hooks/useCartContext';
import findProductByID from '../../util/findProductByID';

interface ScannerProps {
  statusCamera: boolean;
}

interface ComponentProps {
  statusCamera: boolean;
}

interface BarCodeScannerResult {
  type: string;
  data: string;
}

const JustStyles = styled.View`
  flex-direction: column;

  margin-top: 20px;
  height: 50%;
  width: 70%;

  border-radius: 10px;
`;

const Container = Animated(JustStyles);

const Scanner = ({ statusCamera }: ComponentProps): JSX.Element => {
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
    const product = findProductByID(data);

    const sucess = (): void => {
      addItem(product);
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
    return product ? sucess() : notFound();
  };

  if (hasPermission === null) {
    return <TextRegular>Permissão para uso da câmera</TextRegular>;
  }
  if (hasPermission === false) {
    return <TextRegular>Sem acesso a câmera</TextRegular>;
  }

  return (
    <>
      {!statusCamera && (
        <Container animation={!statusCamera ? 'fadeInUp' : 'fadeOut'}>
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
      )}
    </>
  );
};

export default Scanner;
