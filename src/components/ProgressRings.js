import React from 'react';
// import { G, Circle } from 'react-native-svg';
// import { ProgressCircle } from 'react-native-svg-charts';
import * as Progress from 'react-native-progress';
import {View, Text, StyleSheet} from 'react-native';

const ProgressRing = ({circleType, amountOfCalories}) => {
  const totalCalories = 250;
  const progress = amountOfCalories / totalCalories;

  return (
    <View style={{ flex:1 ,alignItems: 'center', justifyContent:'space-between'}}>
      {/* <ProgressCircle
      style={{ height: 200 }}
      progress={progress}
      progressColor={'#b060c1'}
      startAngle={0}
      backgroundColor={"#328e8e"}
      endAngle={Math.PI * 2}
      strokeWidth={10}
      
    >
    </ProgressCircle> */}
      <Progress.Circle
        size={80}
        progress={progress}
        color={'#b060c1'}
        unfilledColor={'#328e8e'}
        borderWidth={0.5}
        indeterminate={false}
        thickness={8}
      />
      <Text style={{color: 'white' ,marginTop:30 ,fontWeight:"bold" ,fontSize:15}}>{circleType}</Text>
    </View>
  );
};

export default ProgressRing;
