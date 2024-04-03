import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ProgressRing from './ProgressRings'

const ProgressRingLayout = () => {
  const consumedCalories = 150 // Example value, replace with your actual data

  return (
      <View style={styles.itemContainer}>
        <ProgressRing amountOfCalories={consumedCalories} circleType={'consumed'} />
        <ProgressRing amountOfCalories={consumedCalories} circleType={'burned'} />
        <ProgressRing amountOfCalories={consumedCalories} circleType={'remaining'} />

        {/* Add other components or text to display additional information */}
      </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#272a3b',
    borderRadius: 5,
    height: 250,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  }
})

export default ProgressRingLayout
