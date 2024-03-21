import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AuthService from '../services/api';

const ConfirmSignupScreen = () => {
  const [code, setCode] = useState('');
  const navigation =useNavigation()
  const route = useRoute();
  const { email } = route.params;

  const handleConfirmSignup = async () => {
    try {
      const response = await AuthService.confirmsignup(email, code);
      console.log('confirmsignup successful:', response.data);
      navigation.navigate('Login')
      
    } catch (error) {
      console.error('signup error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>Enter the code received on email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="Enter code"
        keyboardType="numeric"
        placeholderTextColor={"black"}
      />
      <Button title="Confirm Signup" onPress={handleConfirmSignup} />
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

export default ConfirmSignupScreen;
