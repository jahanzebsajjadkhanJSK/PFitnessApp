import React, { useRef } from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';

const CustomTabBar = ({state, descriptors, navigation}) => {
	console.log("inside customtab bar state" ,state)
	console.log("inside customtab bar=, descriptor " ,descriptors)
	console.log("inside customtab bar  navigation" ,navigation)
	const refRBSheet= useRef(null);

	const onPress = (route, index,isFocused) => {
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
        defaultPrevented: true,
      });

      // Navigate to the tab screen
      navigation.navigate(route.name);
    }
		};


  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

       
				console.log("this is the route and its index" , route,index,options, isFocused)

        return (
          <TouchableOpacity
            key={index}
            style={{...styles.tabItem, backgroundColor: route.name === '+' ? "#ff6833" : "#272a3b"}}
            onPress={()=>{onPress(route, index,isFocused)}}>
						<Text style={{color:isFocused? '#ff6833': 'grey'}}>{route.name}</Text>
            {/* <Icon
              name={options.iconName}
              size={40}
              color={isFocused ? '#007AFF' : '#ccc'}
            /> */}
          </TouchableOpacity>
        );
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
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        {/* Content of the bottom sheet */}
        <View style={styles.bottomSheetContent}>
          <Text style={{color:'black'}}>Bottom Sheet Content will be placed here</Text>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    elevation: 2,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

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
    zIndex: 100,
  },
	bottomSheetContent: {
    alignItems: 'center',
    padding: 20,
  },
});

export default CustomTabBar;
