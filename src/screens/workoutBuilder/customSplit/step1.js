import { View, Text, StyleSheet, TextInput } from 'react-native'
import { observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/Octicons'

import { typography } from '../../workoutDiary/styles'

export default observer(({ navigation, name, handleSetName }) => {
  return (
    <View style={styles.columnContainer}>
      <Text style={[typography.normal(24, 500), styles.heading]}>Basics</Text>
      <View style={styles.inputContainer}>
        <Icon name="pencil" size={18} color="#B0B0B0" />
        <TextInput
          style={[typography.normal(14, 700), styles.textStyle]}
          placeholder="Name your split"
          placeholderTextColor="#7F7F7F"
          value={name}
          onChangeText={handleSetName}
        />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  heading: {
    marginTop: 19
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    marginTop: 24,
    borderRadius: 16,
    height: 55,
    backgroundColor: '#121A24',
    shadowColor: '#000',
    width: '100%',

    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4
  },
  textStyle: {
    marginLeft: 16
  }
})
