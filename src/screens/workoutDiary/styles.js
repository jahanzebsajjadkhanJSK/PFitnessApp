import { StyleSheet } from "react-native";

export const typography = StyleSheet.create({
  mainNavButtonText: {
    color: '#0779FF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.165,
  },
  normal: (fontSize, fontWeight, color = '#FFF', wrap = 'no-wrap') => ({
    color,
    fontFamily: 'Poppins',
    fontSize,
    fontStyle: 'normal',
    fontWeight,
    letterSpacing: -0.165,
    wrap,
  }),
})