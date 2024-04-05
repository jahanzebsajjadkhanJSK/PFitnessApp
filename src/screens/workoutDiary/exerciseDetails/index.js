import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Dimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import Icon from 'react-native-vector-icons/Entypo'

import InfoScreen from './info'
import InstructionsScreen from './instructions'
import HistoryScreen from './history'
import CloseIcon from '../../../assets/close.png'

const windowHeight = Dimensions.get('window').height

const ExerciseDetailsScreen = ({ visible, onClose, activeExercise }) => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'info', title: 'Info' },
    { key: 'instructions', title: 'Instructions' },
    { key: 'history', title: 'History' }
  ])

  const renderScene = SceneMap({
    info: () => <InfoScreen activeExercise={activeExercise} />,
    instructions: () => <InstructionsScreen activeExercise={activeExercise} />,
    history: () => <HistoryScreen activeExercise={activeExercise} />
  })

  const renderTabBar = props => {
    const { navigationState, position } = props;

    return (
      <React.Fragment>
        <View style={styles.tabBar}>
          {navigationState.routes.map((route, i) => {
            const isTabActive = i === index;

            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  styles.tabBarItem,
                  isTabActive && styles.tabBarItemActive,
                ]}
                onPress={() => setIndex(i)}
              >
                <Text style={styles.tabBarItem.text}>
                  {route.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{activeExercise.name}</Text>
          <View style={styles.headerIcon}>
            <Icon name="dots-three-horizontal" size={24} color="#AEAFB0" />
          </View>
        </View>
      </React.Fragment>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.topRow}>
            <TouchableOpacity onPress={onClose}>
              <Image source={CloseIcon} />
            </TouchableOpacity>
          </View>
          <TabView
            style={{ backgroundColor: '#121A24' }}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: '100%', height: '80%' }}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    height: windowHeight * 0.85,
    backgroundColor: '#121A24',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16
  },
  topRow: {
    flexDirection: 'row-reverse',
    width: '100%',
    marginLeft: 16,
    marginBottom: 20
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 19,
    marginBottom: 15
  },
  headerIcon: {
    backgroundColor: '#222222',
    width: 46,
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.165,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C242D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  tabBarItem: {
    width: 100,
    text: {
      color: '#FFF',
      textAlign: 'center',
      fontFamily: 'Poppins',
      fontSize: 15,
      fontStyle: 'normal',
      fontWeight: '400',
      letterSpacing: -0.165,
    }
  },
  tabBarItemActive: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#777',
    height: 34,
  }
})

export default ExerciseDetailsScreen
