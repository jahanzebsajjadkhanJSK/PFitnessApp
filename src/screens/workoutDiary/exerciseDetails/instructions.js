import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity } from 'react-native'

const InstructionsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Text>Lie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.", "From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest.", "After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then start coming down slowly again. Tip: Ideally, lowering the weight should take about twice as long as raising it." etc.</Text>
      </View>
    </SafeAreaView>
  )
}

export default InstructionsScreen
