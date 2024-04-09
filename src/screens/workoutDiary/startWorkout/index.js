import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/AntDesign'

import { typography } from '../styles'

export default observer(({ navigation }) => {
  const route = useRoute()
  const { activeGroup } = route.params

  const [activeExercise, setActiveExercise] = useState(activeGroup.exerciseList[0])

  const handleBack = () => {
    navigation.goBack()
  }

  const handleNext = () => {
    const currentIndex = activeGroup.exerciseList.findIndex((exercise) => exercise.id === activeExercise.id)
    const nextIndex = currentIndex + 1

    if (nextIndex < activeGroup.exerciseList.length) {
      setActiveExercise(activeGroup.exerciseList[nextIndex])
    } else {
      // Last exercise reached, handle end workout logic
      // For now, just go back
      navigation.goBack()
    }
  }

  const isLastExercise = activeGroup.exerciseList.indexOf(activeExercise) === activeGroup.exerciseList.length - 1

  return (
    <View style={{ height: '100%', backgroundColor: '#010A18' }}>

      <View style={styles.headerNav}>
        <TouchableOpacity onPress={handleBack} style={styles.backTouchable}>
          <Icon name="left" size={20} color="#fff" />
          <Text style={[styles.headerNavText, typography.normal(16, 500)]}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.exerciseName, typography.normal(16, 500)]}>{activeExercise.name}</Text>
        <Text style={[styles.exerciseName, typography.normal(16, 500)]}>{activeExercise.equipment}</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.exerciseName, typography.normal(16, 500)]}>{activeExercise.name}</Text>
        {/* Additional exercise details can be added here */}

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={[styles.nextButtonText, typography.normal(16, 500)]}>
            {isLastExercise ? 'End Workout' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
})

const styles = StyleSheet.create({
  headerNav: {
    paddingTop: 39,
    paddingLeft: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: '#1C242D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    height: '27%'
  },
  backTouchable: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerNavText: {
    marginLeft: 10
  }
})
