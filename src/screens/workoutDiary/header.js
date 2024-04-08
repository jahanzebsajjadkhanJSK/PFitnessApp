import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { typography } from './styles'

const Header = ({
  heading = '',
  showOnlyBackButton = false,
  goBack
}) => {
  const navigation = useNavigation()

  const handleChatClick = () => {
    navigation.navigate('More')
  }

  const handleHamburgerClick = () => {
    if (goBack) {
      goBack()
      return
    }
    navigation.toggleDrawer()
  }

  return (
    <View style={styles.header}>
      {showOnlyBackButton && (
        <TouchableOpacity onPress={handleHamburgerClick} style={styles.hamburgerIcon}>
          <Text style={typography.normal(16, 500, '#0779FF')} >Back</Text>
        </TouchableOpacity>
      )}

      {!showOnlyBackButton && (
        <>
          <TouchableOpacity onPress={handleHamburgerClick} style={styles.hamburgerIcon}>
            <Text style={styles.iconText}>☰</Text>
          </TouchableOpacity>
          {heading.length > 0 && (
            <Text style={styles.text}>{heading}</Text>
          )}
          <TouchableOpacity onPress={handleChatClick} style={styles.chatIcon}>
            <Text style={styles.iconText}>💬</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // margin: 10,
    backgroundColor: '#010A18'
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.165
  },
  hamburgerIcon: {
    // marginLeft: 10
  },
  chatIcon: {
    // marginRight: 10
  },
  iconText: {
    fontSize: 24,
    color: '#FFF'
  }
})

export default Header
