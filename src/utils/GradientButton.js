import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const GradientButton = ({ onPress = () => { }, title, colors, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors}
        style={style}>
        <Text style={{ color: '#fff', fontSize: 16, fontFamily:'Poppins-Medium' ,letterSpacing: 0.17 }}>{title}</Text>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default GradientButton
