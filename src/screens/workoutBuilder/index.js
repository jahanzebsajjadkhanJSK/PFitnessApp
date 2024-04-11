import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { GroupTemplate } from '../workoutDiary/components/groupTemplate'
import CalendarIcon from '../../assets/calendar.png'
import { useStores } from '../../store/useStores'


const WorkoutBuilderScreen = ({ navigation }) => {
  const { userStore, exerciseStore } = useStores()
  const [isLoading, setIsLoading] = useState(false)

  const handleStartCustomWorkout = () => {
    navigation.navigate('CustomSplitScreen')
  }

  useEffect(() => {
    const getExercises = async () => {
      setIsLoading(true)
      await exerciseStore.getAllExercises(userStore.token)
      setIsLoading(false)
    }

    getExercises()
  }, [])


  return (
    <GroupTemplate 
      heading="Workout Builder"
      actionCardsTitle=""
      actionCards={{
        card1: {
          icon: CalendarIcon,
          title: 'Create Custom Split',
          action: handleStartCustomWorkout
        }
      }}
      exerciseGroups={exerciseStore.exerciseGroups}
    >

    </GroupTemplate>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    margin: 10,
    padding: 18
  },
  workoutGroupCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    margin: 10,
    padding: 18
  }
})

export default observer(WorkoutBuilderScreen)
