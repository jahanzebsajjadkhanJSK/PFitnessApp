import React, { useState } from 'react'
import { Text, TouchableHighlight, Dimensions, View, StyleSheet, ScrollView } from 'react-native'
import { appThemeColors } from '../utils/theme'

const CategoryFilters = ({ tags, activeCategory, setActiveCategory }) => {
  // const userLang = useSelector((state) => state.mainViewReducer.userLang);

  const Button = (props) => {
    const { title, active } = props
    const buttonHeight = Dimensions.get('screen').height * 0.035

    return (
      <TouchableHighlight
        onPress={() => {
          setActiveCategory(title)
        }}
        activeOpacity={0.8}
        style={[
          styles.button,
          {
            // backgroundColor: active ? 'green' : '#E6E6E6',
          }
        ]}
      >
        <View style={styles.buttonContent}>
          <Text
            style={[
              styles.buttonText,
              {
                color: active ? '#FFFFFF' : 'grey'
              }
            ]}
          >
            {title}
          </Text>
          {active && <View style={styles.bottomBar} />}
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.scrollContainer}
      >
        {tags.map((val, index) => (
          <Button
            key={index}
            title={val}
            active={activeCategory === val}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: 50
  },
  scrollContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: appThemeColors.backgroundTertiary
  },
  button: {
    height: '100%',
    justifyContent: 'center',
    borderRadius: 15,
    marginHorizontal: 5
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    textAlign: 'center',
    minWidth: 20,
    marginHorizontal: 10
  },
  bottomBar: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 4,

    backgroundColor: '#519CF3'
  }
})

export default CategoryFilters
