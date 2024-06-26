import { createDrawerNavigator } from '@react-navigation/drawer'

import MainTabNavigator from './MainTabNavigator'

const customNavigationOptions = {
  headerShown: false
}

const Drawer = createDrawerNavigator()
const AppNavigator = () => {
  return (
    <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={{
      drawerType: 'front',
      drawerStyle: {
        backgroundColor: '#010A18',
        paddingTop: 60
      }
    }}
    >
      <Drawer.Screen name="Home" component={MainTabNavigator} options={customNavigationOptions} />
      <Drawer.Screen
          name="Workout Builder"
          component={MainTabNavigator}
          options={customNavigationOptions}
          listeners={({ navigation }) => ({
            focus: () => {
              navigation.navigate('Workout Builder Tab')
            }
          })}
        />
    </Drawer.Navigator>
  )
}
export default AppNavigator
