import React from 'react';
import AuthNavigation from './src/Navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigator from './src/Navigation/MainTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
