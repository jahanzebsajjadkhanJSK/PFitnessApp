import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet } from 'react-native'

const InstructionsScreen = ({ navigation, activeExercise }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{activeExercise.instructions}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#121A24',
    backgroundColor: '#1C242D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 14,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: -0.165,
  }

})

export default InstructionsScreen
