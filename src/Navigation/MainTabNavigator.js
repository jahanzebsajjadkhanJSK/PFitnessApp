import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomTabBar from '../components/CustomTabBar'
import DiaryScreen from '../screens/trends'
import HomeScreen from '../screens/home'
import MoreScreen from '../screens/aiCoach/MoreScreen'
import FoodScreen from '../screens/foodDiary/FoodScreen'
import WorkoutScreen from '../screens/workoutDiary'

const Tab = createBottomTabNavigator()

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Workout Diary"
        component={WorkoutScreen}
        options={{ iconName: 'workout' }}
      />
      <Tab.Screen
        name="Food"
        component={FoodScreen}
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
