import React from 'react';
import { TouchableOpacity, Text, StyleSheet,Image, View } from 'react-native';

const CustomImageButton = ({ onPress = () => { }, title, imageSource, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {imageSource && <View style={styles.imageContainer}><Image source={imageSource} style={styles.image} /></View>}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  imageContainer: {
    marginRight: 8,
  },
  image: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.17,
    color: '#000',
  },
});

export default CustomImageButton;