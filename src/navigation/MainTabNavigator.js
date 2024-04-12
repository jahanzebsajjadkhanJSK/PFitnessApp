import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image, View } from 'react-native'

import DiaryScreen from '../screens/foodDiary'
import HomeScreen from '../screens/home'

import MoreScreen from '../screens/aiCoach/MoreScreen'
import FoodScreen from '../screens/foodDiary/FoodScreen'
import SearchFoodScreen from '../components/quickAdd/addFood/SearchFoodScreen'
import TrendsScreen from '../screens/trends'

import { WorkoutStackGroup, WorkoutBuilderStackGroup } from '../screens/workoutDiary/workoutNavigator'
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
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        useNativeDriver: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'black'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Workout Diary') {
            iconName = focused ? stretchingActiveIcon : stretchingIcon
          } else if (route.name === 'Workout Builder') {
            iconName = focused ? stretchingActiveIcon : stretchingIcon
          } else if (route.name === 'Food Diary') {
            iconName = focused ? foodDiaryActiveIcon : foodDiaryIcon
          } else if (route.name === 'Home') {
            iconName = focused ? homeActiveIcon : homeIcon
          } else if (route.name === 'Trends') {
            iconName = focused ? trendsIcon : trendsIcon
          } else if (route.name === 'More') {
            iconName = focused ? commentIcon : commentIcon
          }
          return <Image source={iconName} style={{ width: 32, height: 32 }} />
        }
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
        name="Food Diary"
        component={DiaryScreen}

      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Trends"
        component={TrendsScreen}
      />

      <Tab.Screen
        name="More"
        component={MoreScreen}
      />
      <Tab.Screen
        name="Workout Builder Tab"
        component={WorkoutBuilderStackGroup}
        options={{
          tabBarButton: () => <View style={{ display: 'none' }} />,
          tabBarVisible: true
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
