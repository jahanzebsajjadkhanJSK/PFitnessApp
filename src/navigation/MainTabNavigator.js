import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomTabBar from '../components/CustomTabBar'
import DiaryScreen from '../screens/foodDiary/DiaryScreen'
import HomeScreen from '../screens/home/HomeScreen'
import MoreScreen from '../screens/aiCoach/MoreScreen'
import FoodScreen from '../screens/foodDiary/FoodScreen'

const Tab = createBottomTabNavigator()

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="Home"
    >
        <Tab.Screen
         name="Home"
         component={HomeScreen}
         options={{ iconName: 'home' }}
      />

     <Tab.Screen
         name="Diary"
         component={DiaryScreen}
         options={{ iconName: 'book' }}
       />
      <Tab.Screen
        name="+"
        component={FoodScreen}
        options={{ iconName: 'plus' }}
      />
      <Tab.Screen
        name="Food"
        component={FoodScreen}
        options={{ iconName: 'cutlery' }}
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
