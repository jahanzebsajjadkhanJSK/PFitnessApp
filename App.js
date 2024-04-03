import AuthNavigation from './src/navigation/AuthNavigation'
import { NavigationContainer } from '@react-navigation/native'
// import MainTabNavigator from './src/navigation/MainTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigation/AppNavigator'
import { PaperProvider } from 'react-native-paper'
import { Provider, observer } from 'mobx-react'
import { stores } from './src/store'

const App = () => {
  return (
    <Provider store={stores}>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            {stores.userStore.isAuthenticated ? <AppNavigator /> : <AuthNavigation />}
          </NavigationContainer>

        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  )
}

export default observer(App)
