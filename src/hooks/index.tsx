import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './useCartContext';
import { CameraPermissionProvider } from './useCameraPermission';

const AppProvider: React.FC = ({ children }) => {
  return (
    <CameraPermissionProvider>
      <CartProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </CartProvider>
    </CameraPermissionProvider>
  );
};

export default AppProvider;
