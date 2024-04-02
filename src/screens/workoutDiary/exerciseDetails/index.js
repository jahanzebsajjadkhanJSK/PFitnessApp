import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import InfoScreen from './info'
import InstructionsScreen from './instructions'
import HistoryScreen from './history'

const windowHeight = Dimensions.get('window').height

const ExerciseDetailsScreen = ({ visible, onClose }) => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'info', title: 'Info' },
    { key: 'instructions', title: 'Instructions' },
    { key: 'history', title: 'History' }
  ])

  const renderScene = SceneMap({
    info: InfoScreen,
    instructions: InstructionsScreen,
    history: HistoryScreen
  })

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'blue' }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: 'black' }}
    />
  )

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Exercise Details</Text>
            <TouchableOpacity onPress={() => onClose(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: '100%' }}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent background
  },
  modalContent: {
    height: windowHeight * 0.8, // 80% of screen height
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeButton: {
    fontSize: 16,
    color: 'blue'
  }
})

export default ExerciseDetailsScreen
