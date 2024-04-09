import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react'

import { useStores } from '../../store/useStores'
import { appThemeColors } from '../../utils/theme'
import GradientButton from '../../utils/GradientButton';
import CustomButton from '../../utils/CustomButton';
import UnderlineButton from '../../utils/UnderlineButton'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const { userStore } = useStores()
  const screenWidth = Dimensions.get('window').width;

  const handleLogin = async () => {
    console.log('these are the email and password ', email, password)
    // try {
    //   const response = await userStore.login(email, password)
    //   // const token = response.data.token
    //   // dispatch(storeToken(token))
    //   navigation.navigate('Home')
    // } catch (error) {
    //   console.error('Login error:', error)
    // }
  }

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>Prana</Text>

      <Text style={styles.textColor}>Login</Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor={'grey'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={'grey'}
      />
      <GradientButton style={[styles.button, { width: screenWidth - 40 }]} onPress={handleLogin} colors={['#012D61', '#0158BF']} title="Login" />
      <CustomButton style={[styles.button, { width: screenWidth - 40 }]} onPress={handleLogin} title="Create Account" />
      <View style={{ marginVertical: 10 }}>
        <UnderlineButton
         title="Forgot Password?"
         onPress={handleForgotPassword}
        />
      </View>

      <View style={styles.columnContainer}>
          <View style={styles.line}></View>
          <Text >OR</Text>
          <View style={styles.line}></View>
      </View>

  </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: appThemeColors.backgroundBlack
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black'
  },
  textColor: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 28, 
    padding: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginBottom:20
  },
  
  columnContainer: {
    flexDirection: 'column',
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: 'white',
  },
})

export default observer(LoginScreen);