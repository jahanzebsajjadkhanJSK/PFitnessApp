import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { observer } from 'mobx-react'

import { typography } from '../../workoutDiary/styles'
import GradientButton from '../../../components/GradientButton'
import { useStores } from '../../../store/useStores'
import ImageCycler from '../../workoutDiary/imageCycler'

const tabs = {
  push: 'Push',
  pull: 'Pull',
  static: 'Static'
}

export default observer(({
  navigation, name, setEnableNextButton, setHideTemplate,
  selectedExercises,
  setSelectedExercises,
  handleNext,
  hideTemplate = false
}) => {
  const { exerciseStore } = useStores()
  const [activeTab, setActiveTab] = useState(tabs.push)

  const [activeTabExercises, setActiveTabExercises] = useState(exerciseStore.exerciseList.filter((x) => x.force === activeTab.toLowerCase()))
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState(activeTabExercises)

  useEffect(() => {
    if (selectedExercises.length > 0) {
      setEnableNextButton(true)
      return
    }
    setEnableNextButton(false)
  }, [])

  const handleTabNavigaton = (tab) => {
    setActiveTab(tab)
    setSearchText('')
    const filteredTabResults = exerciseStore.exerciseList.filter((x) => x.force === tab.toLowerCase())
    setActiveTabExercises(filteredTabResults)
    setSearchResults(filteredTabResults)
  }

  const handleSearch = (text) => {
    setSearchText(text)
    if (text.toLowerCase().length === 0) {
      setSearchResults(exerciseStore.exerciseList.filter((x) => x.force === activeTab.toLowerCase()))
      return
    }
    const filteredTabResults = activeTabExercises.filter((item) => {
      return (
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        (item.equipment && item.equipment.toLowerCase().includes(text.toLowerCase()))
      )
    })
    setSearchResults(filteredTabResults)
  }

  const handleSelectExercise = (exercise) => {
    if (selectedExercises.includes(exercise.id)) {
      setSelectedExercises(selectedExercises.filter((x) => x !== exercise.id))
      return
    }
    setSelectedExercises([...selectedExercises, exercise.id])
  }

  const handleBack = () => {
    setSelectedExercises([])
    setHideTemplate(false)
  }

  const handleApply = () => {
    if (selectedExercises.length > 0) {
      setEnableNextButton(true)
      handleNext()
      setHideTemplate(false)
    }
  }

  const renderListItem = ({ item }) => {
    const parsed = JSON.parse(item.images)

    return (
      <TouchableOpacity
        onPress={() => handleSelectExercise(item)}
        style={selectedExercises.includes(item.id) ? exerciseStyles.listItemRowSelected : exerciseStyles.listItemRow}
      >
        <ImageCycler
          firstImageUrl={parsed[0]}
          secondImageUrl={parsed[1]}
          style={exerciseStyles.img}
        />
        <View style={exerciseStyles.listItemColumn}>
          <Text style={typography.normal(14, 500, '#FFF', 'wrap')}>{item.name}</Text>
          <Text style={typography.normal(14, 400, '#D9D9D9')}>{item.equipment}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <React.Fragment>
      {hideTemplate
        ? (
          <View style={{ height: '100%', backgroundColor: '#010A18' }}>
            <View style={exerciseStyles.headerNav}>
              <TouchableOpacity onPress={handleBack}>
                <Text style={[exerciseStyles.headerNavText, typography.normal(16, 500)]}>Back</Text>
              </TouchableOpacity>
              <View style={exerciseStyles.headerTextContainer}>
                <Text style={[typography.normal(30, 500)]}>Exercises</Text>
              </View>
              <View style={exerciseStyles.exerciseTabs}>
                {Object.keys(tabs).map((tab, index) => (
                  <TouchableOpacity
                    key={index}
                    style={tab === activeTab ? exerciseStyles.activeTab : exerciseStyles.nonActiveTab}
                    onPress={() => handleTabNavigaton(tab)}
                  >
                    <Text style={[tab === activeTab ? typography.normal(16, 600) : typography.normal(16, 500, '#B0B0B0')]}>{tabs[tab]}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={exerciseStyles.listContainer}>
              <View style={exerciseStyles.inputContainer}>
                <Ionicon name="search-outline" size={24} color="#9A9A9A" style={exerciseStyles.searchIcon} />
                <TextInput
                  style={typography.normal(12, 400, '#7F7F7F')}
                  placeholder="Search..."
                  placeholderTextColor="#7F7F7F"
                  value={searchText}
                  onChangeText={handleSearch}
                />
              </View>

              <View style={exerciseStyles.statsContainer}>
                <Text style={typography.normal(16, 500, '#D9D9D9')}>{activeTabExercises.length} exercises</Text>
              </View>
              <FlatList
                data={searchResults}
                renderItem={renderListItem}
                keyExtractor={(item) => item.id}
                style={exerciseStyles.flatListContainer}
                ItemSeparatorComponent={<View style={exerciseStyles.line}></View>}
              />
            </View>

            <View style={exerciseStyles.footer}>
              <GradientButton
                title={selectedExercises.length > 0 ? `Apply (${selectedExercises.length})` : 'Apply'}
                colors={selectedExercises.length > 0 ? ['#0779FF', '#044999'] : ['#656565', '#656565']}
                style={exerciseStyles.saveBtn}
                onPress={handleApply}
              />
            </View>
          </View>
          )
        : (
          <View style={styles.columnContainer}>
            <Text style={[typography.normal(24, 500), styles.heading]}>Add Exercises</Text>
            <View style={styles.inputContainer}>
              <Text style={[typography.normal(16, 600), styles.splitTitle]}> {name} </Text>
              <View style={styles.rowContainer}>
                <GradientButton
                  title="Add Exercise"
                  colors={['#0779FF', '#044999']}
                  style={styles.nextBtn}
                  onPress={() => setHideTemplate(true)}
                />
              </View>
            </View>
          </View>
          )}
    </React.Fragment>
  )
})

const exerciseStyles = StyleSheet.create({
  headerNav: {
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
    height: '27%'
  },
  headerNavText: {
    marginTop: 30,
    marginBottom: 16,
    marginLeft: 10
  },
  headerTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  exerciseTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 16,
    padding: 16
  },
  activeTab: {
    backgroundColor: '#4A4A4A',
    borderRadius: 8,
    height: 36,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 13,
    paddingLeft: 13
  },
  nonActiveTab: {
    borderRadius: 8,
    height: 36,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 13,
    paddingLeft: 13
  },
  listContainer: {
    margin: 16
  },
  searchIcon: {
    marginRight: 8
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 12,
    height: 37,
    paddingLeft: 16
  },
  statsContainer: {
    marginVertical: 8
  },
  flatListContainer: {
    backgroundColor: '',
    borderRadius: 16
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  listItemRowSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#262626'
  },
  listItemColumn: {
    flexDirection: 'column',
    marginLeft: 20
  },
  img: {
    backgroundColor: '#656565',
    width: 66,
    height: 43,
    borderRadius: 8,
    marginLeft: 8
  },
  line: {
    height: 1,
    backgroundColor: '#262626'
  },
  footer: {
    backgroundColor: '#141618',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveBtn: {
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44
  }
})

const styles = StyleSheet.create({
  heading: {
    marginTop: 19
  },
  splitTitle: {
    paddingBottom: 19
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 16,
    marginTop: 24,
    borderRadius: 16,
    backgroundColor: '#121A24',
    shadowColor: '#000',
    width: '100%',
    padding: 8,

    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextBtn: {
    width: '100%',
    padding: 13,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44
  }
})
