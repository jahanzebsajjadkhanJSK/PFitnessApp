import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ExerciseDetailsScreen from '../exerciseDetails'

const WorkoutGroupScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <View style={{ height: '100%' }}>
      <View style={styles.header}>
        <Text style={styles.header.text}>Chest, Triceps, Shoulders</Text>
        <TouchableOpacity style={styles.header.button}>
          <Text>Start</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View style={styles.card}>
          <View style={styles.card.img}></View>
          <View style={styles.card.column}>
            <Text>Bench Press</Text>
            <Text>Barbell</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ExerciseDetailsScreen visible={isModalVisible} onClose={setIsModalVisible} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    height: '30%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    text: {
      fontSize: 25,
      marginBottom: 15
    },
    button: {
      backgroundColor: '#0779FF',
      padding: 20,
      borderRadius: 10
    }
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#73789c',
    margin: 10,
    padding: 20,
    img: {
      padding: 20,
      backgroundColor: 'grey'
    },
    column: {
      flexDirection: 'column',
      marginLeft: 20
    }
  }
})

export default WorkoutGroupScreen
