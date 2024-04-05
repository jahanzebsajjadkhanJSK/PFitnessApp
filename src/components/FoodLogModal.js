import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {appThemeColors} from '../utils/theme';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';

const FoodLogModal = () => {
  return (
    <BottomSheetView style={styles.contentContainer}>
      <Text style={{color:'white'}}>Awesome 🎉</Text>
      <View>
      <View> </View>

      
      <View></View>
      <View></View>
      <View></View>
      <View></View>
      <View></View>


      </View>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  centeredView: {},
  contentContainer: {
    flex: 1,
    backgroundColor: appThemeColors.backgroundSecondary,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FoodLogModal;
