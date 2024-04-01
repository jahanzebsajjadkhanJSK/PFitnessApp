import React, { useState } from 'react';
import { View, Text, StyleSheet ,Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ProgressRingLayout from '../../components/ProgressRingLayout';

const DiaryScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex,setActiveIndex]=useState(0)
  const carouselItems = [
    { component: <ProgressRingLayout />, id: '1' },
    { component: <ProgressRingLayout />, id: '2' },
    { component: <ProgressRingLayout />, id: '3' },
    { component: <ProgressRingLayout />, id: '4' },
  ];

  const _renderItem = ({ item }) => {
    return item.component;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#101123', paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
          layout="default"
          data={carouselItems}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          renderItem={_renderItem}
          onSnapToItem={index => setActiveIndex( index )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiaryScreen;