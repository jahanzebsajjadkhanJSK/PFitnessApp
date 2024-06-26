import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import Header from './header'
import DumbleBlueIcon from '../../../assets/dumble_blue.png'
import RightArrowIcon from '../../../assets/right_arrow.png'
import CalendarIcon from '../../../assets/calendar.png'
import GradientButton from '../../../components/GradientButton'

export const GroupTemplate = observer(({
  heading,
  actionCardsTitle = '',
  actionCards = {
    card1: {
      icon: '',
      title: '',
      action: () => { }
    }
  },
  exerciseGroups = []
}) => {
  const navigation = useNavigation()

  const handleNavigateWorkoutGroup = (activeGroup) => {
    navigation.navigate('WorkoutGroupScreen', { activeGroup })
  }

  const handleNavigateEdit = (activeGroup) => {
    navigation.navigate('EditWorkoutScreen', { activeGroup })
  }

  const startWorkout = () => {
    console.log('start workout')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#010A18' }}>
      <Header heading={heading} />
      <Text style={styles.startWorkout}>{actionCardsTitle}</Text>
      <View style={{ flexDirection: 'column' }}>
        {Object.keys(actionCards).map((key) => {
          return (
            <TouchableOpacity onPress={actionCards[key].action} style={styles.workoutActions}>
              <View style={styles.workoutActionsTextGroup}>
                <Image source={actionCards[key].icon} />
                <Text style={styles.workoutActionsText}>{actionCards[key].title}</Text>
              </View>
              <Image source={RightArrowIcon} />
            </TouchableOpacity>
          )
        })}

        <View>
          {exerciseGroups.length > 0 && exerciseGroups.map((group) => {
            return (
              <TouchableOpacity key={group.id} onPress={() => handleNavigateWorkoutGroup(group)} style={styles.exerciseGroup}>
                <Text style={styles.exerciseGroupText}>{group.name}</Text>
                <View style={styles.exerciseGroupActionContainer}>
                  <Text style={styles.exerciseGroupActionContainer.text}>{`${group.exerciseList.length} exercises`}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => handleNavigateEdit(group)} style={styles.exerciseGroupActionContainer.editBtn}>
                      <Text style={styles.exerciseGroupActionContainer.editBtn.text}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={startWorkout} style={styles.exerciseGroupActionContainer.startBtn}>
                      <GradientButton
                        colors={['#0779FF', '#044999']}
                        style={styles.exerciseGroupActionContainer.startBtn}
                        title={'Start'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </SafeAreaView>

  )
})

const styles = StyleSheet.create({
  startWorkout: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.165,
    margin: 24
  },
  workoutActions: {
    borderRadius: 16,
    backgroundColor: '#121A24',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    height: 60,
    marginBottom: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 27
  },
  workoutActionsTextGroup: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  workoutActionsText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.165,
    marginLeft: 8
  },
  exerciseGroup: {
    marginTop: 18,
    borderRadius: 16,
    backgroundColor: '#121A24',
    height: 108,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'column',
    paddingLeft: 21,
    paddingRight: 16
  },
  exerciseGroupText: {
    color: '#FFF',
    textAlign: 'left',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.165,
    paddingTop: 15,
    paddingBottom: 9
  },
  exerciseGroupActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    text: {
      color: '#FFF',
      textAlign: 'center',
      fontFamily: 'Poppins',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      letterSpacing: -0.165
    },
    editBtn: {
      width: 87,
      height: 36,
      borderRadius: 8,
      backgroundColor: '#FFF',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
      justifyContent: 'center',
      marginRight: 9,
      text: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: -0.165
      }
    },
    startBtn: {
      width: 87,
      height: 36,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
})
