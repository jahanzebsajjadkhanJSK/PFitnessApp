import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DiaryScreen from '../screens/trends'
import HomeScreen from '../screens/home'
import MoreScreen from '../screens/aiCoach/MoreScreen'
import FoodScreen from '../screens/foodDiary/FoodScreen'
import WorkoutScreen from '../screens/workoutDiary'
import StartCustomWorkoutScreen from '../screens/workoutDiary/customWorkout'
import WorkoutHistoryScreen from '../screens/workoutDiary/workoutHistory'
import WorkoutGroupScreen from '../screens/workoutDiary/workoutGroup'
import EditWorkoutScreen from '../screens/workoutDiary/editWorkout'
import SearchFoodScreen from '../screens/quickAdd/addFood/SearchFoodScreen'
import CustomSplitScreen from '../screens/workoutBuilder/customSplit'

const Tab = createBottomTabNavigator()

const customNavigationOptions = {
  headerShown: false
}

const WorkoutStack = createNativeStackNavigator()
const WorkoutStackGroup = () => {
  return (
    <WorkoutStack.Navigator initialRouteName='WorkoutScreen'>
      <WorkoutStack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{ headerShown: false }} />
      <WorkoutStack.Screen name="StartCustomWorkoutScreen" component={StartCustomWorkoutScreen}
        options={{
          headerShown: true,
          animationEnabled: true
        }} />
      <WorkoutStack.Screen name="WorkoutHistoryScreen" component={WorkoutHistoryScreen}
        options={{
          headerShown: true,
          headerTitleStyle: { display: 'none' },
          animationEnabled: true,
          headerBackTitle: 'Workout Log'
        }} />
      <WorkoutStack.Screen name="WorkoutGroupScreen" component={WorkoutGroupScreen}
        options={{
          headerShown: false,
        }} />
      <WorkoutStack.Screen name="EditWorkoutScreen" component={EditWorkoutScreen} options={{ headerShown: false}} />
      <WorkoutStack.Screen name="CustomSplitScreen" component={CustomSplitScreen}
        options={{
          headerShown: true,
          animationEnabled: true,
          headerBackTitle: 'Back'
        }} />
    </WorkoutStack.Navigator>
  )
}

const FoodStack = createNativeStackNavigator()
const FoodStackGroup = () => {
  return (
    <FoodStack.Navigator initialRouteName='foodScreen'>
      <FoodStack.Screen name="foodScreen" component={FoodScreen} options={customNavigationOptions} />
      <FoodStack.Screen name="searchFoodScreen" component={SearchFoodScreen} options={customNavigationOptions} />
    </FoodStack.Navigator>
  )
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Workout Diary"
      screenOptions={{ useNativeDriver: false }}
    >
      <Tab.Screen
        name="Workout Diary"
        component={WorkoutStackGroup}
        options={{ iconName: 'workout', headerShown: false }}
      />
      <Tab.Screen
        name="Food"
        component={FoodStackGroup}
        options={{ iconName: 'cutlery' }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ iconName: 'plus' }}
      />
      <Tab.Screen
        name="Trends"
        component={DiaryScreen}
        options={{ iconName: 'book' }}
      />

      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{ iconName: 'cog' }}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
