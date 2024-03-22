import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBar';
import DiaryScreen from '../screens/tabs/DiaryScreen';
import HomeScreen from '../screens/tabs/HomeScreen';
import MoreScreen from '../screens/tabs/MoreScreen';
import FoodScreen from '../screens/tabs/FoodScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ iconName: 'rocket' }}
      />

      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
        options={{ iconName: 'rocket' }}
      />
      <Tab.Screen
        name="+"
        component={DiaryScreen}
        options={{ iconName: 'rocket' }}
      />
      <Tab.Screen
        name="Food"
        component={FoodScreen}
        options={{ iconName: 'rocket' }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{ iconName: 'rocket' }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
