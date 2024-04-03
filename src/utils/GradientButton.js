import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const GradientButton = ({ onPress, title, colors }) => {
  return (
    <TouchableOpacity onPress={onPress}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors}
        style={{ padding: 15, alignItems: 'center', borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ paddingLeft: 22, color: '#fff', fontSize: 16, fontWeight: '500', letterSpacing: 0.17 }}>{title}</Text>
        <View>
      <Image
        source={require('../../src/assets/shivronRight.png')} // Replace with the actual path to your image
        style={{ width: 20, height: 20 }} // Adjust the width and height as per your requirement
      />
    </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default GradientButton
