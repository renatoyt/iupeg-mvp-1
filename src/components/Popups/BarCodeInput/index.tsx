import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Container, Content, InputStyled, ContentButtons } from './styles';

const BarCodeInput = (): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Container>
      <Button
        title="Inserir código de barras"
        onPress={toggleModal}
        style={{ marginTop: 5 }}
        buttonStyle={{ backgroundColor: '#3D8979', height: 40 }}
      />

      <Modal
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}
        isVisible={isModalVisible}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Content>
            <InputStyled placeholder="Digite o código de barras do produto" />
            <ContentButtons>
              <Button
                buttonStyle={{
                  backgroundColor: '#3D8979',
                  height: 50,
                  width: 120,
                  marginRight: 22,
                }}
                type="solid"
                title="Ok"
                onPress={toggleModal}
              />
              <Button
                type="solid"
                title="Voltar"
                onPress={toggleModal}
                buttonStyle={{
                  backgroundColor: '#EA1D2C',
                  height: 50,
                  width: 120,
                  marginLeft: 22,
                }}
              />
            </ContentButtons>
          </Content>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  );
};

export default BarCodeInput;
