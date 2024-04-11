import { StyleSheet } from 'react-native'

export const typography = StyleSheet.create({
  mainNavButtonText: {
    color: '#0779FF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.165
  },
  normal: (fontSize, fontWeight, color = '#FFF', wrap = 'no-wrap') => ({
    color,
    fontFamily: 'Poppins',
    fontSize,
    fontStyle: 'normal',
    fontWeight,
    letterSpacing: -0.165,
    wrap
  })
})

export const margin = StyleSheet.create({
  top: (value) => ({
    marginTop: value
  }),
  bottom: (value) => ({
    marginBottom: value
  }),
  left: (value) => ({
    marginLeft: value
  }),
  right: (value) => ({
    marginRight: value
  }),
  horizontal: (value) => ({
    marginHorizontal: value
  }),
  vertical: (value) => ({
    marginVertical: value
  }),
  all: (value) => ({
    margin: value
  })
})

export const padding = StyleSheet.create({
  top: (value) => ({
    paddingTop: value
  }),
  bottom: (value) => ({
    paddingBottom: value
  }),
  left: (value) => ({
    paddingLeft: value
  }),
  right: (value) => ({
    paddingRight: value
  }),
  horizontal: (value) => ({
    paddingHorizontal: value
  }),
  vertical: (value) => ({
    paddingVertical: value
  }),
  all: (value) => ({
    margin: value
  })
})
