import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const UnderlineButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default UnderlineButton;