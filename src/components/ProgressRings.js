import React from 'react';
// import { G, Circle } from 'react-native-svg';
// import { ProgressCircle } from 'react-native-svg-charts';
import * as Progress from 'react-native-progress';
import {View, Text, StyleSheet} from 'react-native';
import PieChart from 'react-native-pie-chart'

const ProgressRing = ({circleType, amountOfCalories}) => {
  const totalCalories = 250;
  const progress = amountOfCalories / totalCalories;
  const widthAndHeight = 100
  const series = [123, 321, 123, 189, 537]
  const sliceColor = ['#328e8e', '#b060c1', '#ff9100', '#ff6c00', '#ff3c00']


  return (
    <View style={{ flex:1 ,alignItems: 'center', justifyContent:'space-between'}}>
       <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.8}
            coverFill={'#272a3b'}
            style={{borderWidth:1}}
          />
      {/* <Progress.Circle
        size={80}
        progress={progress}
        color={'#b060c1'}
        unfilledColor={'#328e8e'}
        borderWidth={0.5}
        indeterminate={false}
        thickness={8}
      /> */}
      <Text style={{color: 'white' ,marginTop:30 ,fontWeight:"bold" ,fontSize:15}}>{circleType}</Text>
    </View>
  );
};

export default ProgressRing;
