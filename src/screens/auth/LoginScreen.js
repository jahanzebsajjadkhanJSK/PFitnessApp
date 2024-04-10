import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react'

import { useStores } from '../../store/useStores'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const { userStore , nutritionStore } = useStores()
  const token = userStore.token

  const handleLogin = async () => {
    console.log('these are the email and password ', email, password)
    try {
      const response = await userStore.login(email, password)
      const allfood = await nutritionStore.getAllFoods(response.data.token)
      console.log('3232',allfood)
      // const token = response.data.token
      // dispatch(storeToken(token))
      navigation.navigate('Home')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        placeholderTextColor={'grey'}
      />
      <Text style={styles.textColor}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
        placeholderTextColor={'grey'}

      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Forgot Password" onPress={handleForgotPassword} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black'
  },
  textColor: {
    color: 'black'
  }
})

export default observer(LoginScreen)
