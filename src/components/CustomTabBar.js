import React, { useRef } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RBSheet from 'react-native-raw-bottom-sheet'
import { createNavigatorFactory } from '@react-navigation/native'

const CustomTabBar = ({ state, descriptors, navigation }) => {
  // console.log('inside customtab bar state', state);
  // console.log('inside customtab bar=, descriptor ', descriptors);
  // console.log('inside customtab bar  navigation', navigation);
  const refRBSheet = useRef(null)
  const screenWidth = Dimensions.get('window').width
  const buttonImages = [
    require('../assets/apple.png'),
    require('../assets/apple.png'),
    require('../assets/apple.png'),
    require('../assets/apple.png'),
    require('../assets/apple.png'),
    require('../assets/apple.png')
  ]
  const tabImage = {
    // stretching.png
    Home: require('../assets/Home_light.png'),
    'Food Diary': require('../assets/cutlery2.png'),
    Trends: require('../assets/Line_up_light.png'),
    'AI Coach': require('../assets/dumble.png')

  }

  const onPress = (route, index, isFocused) => {
    // console.log("this is the route and its index" , route,index)

    // 	const event = navigation.emit({
    // 		type: 'tabPress',
    // 		target: route.key,
    // 	});

    // 	if (!isFocused && !event.defaultPrevented) {
    // 		navigation.navigate(route.name);
    // 	}
    if (route.name === '+') {
      refRBSheet.current.open()
      // Open bottom sheet or perform any action you want
      // alert('Open bottom sheet or perform any action here');xs
    } else {
      // Prevent default behavior
      navigation.emit({
        type: 'tabPress',
        target: route.key,
        defaultPrevented: true
      })

      // Navigate to the tab screen
      navigation.navigate(route.name)
    }
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        console.log(
          'this is the route and its index',

          options.iconName,
          isFocused
        )

        return (
          <TouchableOpacity
            key={index}
            style={{
              ...styles.tabItem,
              backgroundColor: 'black'

            }}
            onPress={() => {
              onPress(route, index, isFocused)
            }}>
            <Image source={tabImage[route.name]} style={{ ...styles.buttonImage, tintColor: isFocused ? '#0679ff' : 'grey' }} />
            {!(route.name === '+') && <Text style={{ color: isFocused ? '#0679ff' : 'grey' }}>
              {route.name}
            </Text>}
          </TouchableOpacity>
        )
      })}
      {/* <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // Open action sheet
          alert('Hello!');
        }}>
        <Icon name="rocket" size={32} color="#007AFF" />
      </TouchableOpacity> */}
      <RBSheet
        ref={refRBSheet}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent'
          },
          draggableIcon: {
            backgroundColor: '#000'
          }
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true
        }}
        customAvoidingViewProps={{
          enabled: false
        }}>
        {/* Content of the bottom sheet */}
        <View
          style={[
            styles.bottomSheetContent,
            { flexWrap: 'wrap', flexDirection: 'row', backgroundColor: '#272a3c' }
          ]}>
          {buttonImages.map((imageSource, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => { navigation.navigate('searchFoodScreen') }}
              style={[
                styles.buttonContainer,
                { width: screenWidth * 0.33, height: screenWidth * 0.33, borderWidth: 2, borderRadius: 100 }
              ]} // Adjust width and height for desired sizing
            >
              <Image source={imageSource} style={styles.buttonImage} />
              <Text>Some Page</Text>
            </TouchableOpacity>
          ))}
        </View>
      </RBSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 79,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'flex-end'

  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 79
  },
  addButton: {
    position: 'absolute',
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 4,
    zIndex: 100
  },
  bottomSheetContent: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#272a3c'
  },
  bottomSheetContent: {
    flexDirection: 'row',
    alignItems: 'center', // Center buttons horizontally (optional)
    justifyContent: 'space-around' // Distribute buttons evenly (optional)

  },
  buttonContainer: {
    // borderRadius: width * 0.1, // Set borderRadius to 10% of screen width for circular shape
    backgroundColor: '#fff', // Button background color (customize)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4 // Add optional shadow for depth
  },
  buttonImage: {
    width: '40%', // Fill button container with image
    height: '40%',
    resizeMode: 'contain',
    marginTop: 30,
    padding: 10
  }
})

export default CustomTabBar
