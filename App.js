import React from 'react'
// import AuthNavigation from './src/Navigation/AuthNavigation';
import { NavigationContainer } from '@react-navigation/native'
// import MainTabNavigator from './src/Navigation/MainTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigation/AppNavigator'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import store from './src/store' // Import your store
import { Text, View } from 'react-native'

const App = () => {
  // const signedin = false
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>

        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  )
}

export default App
