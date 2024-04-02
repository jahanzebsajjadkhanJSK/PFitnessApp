import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const WorkoutBuilderScreen = ({ navigation }) => {
  const handleStartCustomWorkout = () => {
    navigation.navigate('CustomSplitScreen')
  }

  return (
    <SafeAreaView style={{ }}>
      <View style={{ }}>
        <TouchableOpacity onPress={handleStartCustomWorkout} style={styles.row}>
          <Text>Create Custom Split</Text>
        </TouchableOpacity>
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

export default WorkoutBuilderScreen
