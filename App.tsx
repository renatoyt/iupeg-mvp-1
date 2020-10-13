/* eslint-disable react/style-prop-object */
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Sarabun_400Regular as SarabunRegular,
  Sarabun_600SemiBold as SarabunSemiBold,
  useFonts,
} from '@expo-google-fonts/sarabun';
import { AppLoading } from 'expo';
import Routes from './src/routes';
import useCachedResources from './src/hooks/useCachedResources';

const App: React.FC = () => {
  const isLoadingComplete = useCachedResources();

  const [loaded] = useFonts({
    SarabunRegular,
    SarabunSemiBold,
  });

  if (!loaded) {
    return <AppLoading />;
  }

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#F9FAFB" translucent style="inverted" />
        <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
          <Routes />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
