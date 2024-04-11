import { View, Text, StyleSheet, TextInput } from 'react-native'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { useStores } from '../../../store/useStores'
import EditWorkScreen from '../../workoutDiary/editWorkout'

export default observer(({ handlePrevious, group }) => {
  return (
    <View>
      <EditWorkScreen
        navigation={{
          goBack: () => handlePrevious()
        }}
        hideSubmitButton
        draftGroup={group}
      />
    </View>
  )
})
