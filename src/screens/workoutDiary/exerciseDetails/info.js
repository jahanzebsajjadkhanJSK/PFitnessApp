import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity } from 'react-native'

const InfoScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Text>Info</Text>
      </View>
    </SafeAreaView>
  )
}

export default InfoScreen
