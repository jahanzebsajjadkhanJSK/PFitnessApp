import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import { typography, margin, padding } from '../styles'
import GradientButton from '../../../components/GradientButton'
import { CategoryToMetricMap } from './utils'
import { SetBuilder } from './setBuilder'
import { getCurrentoDateInISO } from '../../../utils'
import { useStores } from '../../../store/useStores'

export default observer(({ navigation }) => {
  const route = useRoute()
  const { activeGroup } = route.params
  const { exerciseStore } = useStores()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [sets, setSets] = useState([])
  const [currentMetrics, setCurrentMetrics] = useState(CategoryToMetricMap[activeGroup.exerciseList[currentIndex].category])
  const [draftLog, setDraftLog] = useState({})

  useEffect(() => {
    setCurrentMetrics(CategoryToMetricMap[activeGroup.exerciseList[currentIndex].category])
  }, [currentIndex])

  const startTimestamp = getCurrentoDateInISO()
  const currentExercise = activeGroup.exerciseList[currentIndex]
  const nextExercise = activeGroup.exerciseList[currentIndex + 1]

  const handleSetsChange = (newSets) => {
    setSets(newSets)
  }

  const handleBack = () => {
    const previousIndex = currentIndex - 1
    setCurrentIndex(previousIndex)
    if (previousIndex >= 0) {
      const currentExercise = activeGroup.exerciseList[previousIndex]
      Object.keys(draftLog).find((x) => x === currentExercise.id) && setSets(draftLog[currentExercise.id])
    } else {
      navigation.goBack()
    }
  }

  const handleNext = () => {
    const currentIndex = activeGroup.exerciseList.findIndex((exercise) => exercise.id === currentExercise.id)
    const isLastIndex = activeGroup.exerciseList.length - 1 === currentIndex

    if (!isLastIndex) {
      setDraftLog(prevUserInfo => ({
        ...prevUserInfo,
        [currentExercise.id]: sets
      }))
      setSets([])
      setCurrentIndex(currentIndex + 1)
    } else {
      const logs = Object.keys(draftLog).map((key) => {
        const exercise = activeGroup.exerciseList.find((exercise) => exercise.id === key)
        const metricType = CategoryToMetricMap[exercise.category].metricEnum
        const exerciseType = 'exerciseList'
        const log = draftLog[key].map((set) => ({
          metricType,
          type: exerciseType,
          exerciseId: key,
          dateTimestamp: getCurrentoDateInISO(),
          ...set
        }))

        return log
      })

      const flatLogs = logs.flat()
      const endTimestamp = getCurrentoDateInISO()

      exerciseStore.addExerciseLog('', startTimestamp, endTimestamp, flatLogs)
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
          <SetBuilder
            categoryDef={currentMetrics}
            sets={sets}
            onSetsChange={handleSetsChange}
          />

        </View>
        <GradientButton
          title={isLastExercise ? 'End Workout' : 'Next Exercise'}
          colors={isLastExercise ? ['#990404', '#FF1607'] : ['#044999', '#0779FF']}
          style={styles.saveBtn}
          onPress={handleNext}
        />
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
    marginRight: 12
  },
  headerExerciseColumn: {
    flexDirection: 'column',
    alignItems: 'start',
    maxWidth: '60%',
    justifyContent: 'center'
  },
  headerExerciseColumnRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: '40%',
    justifyContent: 'center'
  },
  nextTouchable: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  content: {
    margin: 16,
    height: '68%'
  },
  logHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    height: '8%'
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
    marginBottom: 16,
    height: '78%'
  },
  saveBtn: {
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    marginTop: 10,
    position: 'absolute',
    bottom: 0
  }
})
