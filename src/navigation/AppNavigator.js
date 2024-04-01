import { createStackNavigator } from '@react-navigation/stack'
import AuthNavigation from './AuthNavigation'
import MainTabNavigator from './MainTabNavigator'
import SearchFoodScreen from '../screens/quickAdd/addFood/SearchFoodScreen'

const customNavigationOptions = {
  headerShown: false
}

const Stack = createStackNavigator()
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen name="authNavigation" component={AuthNavigation}
      options={customNavigationOptions} />
      <Stack.Screen name="tabNavigation" component={MainTabNavigator}
      options={customNavigationOptions} />
      <Stack.Screen name="searchFoodScreen" component={SearchFoodScreen}
      options={customNavigationOptions} />
    </Stack.Navigator>
  )
}

export default AppNavigator
