import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image } from 'react-native';

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
import stretchingIcon from '../assets/stretching.png'
import stretchingActiveIcon from '../assets/stretching_active.png'
import foodDiaryIcon from '../assets/foodDiary.png'
import foodDiaryActiveIcon from '../assets/foodDiary_active.png'
import homeIcon from '../assets/home.png'
import homeActiveIcon from '../assets/home_active.png'
import trendsIcon from '../assets/trends.png'
import commentIcon from '../assets/comment.png'

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
      screenOptions={({ route }) => ({
        useNativeDriver: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'black'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Workout Diary') {
            iconName = focused ? stretchingActiveIcon : stretchingIcon ;
          } else if (route.name === 'Food') {
            iconName = focused ? foodDiaryActiveIcon : foodDiaryIcon;
          } else if (route.name === 'Home') {
            iconName = focused ? homeActiveIcon : homeIcon;
          } else if (route.name === 'Trends') {
            iconName = focused ? trendsIcon : trendsIcon;
          } else if (route.name === 'More') {
            iconName = focused ? commentIcon : commentIcon;
          }
          return <Image source={iconName} style={{ width: 32, height: 32 }} />;
        },
      })}
      tabBarActiveTintColor="#0779FF"
      tabBarInactiveTintColor="#D9D9D9"
    >
      <Tab.Screen
        name="Workout Diary"
        component={WorkoutStackGroup}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Food"
        component={FoodStackGroup}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Trends"
        component={DiaryScreen}
      />

      <Tab.Screen
        name="More"
        component={MoreScreen}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
