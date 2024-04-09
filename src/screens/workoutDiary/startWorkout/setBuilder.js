import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

const MetricRow = ({ metrics }) => {
  return (
    <View style={styles.row}>
      {metrics.map((metric, index) => (
        <View key={index} style={styles.cell}>
          <Text>{metric}</Text>
        </View>
      ))}
    </View>
  )
}

const AddSetButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>Add Set</Text>
  </TouchableOpacity>
)

export const SetBuilder = ({ metrics }) => {
  const [sets, setSets] = useState([])

  const addSet = () => {
    setSets((prevSets) => [
      ...prevSets,
      metrics.map(() => '')
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <MetricRow metrics={metrics} />
        <FlatList
          data={sets}
          renderItem={({ item }) => <MetricRow metrics={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <AddSetButton onPress={addSet} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16
  },
  tableContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  cell: {
    flex: 1,
    padding: 10,
    borderRightColor: 'black',
    borderRightWidth: 1,
    alignItems: 'center'
  },
  button: {
    marginTop: 10,
    backgroundColor: '#000',
    padding: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
})