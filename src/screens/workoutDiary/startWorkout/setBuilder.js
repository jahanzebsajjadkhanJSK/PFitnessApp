import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

import { typography } from '../styles'

const MetricRow = ({ metricValues, set, onSetChange }) => {
  return (
    <View style={styles.row}>
      {metricValues.map((metric) => (
        <TextInput
          key={metric}
          value={set[metric]}
          onChangeText={(newValue) => onSetChange(metric, newValue)}
          style={[styles.input, typography.normal(18, 400)]}
        />
      ))}
    </View>
  )
}

export const SetBuilder = ({ categoryDef, sets, onSetsChange }) => {
  const values = categoryDef.keys.map((x) => x.key)
  const headers = categoryDef.keys.map((x) => x.header)
  const [metricValues, setMetricValues] = useState(values)
  const [metricHeaders, setMetricHeaders] = useState(headers)

  useEffect(() => {
    const values = categoryDef.keys.map((x) => x.key)
    const headers = categoryDef.keys.map((x) => x.header)
    setMetricValues(values)
    setMetricHeaders(headers)
  }, [categoryDef])

  const handleSetChange = (setIndex, metric, newValue) => {
    const updatedSets = sets.map((set, index) => {
      if (index === setIndex) {
        return { ...set, [metric]: newValue }
      }
      return set
    })
    onSetsChange(updatedSets)
  }

  const addSet = () => {
    const newSet = metricValues.reduce((acc, metric) => ({ ...acc, [metric]: '' }), {})
    const newSets = [...sets, newSet]
    onSetsChange(newSets)
  }

  const renderListItem = ({ item, index }) => {
    return (

      <MetricRow
        key={`set-${index}`}
        metricValues={metricValues}
        set={item}
        onSetChange={(metric, newValue) => handleSetChange(index, metric, newValue)}
      />
    )
  }

  const renderFooter = () => {
    return (
      <TouchableOpacity onPress={addSet} style={styles.addButton}>
        <Text style={typography.normal(18, 500)}>Add Set</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {metricHeaders.map((header) => (
          <Text key={header} style={[styles.headerText, typography.normal(18, 500, '#B0B0B0')]}>
            {header}
          </Text>
        ))}
      </View>
      <FlatList
        data={sets}
        renderItem={renderListItem}
        keyExtractor={(item, index) => String(index)}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 3,
    marginBottom: 20
  },
  headerText: {
    flex: 1,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#121A24'
  },
  addButton: {
    width: '100%',
    backgroundColor: '#121A24',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  }
})
