import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native'
import Header from '../workoutDiary/components/header'

const HomeScreen = ({ navigation }) => {
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#010A18' }}>
        <Header heading="Home" />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View>
      </SafeAreaView>
  )
}

export default HomeScreen
