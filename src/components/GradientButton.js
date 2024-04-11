import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({
  onPress = () => {},
  title,
  colors,
  children,
  style,
}) => {
  return (
    // TODO: fix the styles.
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          margin: 0,
          padding: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colors}
        style={style}>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontFamily: 'Poppins-Medium',
            letterSpacing: 0.17,
          }}>
          {title}
        </Text>

        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
