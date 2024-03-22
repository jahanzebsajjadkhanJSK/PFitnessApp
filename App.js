import React from 'react';
import AuthNavigation from './src/Navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigator from './src/Navigation/MainTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const signedin = false
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      {signedin?<MainTabNavigator/>:
      <AuthNavigation/>}
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
