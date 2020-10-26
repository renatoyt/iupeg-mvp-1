import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Alert, Button, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useCart } from '../../hooks/useCartContext';
import findProductByID from '../../util/findProductByID';
import { useCameraPermission } from '../../hooks/useCameraPermission';
import AnimatedContainer from '../Animatable/AnimatedContainer';

interface ComponentProps {
  statusCamera: boolean;
}

interface BarCodeScannerResult {
  type: string;
  data: string;
}

const Container = styled(AnimatedContainer)`
  flex-direction: column;

  margin-top: 20px;
  height: 50%;
  width: 70%;

  border-radius: 10px;
`;

const Scanner = ({ statusCamera }: ComponentProps): JSX.Element => {
  const [scanned, setScanned] = useState(false);

  const { addItem } = useCart();
  const {
    getCurrentStatus,
    openSettingsIOS,
    hasPermission,
  } = useCameraPermission();

  useEffect(() => {
    getCurrentStatus();
  }, [getCurrentStatus]);

  // if (hasPermission === 'denied') {
  //   return (
  //     <>
  //       {!statusCamera && (
  //         <Container animation={!statusCamera ? 'fadeInUp' : 'fadeOut'}>
  //           <Button
  //             title="Permissão acesso à câmera"
  //             onPress={openSettingsIOS}
  //           />
  //         </Container>
  //       )}
  //     </>
  //   );
  // }

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

  return (
    <Container status={statusCamera}>
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
