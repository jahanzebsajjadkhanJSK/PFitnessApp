import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'

import { useStores } from '../../store/useStores'


const ConfirmForgotPasswordScreen = () => {
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const navigation = useNavigation()
  const { userStore } = useStores()

  const handleConfirmForgotPassword = async () => {
    try {
      const resp = await userStore.confirmForgotPassword(code, newPassword)
      navigation.navigate('Login')
    } catch (error) {
      console.error('signup error:', error.response.data)
    }
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>Enter the code received on email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="Enter code"
        keyboardType="numeric"
        placeholderTextColor="grey"
      />
      <Text style={styles.textColor}>Enter your new password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="Enter new password"
        secureTextEntry
        placeholderTextColor="grey"
      />
      <Button title="Confirm New Password" onPress={handleConfirmForgotPassword} />
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

export default ConfirmForgotPasswordScreen
