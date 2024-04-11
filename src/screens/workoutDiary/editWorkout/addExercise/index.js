import { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, StyleSheet, Modal, Dimensions } from 'react-native'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/Ionicons'

import { useStores } from '../../../../store/useStores'
import CloseIcon from '../../../../assets/close.png'
import { typography } from '../../styles'
import ImageCycler from '../../components/imageCycler'
import GradientButton from '../../../../components/GradientButton'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export const AddExercise = observer(({ visible, onClose, activeGroup }) => {
  const { exerciseStore, userStore } = useStores()
  const preSelectedExerciseIds = activeGroup.exerciseList.map(x => x.id)

  const filteredExercises = exerciseStore.exerciseList.filter((x) => preSelectedExerciseIds.indexOf(x.id) === -1)

  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState(filteredExercises)
  const [newSelectedExercises, setNewSelectedExercises] = useState([])

  const handleSearch = (text) => {
    setSearchText(text)
    if (text.toLowerCase().length === 0) {
      setSearchResults(exerciseStore.exerciseList)
      return
    }
    const filteredData = exerciseStore.exerciseList.filter((item) => {
      return (
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        (item.equipment && item.equipment.toLowerCase().includes(text.toLowerCase()))
      )
    })
    setSearchResults(filteredData)
  }

  const handleSelectExercise = (exercise) => {
    if (newSelectedExercises.includes(exercise.id)) {
      setNewSelectedExercises(newSelectedExercises.filter((x) => x !== exercise.id))
      return
    }
    setNewSelectedExercises([...newSelectedExercises, exercise.id])
  }

  const handleCancel = () => {
    setNewSelectedExercises([])
    onClose(false)
  }

  const handleSave = () => {
    const newSelectedExercisesObjs = exerciseStore.exerciseList.filter((x) => newSelectedExercises.includes(x.id))
    const updatedGroup = activeGroup.exerciseList.concat(newSelectedExercisesObjs)
    // TODO: Verify the API
    exerciseStore.updateExerciseGroup(
      userStore.token,
      activeGroup.id,
      updatedGroup
    )
  }

  const renderListItem = ({ item }) => {
    const parsed = JSON.parse(item.images)

    return (
      <TouchableOpacity
        onPress={() => handleSelectExercise(item)}
        style={newSelectedExercises.includes(item.id) ? styles.listItemRowSelected : styles.listItemRow}
      >
        <ImageCycler
          firstImageUrl={parsed[0]}
          secondImageUrl={parsed[1]}
          style={styles.img}
        />
        <View style={styles.listItemColumn}>
          <Text style={typography.normal(14, 500, '#FFF', 'wrap')}>{item.name}</Text>
          <Text style={typography.normal(14, 400, '#D9D9D9')}>{item.equipment}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.headerRow}>
            {/* <TouchableOpacity onPress={onClose}>
              <Image source={CloseIcon} />
            </TouchableOpacity> */}
            <Text style={typography.normal(24, 500)}>Add Exercise</Text>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="search-outline" size={24} color="#9A9A9A" style={styles.searchIcon} />
            <TextInput
              style={typography.normal(12, 400, '#7F7F7F')}
              placeholder="Search..."
              placeholderTextColor="#7F7F7F"
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>

          <View style={styles.statsContainer}>
            <Text style={typography.normal(16, 500, '#D9D9D9')}>{filteredExercises.length} exercises</Text>
          </View>
          <FlatList
            data={searchResults}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id}
            style={styles.listContainer}
            ItemSeparatorComponent={<View style={styles.line}></View>}
          />

          <View style={styles.footer}>
            <GradientButton
              title="Cancel"
              colors={['#656565', '#656565']}
              style={styles.saveBtn}
              onPress={handleCancel}
            />
            <GradientButton
              title="Save"
              colors={newSelectedExercises.length > 0 ? ['#0779FF', '#044999'] : ['#656565', '#656565']}
              style={styles.saveBtn}
              onPress={handleSave}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
})

const modalContentWidth = windowWidth - 30

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    height: windowHeight * 0.9,
    backgroundColor: '#1C242D',
    borderRadius: 20,
    padding: 16,
    width: modalContentWidth
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 16,
    marginBottom: 20,
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 32
  },
  searchIcon: {
    marginRight: 8
  },
  statsContainer: {
    marginBottom: 20
  },
  listContainer: {
    backgroundColor: '#121A24',
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
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  saveBtn: {
    width: (modalContentWidth - 50) / 2,
    padding: 9,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5
  }
})
