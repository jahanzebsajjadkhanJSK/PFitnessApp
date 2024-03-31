import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FoodSearch from '../../components/FoodSearch';

const FoodScreen = () => {
  return (
    <View style={styles.container}>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FoodSearch />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FoodScreen;
