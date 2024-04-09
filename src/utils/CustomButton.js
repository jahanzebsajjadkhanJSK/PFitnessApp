import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const CustomButton = ({ onPress = () => { }, title, children, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
          <Text style={styles.text}>{title}</Text>
          {children}
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ccc',
    },
    text: {
      fontSize: 16,
      fontWeight: '500',
      letterSpacing: 0.17,
      color: '#000',
    },
  });
  

export default CustomButton