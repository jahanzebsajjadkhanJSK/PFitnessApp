import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { useStores } from '../../../store/useStores'
import { getDateObject, getFormattedDateFromISO } from '../../../utils'
import { typography } from '../styles'

const groupLogsByDate = (exercise, exerciseLogs) => {
  const logsByDate = exerciseLogs.reduce((acc, log) => {
    const date = getFormattedDateFromISO(log.dateTimestamp)
    acc[date] = acc[date] || []
    acc[date].push(log)
    return acc
  }, {})

  const result = Object.entries(logsByDate).map(([date, logs]) => {
    const totalSets = logs.length
    let totalVolume = 0
    if (logs.weight !== undefined) {
      totalVolume = logs.reduce((acc, log) => acc + log.weight, 0)
      totalVolume = `${totalVolume} kgs Total Volume`
    }
    if (logs.duration !== undefined) {
      totalVolume = logs.reduce((acc, log) => acc + log.duration, 0)
      totalVolume = `${totalVolume} seconds Total Volume`
    }

    if (logs.distance !== undefined) {
      totalVolume = logs.reduce((acc, log) => acc + log.distance, 0)
      totalVolume = `${totalVolume} meters Total Volume`
    }

    return {
      date,
      stats: { totalSets, totalVolume },
      logs
    }
  })

  return result
}

const HistoryScreen = ({ navigation, activeExercise }) => {
  const { exerciseStore } = useStores()
  const [groupedData, setGroupedData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('activeExercise', activeExercise.id)
    if (!activeExercise) return

    const getLogs = async () => {
      const resp = await exerciseStore.getExerciseLogsByExerciseId(activeExercise.id)
      const data = groupLogsByDate(resp.exercise, resp.exerciseLogs)
      setGroupedData(data)
    }

    getLogs()
  }, [])

  const renderItem = ({ item }) => {
    const workoutDate = getFormattedDateFromISO(item.date)
    const totalSets = item.stats.totalSets
    const totalVolume = item.stats.totalVolume
    const dateObject = getDateObject(item.date)
    return (
      <View style={styles.listItem}>
        <View style={styles.date}>
          <Text style={[typography.normal(25, 500)]}>{dateObject?.day}</Text>
          <Text style={[typography.normal(18, 500)]}>{dateObject?.monthName.substring(0, 3)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.sets}>{totalSets} Working Sets</Text>
          <Text style={styles.volume}>{totalVolume} kgs Total Volume</Text>
        </View>
      </View>
    )
  }

  return (
      <FlatList
        data={groupedData}
        renderItem={renderItem}
        keyExtractor={item => item.date}
        style={styles.container}
      />
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
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    paddingVertical: 9,
    paddingHorizontal: 16
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  date: {
    alignItems: 'center',
    backgroundColor: '#313131',
    padding: 8,
    borderRadius: 8
  },
  infoContainer: {
    marginLeft: 26,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  sets: {
    color: '#fff',
    marginBottom: 4
  },
  volume: {
    color: '#fff'
  }
})

export default HistoryScreen
