import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthService from '../services/api';
import { UseDispatch, useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/action';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    console.log("these are the email and password ",email,password)
    try {
      const response = await AuthService.login(email, password);
      console.log('Login successful:', response.data);
      const token = response.data.token
      dispatch(loginSuccess(token));
      navigation.navigate('tabNavigation', {screen: 'Home'})
    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  };

  const handleForgotPassword =  () => {
   
      navigation.navigate('ForgotPassword')
    
  };

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:"black"
  },
  textColor:{
    color:'black'
  }
});

export default LoginScreen;
