import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import { typography, margin, padding } from '../styles'
import GradientButton from '../../../components/GradientButton'
import { CategoryToMetric } from './utils'
import { SetBuilder } from './setBuilder'

export default observer(({ navigation }) => {
  const route = useRoute()
  const { activeGroup } = route.params

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleBack = () => {
    navigation.goBack()
  }

  const currentExercise = activeGroup.exerciseList[currentIndex]
  const currentMetrics = CategoryToMetric[currentExercise.category]
  const nextExercise = activeGroup.exerciseList[currentIndex + 1]

  const handleNext = () => {
    const currentIndex = activeGroup.exerciseList.findIndex((exercise) => exercise.id === currentExercise.id)
    const nextIndex = currentIndex + 1

    if (nextIndex < activeGroup.exerciseList.length) {
      setCurrentIndex(nextIndex)
    } else {
      // Last exercise reached, handle end workout logic
      // For now, just go back
      navigation.goBack()
    }
  }

  const isLastExercise = activeGroup.exerciseList.length - 1 === currentIndex

  return (
    <View style={{ height: '100%', backgroundColor: '#010A18' }}>

      <View style={styles.headerNav}>
        <TouchableOpacity onPress={handleBack} style={styles.backTouchable}>
          <Icon name="left" size={20} color="#fff" />
          <Text style={[styles.headerNavText, typography.normal(16, 500)]}>Back</Text>
        </TouchableOpacity>
        <View style={styles.headerExerciseRow}>
          <View style={styles.headerExerciseColumn}>
            <Text style={[margin.bottom(10), typography.normal(20, 500, '#fff', 'wrap')]}>{currentExercise.name}</Text>
            <Text style={[margin.bottom(10), typography.normal(16, 500)]}>{currentExercise.equipment}</Text>
          </View>

          {!isLastExercise && (
            <View style={styles.headerExerciseColumnRight}>
              <TouchableOpacity onPress={handleNext} style={styles.nextTouchable}>
                <Text style={[margin.bottom(10), margin.right(7), typography.normal(16, 500)]}>Next</Text>
                <Icon name="right" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={[margin.bottom(10), typography.normal(16, 500)]}>{nextExercise.name}</Text>
            </View>
          )}

        </View>
      </View>

      <View style={styles.content}>

        <View style={styles.logHeaderRow}>
          <View style={styles.logHeading}>
            <Text style={[typography.normal(14, 600, '#B0B0B0'), padding.vertical(7), padding.horizontal(14)]}> Working Sets</Text>
          </View>
          <View style={styles.headerIcon}>
            <EntypoIcon name="dots-three-horizontal" size={24} color="#AEAFB0" />
          </View>
        </View>

        <View style={styles.setHeaders}>
            {/* {currentMetrics.map((metric, index) => (
              <Text key={index} style={[typography.normal(18, 500, '#B0B0B0'), padding.horizontal(10)]}>{metric}</Text>
            ))} */}
        <SetBuilder metrics={currentMetrics} />
        </View>
        <View style={styles.nextButton}>
          <GradientButton
            title={isLastExercise ? 'End Workout' : 'Next Exercise'}
            colors={isLastExercise ? ['#FF1607', '#990404'] : ['#0779FF', '#044999']}
            style={styles.saveBtn}
            onPress={handleNext}
          />
        </View>
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
    height: '32%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  backTouchable: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerNavText: {
    marginLeft: 10
  },
  headerExerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'purple',
    marginRight: 12
  },
  headerExerciseColumn: {
    flexDirection: 'column',
    alignItems: 'start',
    // backgroundColor: 'red',
    maxWidth: '60%',
    justifyContent: 'center'
  },
  headerExerciseColumnRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: '40%',
    // backgroundColor: 'green',
    justifyContent: 'center'
  },
  nextTouchable: {
    flexDirection: 'row',
    alignItems: 'baseline'
    // backgroundColor: 'pink'
  },
  content: {
    margin: 16
  },
  logHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  logHeading: {
    backgroundColor: '#333',
    borderRadius: 8
  },
  headerIcon: {
    backgroundColor: '#222222',
    width: 46,
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  setHeaders: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between'
  },
  saveBtn: {
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36
  }
})
