import React from 'react';
import AuthNavigation from './src/Navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigator from './src/Navigation/MainTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/Navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './store'; // Import your store


const App = () => {
  // const signedin = false
  return (
    <SafeAreaProvider>
      <Provider store={store}>
      <PaperProvider>
    <NavigationContainer>
    
      {/* <AuthNavigation/> */}
      {/* <MainTabNavigator/>: */}
      <AppNavigator/>
      
    </NavigationContainer>
    </PaperProvider>
    </Provider>
    </SafeAreaProvider>
  );
};

export default App;
