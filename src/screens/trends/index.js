import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

import { CartesianChart, Line, Scatter, CartesianAxis } from 'victory-native';
import Svg from 'react-native-svg';

import { useFont } from '@shopify/react-native-skia'

import inter from '../../assets/fonts/Poppins-Light.ttf'

const { width } = Dimensions.get('window')

const TabBar = ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setCurrentTab(tab)}
          style={[
            styles.tabBarItem,
            currentTab === tab && styles.tabBarItemSelected
          ]}
        >
          <Text style={styles.tabBarText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const data = [
  { x: 1, y: 180 },
  { x: 2, y: 180.5 },
  { x: 3, y: 180.3 },
  { x: 4, y: 180.8 },
  { x: 5, y: 180.5 },
];

const pointData = [
  // Your mock data points for the scatter points
  { x: 1, y: 180 },
  { x: 2, y: 181 },
  { x: 3, y: 180 },
  { x: 4, y: 181 },
  { x: 5, y: 180.5 },
];


const Trends = () => {
  const [currentTab, setCurrentTab] = useState('Body Composition')
  const font = useFont(inter, 12)

  const tabs = ['Body Composition', 'Strength', 'Nutrition']

  return (
    <ScrollView style={styles.container}>
      <TabBar tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {currentTab === 'Body Composition' && (
        <View style={styles.contentContainer}>
          {/* Rest of the content based on the selected tab */}
          <Text style={styles.titleText}>Current Trend Weight</Text>
          <Text style={styles.trendWeight}>180.5 lbs</Text>
          <View style={styles.chartContainer}>
          <Svg style={styles.chart}>
        {/* <CartesianChart
          data={data}
          width={350}
          height={200}
          // Add padding, domain, and other props as needed
        >
          {({ points }) => (
            
          <Line points={points.y} style={{ stroke: 'green', strokeWidth: 2 }} />
          )}
          <Scatter data={pointData} style={{ fill: 'white' }} />

          <CartesianAxis orientation="bottom" style={{ stroke: 'white' }} />
          <CartesianAxis orientation="left" style={{ stroke: 'white' }} />
        </CartesianChart> */}
      </Svg>

          </View>
        </View>
      )}

      {/* Placeholder for other tabs content */}
      {currentTab === 'Strength' && <View style={styles.tabContent} />}
      {currentTab === 'Nutrition' && <View style={styles.tabContent} />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010A18'
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#010A18'
  },
  tabBarItem: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  tabBarItemSelected: {
    borderBottomWidth: 3,
    borderBottomColor: '#00ff00' // The highlight color
  },
  tabBarText: {
    color: '#ffffff',
    fontSize: 16
  },
  contentContainer: {
    padding: 20
    // Add additional styling as needed
  },
  titleText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10
  },
  trendWeight: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20
  },
  tabContent: {
    height: 200, // Adjust the height as needed
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartContainer: {
    height: 200,
    backgroundColor: '#121A24',
    borderRadius: 10,
    marginVertical: 20
  },
  chartStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  chart: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },

})

export default Trends
