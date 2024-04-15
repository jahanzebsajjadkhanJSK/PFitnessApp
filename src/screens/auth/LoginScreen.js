import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react'

import { useStores } from '../../store/useStores'
import { appThemeColors } from '../../utils/theme'
import GradientButton from '../../utils/GradientButton';
import CustomButton from '../../utils/CustomButton';
import UnderlineButton from '../../utils/UnderlineButton'
import CustomImageButton from '../../utils/CustomeImageButton'
import googleIcon from '../../assets/googleLogin.png'
import { getTheme } from 'react-native-paper/lib/typescript/core/theming'


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

  const handleGoogleLogin = () => {
    console.log("Google login")
  }

  const handleAppleLogin = () => {
    console.log("Apple login")
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
          <Text style={styles.text} >or</Text>
          <View style={styles.line}></View>
      </View>

      <CustomImageButton 
        onPress={handleGoogleLogin} 
        title="Log in with Google" 
        imageSource={require('../../assets/googleLogin.png')} 
        style={styles.imageButton}
      />
      <CustomImageButton 
        onPress={handleAppleLogin} 
        title="Log in with Apple" 
        imageSource={require('../../assets/appleLogo.png')} 
        style={styles.imageButton} 
      />

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
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: appThemeColors.tfBackground,
  },
  textColor: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 28,
    marginBottom: 36,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36
  },
  line: {
    height: 1,
    width: '15%',
    backgroundColor: 'white',
  },
  imageButton: {
    padding: 20,
    width: "70%",
    height: 40,
    marginBottom: 20
  },
  text: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    marginHorizontal: 20,
  }
})

export default observer(LoginScreen);