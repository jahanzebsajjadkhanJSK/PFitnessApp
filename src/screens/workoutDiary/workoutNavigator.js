import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WorkoutScreen from '.'
import StartCustomWorkoutScreen from './customWorkout'
import WorkoutHistoryScreen from './workoutHistory'
import WorkoutGroupScreen from './workoutGroup'
import EditWorkoutScreen from './editWorkout'
import WorkoutBuilderScreen from '../workoutBuilder'
import CustomSplitScreen from '../workoutBuilder/customSplit'
import StartWorkout from './startWorkout'

const WorkoutStack = createNativeStackNavigator()
export const WorkoutStackGroup = () => {
  return (
    <WorkoutStack.Navigator initialRouteName='WorkoutScreen'>
      <WorkoutStack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{ headerShown: false }} />
      <WorkoutStack.Screen name="StartCustomWorkoutScreen" component={StartCustomWorkoutScreen}
        options={{
          headerShown: true,
          animationEnabled: true
        }} />
      <WorkoutStack.Screen name="WorkoutHistoryScreen" component={WorkoutHistoryScreen} options={{ headerShown: false }} />
      <WorkoutStack.Screen name="WorkoutGroupScreen" component={WorkoutGroupScreen}
        options={{
          headerShown: false
        }} />
      <WorkoutStack.Screen name="EditWorkoutScreen" component={EditWorkoutScreen} options={{ headerShown: false }} />
      <WorkoutStack.Screen name="StartWorkoutScreen" component={StartWorkout} options={{ headerShown: false }} />
      <WorkoutStack.Screen name="WorkoutBuilder" component={WorkoutBuilderScreen} options={{ headerShown: false }} />
      <WorkoutStack.Screen name="CustomSplitScreen" component={CustomSplitScreen} options={{ headerShown: false, navigationBarHidden: true }}/>
    </WorkoutStack.Navigator>
  )
}
