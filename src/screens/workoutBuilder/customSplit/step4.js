import { View, Text, StyleSheet, TextInput } from 'react-native'

import { typography } from '../../workoutDiary/styles'
import { capitalizeWords } from '../../../utils'

export default ({ navigation, group }) => {
  const exerciseLength = Object.keys(group.exerciseList).length

  const primaryMuscles = group.exerciseList.map((exercise) => {
    return JSON.parse(exercise.primaryMuscles)
  })

  const primaryMusclesString = primaryMuscles.join(', ')

  const secondaryMuscles = group.exerciseList.map((exercise) => {
    return JSON.parse(exercise.secondaryMuscles)
  })

  const secondaryMusclesString = secondaryMuscles.join(', ')
  // TODO:
  // 1. Unique muscles
  // 2. String formatting

  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={typography.normal(24, 500)}>Preview</Text>
      </View>
      <View style={styles.cardContainer}>

        <View style={styles.row}>
          <Text style={[typography.normal(20, 500), styles.commonMargin]}>{group.name}</Text>
          <Text style={[typography.normal(30, 500), styles.commonMargin]}>.</Text>
          <Text style={[typography.normal(16, 400), styles.commonMargin]}>{exerciseLength} Exercises</Text>
        </View>

        {primaryMuscles.length > 0 && (
          <View style={styles.column}>
            <Text style={[typography.normal(16, 400), styles.commonMargin]}>Primary Muscles Worked</Text>
            <Text style={[typography.normal(16, 400, '#8E8E8E', 'wrap'), styles.commonMargin]}>{primaryMusclesString}</Text>
          </View>
        )}

        {secondaryMuscles.length > 0 && (
          <View style={styles.column}>
            <Text style={[typography.normal(16, 400), styles.commonMargin]}>Secondary Muscles Worked</Text>
            <Text style={[typography.normal(16, 400, '#8E8E8E', 'wrap'), styles.commonMargin]}>{secondaryMusclesString}</Text>
          </View>
        )}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column'
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  cardContainer: {
    borderRadius: 16,
    backgroundColor: '#121A24',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'column'
  },
  column: {
    flexDirection: 'column',
    padding: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    padding: 10
  },
  commonMargin: {
    marginRight: 8
  }
})
