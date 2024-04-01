import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native'

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
