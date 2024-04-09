import { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'

import ExerciseDetailsScreen from '../exerciseDetails'
import GradientButton from '../../../components/GradientButton'
import ImageCycler from '../components/imageCycler'

const WorkoutGroupScreen = ({ navigation }) => {
  const route = useRoute()
  const { activeGroup } = route.params

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [activeExercise, setActiveExercise] = useState({})

  const handleClose = () => {
    navigation.goBack()
  }

  const handleExerciseClick = (exercise) => {
    setActiveExercise(exercise)
    setIsModalVisible(true)
  }

  return (
    <View style={{ height: '100%', backgroundColor: '#010A18' }}>

      <View style={styles.header}>
        <View style={styles.header.topRow}>
          <Text style={styles.header.topRow.closeBtn} onPress={handleClose}>Close</Text>
        </View>
        <Text style={styles.header.text}>{activeGroup.name}</Text>
        <GradientButton
          title="Start"
          colors={['#0779FF', '#044999']}
          style={styles.header.button}
        />
      </View>

      {activeGroup.exerciseList.length > 0 && activeGroup.exerciseList.map((exercise) => {
        // Parse the images in backend
        const parsed = JSON.parse(exercise.images);
        return (
          <View key={exercise.id}>
            <TouchableOpacity onPress={() => handleExerciseClick(exercise)}>
              <View style={styles.card}>
                <ImageCycler
                  firstImageUrl={parsed[0]}
                  secondImageUrl={parsed[1]}
                  style={styles.card.img}
                />
                <View style={styles.card.column}>
                  <Text style={styles.card.column.name}>{exercise.name}</Text>
                  <Text style={styles.card.column.equipment}>{exercise.equipment}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <ExerciseDetailsScreen activeExercise={activeExercise} visible={isModalVisible} onClose={setIsModalVisible} />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    topRow: {
      flexDirection: 'row-reverse',
      width: '100%',
      marginLeft: 16,
      closeBtn: {
        color: '#0779FF',

        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: -0.165,
      }
    },
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C242D',
    height: '30%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    text: {
      color: '#FFF',
      textAlign: 'center',
      fontFamily: 'Poppins',
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '600',
      letterSpacing: -0.165,
    },
    button: {
      width: 118,
      padding: 8,
      borderRadius: 10,
      marginTop: 17,
      alignItems: 'center'
    }
  },
  card: {
    flexDirection: 'row',
    marginTop: 22,
    marginRight: 15,
    marginLeft: 15,
    paddingTop: 13,
    paddingRight: 16,

    borderRadius: 16,
    backgroundColor: '#121A24',
    height: 76,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,

    img: {
      backgroundColor: '#656565',
      width: 71,
      height: 40,
      borderRadius: 8,
      marginLeft: 16
    },
    column: {
      flexDirection: 'column',
      marginLeft: 20,
      name: {
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: -0.165,
      },
      equipment: {
        color: '#D9D9D9',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: -0.165,
      }
    }
  }
})

export default observer(WorkoutGroupScreen)
