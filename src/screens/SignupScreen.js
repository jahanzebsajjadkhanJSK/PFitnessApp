import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet ,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthService from '../services/api';
// import Config from 'react-native-config';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  // console.log(Config.TARGET)

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please try again.');
      return;
    }
    console.log("these are the email and password ",email,password)
    try {
      const response = await AuthService.signup(email, password);
      console.log('signup successful:', response.data);
      navigation.navigate("ConfirmSignup",{ email })
    } catch (error) {
      console.error('signup error:', error);
    }
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
        placeholderTextColor="grey"
      />
      <Text style={styles.textColor}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
        placeholderTextColor="grey"
      />
      <Text style={styles.textColor}>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm your password"
        secureTextEntry
        placeholderTextColor="grey"
      />
      <Button title="Signup" onPress={handleSignup} />
      <Button  title="Bypass Auth for now" onPress={()=>{navigation.navigate('tabNavigation',{screen:"Home"})}} />
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
    color:'black'
  },
  textColor:{
    color:'black'
  }
});

export default SignupScreen;
