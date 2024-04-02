import { createDrawerNavigator } from '@react-navigation/drawer'

import AuthNavigation from './AuthNavigation'
import MainTabNavigator from './MainTabNavigator'
import WorkoutBuilderScreen from '../screens/workoutBuilder'

const customNavigationOptions = {
  headerShown: false
}

const Drawer = createDrawerNavigator()
const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="HoWorkout Builderme">
      <Drawer.Screen name="Home" component={MainTabNavigator} options={customNavigationOptions} />
      <Drawer.Screen name="Workout Builder" component={WorkoutBuilderScreen} />
    </Drawer.Navigator>
  )
}
export default AppNavigator

//     {/* <Stack.Screen name="authNavigation" component={AuthNavigation}
// options={customNavigationOptions} /> */}
