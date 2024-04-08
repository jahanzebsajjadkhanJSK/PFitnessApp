import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import Header from './header'

export const Container = ({
  heading = '',
  showOnlyBackButton = false,
  goBack,
  children
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#010A18', padding: 10  }}>
      <Header goBack={goBack} heading={heading} showOnlyBackButton />
      {children}
    </SafeAreaView>
  )
}