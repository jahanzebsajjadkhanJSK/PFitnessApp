import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ImageCycler from '../components/imageCycler'
import { typography } from '../styles'
import { AddExercise } from './addExercise'
import GradientButton from '../../../components/GradientButton'

const windowWidth = Dimensions.get('window').width

const EditWorkoutScreen = ({ navigation, hideSubmitButton = false, draftGroup = {} }) => {
  const route = useRoute()
  const [activeGroup, setActiveGroup] = useState(Object.keys(draftGroup) > 0 ? draftGroup : route.params?.activeGroup)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (Object.keys(draftGroup).length > 0) {
      setActiveGroup(draftGroup)
    }
  }, [Object.keys(draftGroup).length])

  if (!activeGroup) {
    return (
      <SafeAreaView style={{ height: '100%', backgroundColor: '#010A18', paddingHorizontal: 15 }}>
        <Text>No exercises selected</Text>
      </SafeAreaView>
    )
  }

  const handleClose = () => {
    navigation.goBack()
  }

  const handleRemoveExercise = (exercise) => {
    // Remove exercise from activeGroup.exerciseList
  }

  const handleAddExercises = () => {
    setIsModalVisible(true)
  }

  return (
    <SafeAreaView style={{  backgroundColor: '#010A18', paddingHorizontal: 15 }}>
      {!hideSubmitButton && (
        <View style={styles.navRow}>
          <Text style={typography.mainNavButtonText} onPress={handleClose}>Back</Text>
        </View>
      )}

      <View style={styles.headingContainer}>
        <Text style={typography.normal(24, 500)}>Edit Split</Text>
      </View>
      <View style={styles.exerciseContainer}>
        {activeGroup.exerciseList.length > 0 && activeGroup.exerciseList.map((exercise, index) => {
          const parsed = JSON.parse(exercise.images)
          const cardTop = index * 80
          { index === 0 && (<View style={{ height: 30 }}>
            <Text style={typography.normal(16, 500, '#D9D9D9')}>{activeGroup.name}</Text>
          </View>) }
          return (
            // <View key={exercise.id} style={[styles.card, { top: cardTop + 30 }]}>
            <View key={exercise.id} style={[styles.card]}>
              <View style={styles.cardContent}>
                <ImageCycler
                  firstImageUrl={parsed[0]}
                  secondImageUrl={parsed[1]}
                  style={styles.cardImage}
                />
                <View style={styles.cardColumn}>
                  <Text numberOfLines={2} ellipsizeMode='tail' style={[typography.normal(16, 500, '#FFF', 'wrap')]}>{exercise.name}</Text>
                  <Text style={typography.normal(16, 400, '#D9D9D9')}>{exercise.equipment}</Text>
                </View>
              </View>
              {!hideSubmitButton && (

                <TouchableOpacity style={styles.cardRemove} onPress={() => handleRemoveExercise(exercise)}>
                  <Icon name="remove-circle-outline" size={18} color="#EA4335" />
                </TouchableOpacity>
              )}
            </View>
          )
        })}

        {!hideSubmitButton && (
          <GradientButton
            title="Add Exercises"
            colors={['#0779FF', '#044999']}
            style={styles.gradientBtn}
            onPress={handleAddExercises}
          />
        )}
      </View>
      <AddExercise visible={isModalVisible} onClose={setIsModalVisible} activeGroup={activeGroup} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  navRow: {
    marginTop: 33
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  exerciseContainer: {
    // position: 'relative',
    alignItems: 'center'
    // backgroundColor: 'yellow'
  },
  card: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 13,
    paddingRight: 16,
    width: windowWidth - 30,
    borderRadius: 16,
    backgroundColor: '#121A24',
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 14
  },
  cardContent: {
    flexDirection: 'row'
  },
  cardImage: {
    backgroundColor: '#656565',
    width: 41,
    height: 40,
    borderRadius: 8,
    marginLeft: 16
  },
  cardColumn: {
    flexDirection: 'column',
    marginLeft: 20,
    flex: 0.9
  },
  gradientBtn: {
    width: '100%',
    padding: 9,
    borderRadius: 8
  }
})

export default observer(EditWorkoutScreen)
