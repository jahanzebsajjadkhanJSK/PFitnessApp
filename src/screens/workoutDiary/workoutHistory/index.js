import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Calendar } from 'react-native-calendars'
import Icon from 'react-native-vector-icons/AntDesign'

import { useStores } from '../../../store/useStores'
import { typography, padding, margin } from '../styles'
import { getCurrentoDateInISO, getDateInISO } from '../../../utils'
import { groupByExerciseName } from './utils'

const groupLogs = (logGroup) => {
  console.log('inside logGroup')
  const arr = []
  logGroup.forEach((x) => {
    const res = groupByExerciseName(x.exerciseLogs)
    const newLogGroup = {
      id: x.id,
      logsByExercise: res
    }
    arr.push(newLogGroup)
  })
}

const WorkoutHistoryScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [workoutsForDay, setWorkoutsForDay] = useState([])
  const [activeMarkedDates, setActiveMarkedDates] = useState([])

  const { exerciseStore } = useStores()

  const getLogs = async (date) => {
    const resp = await exerciseStore.getExerciseLogsByDay(date)
    return resp
  }

  // const getMonthLogs = async (date) => {
  //   const resp = await exerciseStore.getExerciseLogsByMonth(date)
  //   const dates = resp.map((exerciseGroup) => exerciseGroup.startTimestamp)
  //   const newMarkedDates = dates.map((date) => {
  //     const formattedDate = getDateInISO(date, 'yyyy-MM-dd')
  //     return {
  //       [formattedDate]: { marked: true }
  //     }
  //   })
  //   setActiveMarkedDates(newMarkedDates)
  //   return resp
  // }

  useEffect(async () => {
    const date = getCurrentoDateInISO()
    setSelectedDate(date)
    await getLogs()
  }, [])

  const onDaySelect = async (day) => {
    setSelectedDate(day.dateString)
    // const isoDate = getDateInISO(day.dateString, 'yyyy-MM-dd')
    // const resp = await getLogs(day.dateString)
    // groupLogs(resp)
    // console.log(JSON.stringify(resp))

    // const workoutDataForDay = mockWorkoutData[day.dateString]
    // if (workoutDataForDay) {
    //   setWorkoutsForDay(workoutDataForDay.workouts)
    // } else {
    //   setWorkoutsForDay([])
    // }
  }

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const CustomDay = ({ date, state, marking, onDayPress }) => {
    const isSelected = marking?.selected
    const backgroundColor = isSelected ? 'white' : '#121A24'
    const dotColor = isSelected && marking.marked ? '#333' : marking.marked ? '#D9D9D9' : 'transparent'

    return (
      <TouchableOpacity onPress={() => onDayPress(date)} style={[styles.container, { backgroundColor, height: 45 }]}>
        <Text style={[typography.normal(20, 400, '#B3B3B3'), state === 'disabled' ? styles.textDisabled : null]}>
          {date.day}
        </Text>
        {marking?.marked && <View style={[styles.dot, { backgroundColor: dotColor }]} />}
      </TouchableOpacity>
    )
  }

  const getMarkedDates = () => {
    const baseMarkedDates = {
      '2024-04-02': {
        marked: true
      },
      '2024-04-05': {
        marked: true
      }
    }

    const selectedMarkings = selectedDate && baseMarkedDates[selectedDate]
      ? {
          ...baseMarkedDates[selectedDate],
          selected: true,
          selectedColor: 'lightblue'
        }
      : {
          selected: true,
          selectedColor: 'lightblue'
        }

    return {
      ...baseMarkedDates,
      [selectedDate]: selectedMarkings
    }
  }

  const markedDates = useMemo(getMarkedDates, [selectedDate])

  return (
    <View style={{ height: '100%', backgroundColor: '#010A18' }}>
      <TouchableOpacity onPress={handleNavigateBack} style={styles.backTouchable}>
        <Icon name="left" size={16} color="#fff" style={padding.all(8)} />
        <Text style={[styles.headerNavText, typography.normal(12, 400)]}>Workout Log</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollViewStyle}>

      <View style={styles.header}>
        <Text style={[styles.headerText, typography.normal(30, 600)]}>Workout Diary</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={onDaySelect}
          dayComponent={({ date, state }) => (
            <CustomDay
              date={date}
              state={state}
              marking={markedDates[date.dateString] || {}}
              onDayPress={onDaySelect}
            />
          )}
          theme={{
            calendarBackground: '#121A24',
            'stylesheet.calendar.header': {
              week: {
                marginTop: 2,
                marginBottom: 2,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            },
            'stylesheet.day.basic': {
              base: {
                height: 25
              }
            }
          }}
          style={{ height: '90%', margin: 6, borderRadius: 15 }}
        />
        </View>
        <View style={styles.workoutsContainer}>
          {workoutsForDay.length > 0
            ? (
                workoutsForDay.map((workout, index) => (
                <View key={index} style={styles.workoutCard}>
                  <Text style={styles.workoutText}>{workout.title}</Text>
                  <Text style={styles.workoutSubtext}>
                    {workout.exercisesCount} Exercises
                  </Text>
                </View>
                ))
              )
            : (
              <Text style={styles.noWorkoutText}>No workouts for this day.</Text>
              )}
      </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  backTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#010A18',
    marginTop: 20
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  scrollViewStyle: {
    // flex: 1,
  },

  calendarContainer: {

  },
  container: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B3B3B3'
  },
  text: {
    fontSize: 16
  },
  textDisabled: {
    color: 'grey'
  },
  dot: {
    bottom: 0,
    width: 6,
    height: 6,
    borderRadius: 2
  },

  workoutsContainer: {
    padding: 10
  },
  workoutCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10
  },
  workoutText: {
    color: '#fff',
    fontSize: 16
  },
  workoutSubtext: {
    color: '#aaa',
    fontSize: 14
  },
  noWorkoutText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 20
  }
})

export default WorkoutHistoryScreen
