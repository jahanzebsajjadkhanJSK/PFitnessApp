import React from 'react';
// import { G, Circle } from 'react-native-svg';
import { ProgressCircle } from 'react-native-svg-charts';
import { View, Text, StyleSheet } from 'react-native';


const ProgressRing = ({ circleType , amountOfCalories }) => {
  const totalCalories = 250;
  const progress = amountOfCalories / totalCalories;

  return (
    <View style={{ borderWidth:1, alignItems:'center'}}>
    <ProgressCircle
      style={{ height: 200 }}
      progress={progress}
      progressColor={'#b060c1'}
      startAngle={0}
      backgroundColor={"#328e8e"}
      endAngle={Math.PI * 2}
      strokeWidth={10}
      
    >
    </ProgressCircle>
    <Text>{circleType}</Text>
    </View>
  );
};

export default ProgressRing;