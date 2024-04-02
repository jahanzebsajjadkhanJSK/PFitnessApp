import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity } from 'react-native'

const HistoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Text>History</Text>
      </View>
    </SafeAreaView>
  )
}

export default HistoryScreen
