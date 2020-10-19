import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Shopping, ProductDetails } from '../pages';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#f9fafb' },
    }}
  >
    <App.Screen name="Shopping" component={Shopping} />
    <App.Screen
      options={{ gestureEnabled: false }}
      name="ProductDetails"
      component={ProductDetails}
    />
  </App.Navigator>
);

export default AppRoutes;
