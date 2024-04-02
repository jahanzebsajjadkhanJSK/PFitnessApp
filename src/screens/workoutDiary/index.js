import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const WorkoutScreen = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" />
        </TouchableHighlight>
      )
    })
  }, [])

  const handleStartCustomWorkout = () => {
    navigation.navigate('StartCustomWorkoutScreen')
  }

  const handleNavigateWorkoutHistory = () => {
    navigation.navigate('WorkoutHistoryScreen')
  }

  const handleNavigateWorkoutGroup = () => {
    navigation.navigate('WorkoutGroupScreen')
  }

  const handleNavigateEdit = () => {
    navigation.navigate('EditWorkoutScreen')
  }

  const startWorkout = () => {
    console.log('start workout')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={handleStartCustomWorkout} style={styles.row}>
          <Text>Start a Custom Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateWorkoutHistory} style={styles.row}>
          <Text>View Workout History</Text>
        </TouchableOpacity>

        <View>
          <Text>Preloaded:</Text>
          <TouchableOpacity onPress={handleNavigateWorkoutGroup} style={styles.workoutGroupCard}>
            <View style={{ paddingBottom: 20 }}>
              <Text style={{ fontSize: 25 }}>Chest, Triceps, Shoulders</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text>3 Exercises</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={handleNavigateEdit} style={{ paddingHorizontal: 15 }}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={startWorkout} style={{ paddingHorizontal: 15 }}>
                  <Text>Start</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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

export default WorkoutScreen
