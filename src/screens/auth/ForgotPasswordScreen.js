import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import AuthService from '../../services/api'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const navigation = useNavigation()

  const handleForgotPassword = async () => {
    try {
      const response = await AuthService.forgotPassword(email)
      console.log('forgotPassword:', response.data)
      navigation.navigate('ConfirmForgotPassword', { email })
    } catch (error) {
      console.error('forgotPassword error:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.TextColor}>Enter your email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        placeholderTextColor="grey"
      />
      <Button title="Send Code" onPress={handleForgotPassword} />
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
  TextColor: {
    color: 'black'
  }
})

export default ForgotPasswordScreen
