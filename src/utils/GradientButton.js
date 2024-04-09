import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const GradientButton = ({ onPress = () => { }, title, colors, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors}
        style={style}>
        <Text style={styles.text}>{title}</Text>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.17,
  },
});

export default GradientButton
