import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

const CustomSplitScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Text>Custom Split</Text>
      </View>
    </SafeAreaView>
  )
}

export default CustomSplitScreen
