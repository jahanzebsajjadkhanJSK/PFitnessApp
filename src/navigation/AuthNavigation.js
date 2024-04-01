import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/auth/SignupScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ConfirmSignupScreen from '../screens/auth/ConfirmSignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ConfirmForgotPasswordScreen from '../screens/auth/ConfirmForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ConfirmSignup" component={ConfirmSignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ConfirmForgotPassword" component={ConfirmForgotPasswordScreen} />
      </Stack.Navigator>
  );
};

export default AuthNavigation;
