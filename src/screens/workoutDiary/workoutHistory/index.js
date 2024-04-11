import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'

const mockWorkoutData = {
  '2024-03-07': {
    workouts: [
      { title: 'Chest, Triceps, Shoulders', exercisesCount: 5 },
      { title: 'Back, Biceps', exercisesCount: 4 }
    ]
  }
  // ...other dates
}

const WorkoutHistoryScreen = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [workoutsForDay, setWorkoutsForDay] = useState([])

  const onDaySelect = (day) => {
    setSelectedDate(day.dateString)
    const workoutDataForDay = mockWorkoutData[day.dateString]
    if (workoutDataForDay) {
      setWorkoutsForDay(workoutDataForDay.workouts)
    } else {
      setWorkoutsForDay([])
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
      <Calendar
        onDayPress={onDaySelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' }
        }}
        theme = {{
          calendarBackground: 'rgba(217, 217, 217, 0.05)'
        }}
      />
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
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  calendarContainer: {
    backgroundColor: 'rgba(217, 217, 217, 0.05)',
    borderRadius: 10
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
  // ...other styles
})

export default WorkoutHistoryScreen
