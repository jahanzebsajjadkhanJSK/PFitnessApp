import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native'

const WorkoutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Text>Workout Scren</Text>
      </View>
    </SafeAreaView>
  )
}

export default WorkoutScreen
