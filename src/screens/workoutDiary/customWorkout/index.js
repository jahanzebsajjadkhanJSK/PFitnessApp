import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const StartCustomWorkoutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Text>Start a Custom Workout</Text>
      </View>
    </SafeAreaView>
  )
}

export default StartCustomWorkoutScreen
