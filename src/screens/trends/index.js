import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel'
import ProgressRingLayout from '../../components/ProgressRingLayout'
import { appThemeColors } from '../../utils/theme'
import * as Progress from 'react-native-progress'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import GradientButton from '../../utils/GradientButton'
import { FAB } from 'react-native-paper'
import FabGroup from '../../components/FabGroup'
const DiaryScreen = () => {
  const screenWidth = Dimensions.get('window').width
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselItems = [
    { component: <ProgressRingLayout />, id: '1' },
    { component: <ProgressRingLayout />, id: '2' },
    { component: <ProgressRingLayout />, id: '3' },
    { component: <ProgressRingLayout />, id: '4' }
  ]

  const _renderItem = ({ item }) => {
    return item.component
  }
  const buttonpressed = () => {
    console.log('button pressed ')
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appThemeColors.backgroundPrimary,
        paddingTop: 20
      }}>
      <StatusBar
        backgroundColor={appThemeColors.backgroundSecondary}
        barStyle="light-content"
      />
      {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
          layout="default"
          data={carouselItems}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          renderItem={_renderItem}
          onSnapToItem={index => setActiveIndex( index )}
        />
      </View> */}

      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: appThemeColors.backgroundSecondary,
            flex: 2,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 24,
                color: 'white',
                alignSelf: 'center',
                fontWeight: '600'
              }}>
              Food Log
            </Text>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                alignSelf: 'center',
                fontWeight: 'bold',
                letterSpacing: -0.17
              }}>
              {' '}
              \-- March 7, 2024 --/
            </Text>
          </View>
          <View
            style={{
              flex: 2.5,
              flexDirection: 'row'
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center'
              }}>
              <Text
                style={{
                  fontSize: 24,
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: '300'
                }}>
                810
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: appThemeColors.textColorGrey,
                  alignSelf: 'center',
                  fontWeight: '500',
                  letterSpacing: 0.17
                }}>
                Remaining
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // marginTop:20,
                position: 'relative'
              }}>
              {/* <Progress.Circle
                style={{margin:10}}
                progress={0.4}
                indeterminate={false}
                // borderWidth={1}
                // unfilledColor='grey'
                endAngle={0.4}
                size={120}
                thickness={8}
                strokeCap='square'
              /> */}
              <AnimatedCircularProgress
                size={150}
                width={8}
                fill={70}
                tintColor={appThemeColors.progressBarBlue}
                rotation={220}
                lineCap="round"
                arcSweepAngle={280}
                backgroundColor="grey"
                onAnimationComplete={() => console.log('onAnimationComplete')}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  position: 'absolute',
                  top: 40
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: '300'
                  }}>
                  810
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: appThemeColors.textColorGrey,
                    alignSelf: 'center',
                    fontWeight: '500',
                    letterSpacing: 0.17
                  }}>
                  Consumed
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center'
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: '300'
                  }}>
                  810
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: appThemeColors.textColorGrey,
                    alignSelf: 'center',
                    fontWeight: '500'
                  }}>
                  Target
                </Text>
              </View>
            </View>
          </View>

          {/* this is the flat progress area */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row'
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 29
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',

                  fontWeight: '600'
                }}>
                Protein
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: appThemeColors.textColorGrey,
                  fontWeight: '400',
                  letterSpacing: 0.17,
                  marginBottom: 5
                }}>
                12g
              </Text>
              <Progress.Bar
                progress={0.3}
                width={80}
                color="#D24F05"
                unfilledColor="#333333"
                borderWidth={0}
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 29
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',

                  fontWeight: '600'
                }}>
                Fats
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: appThemeColors.textColorGrey,
                  fontWeight: '400',
                  letterSpacing: 0.17,
                  marginBottom: 5
                }}>
                12g
              </Text>
              <Progress.Bar
                progress={0.3}
                width={80}
                color="#0CA826"
                unfilledColor="#333333"
                borderWidth={0}
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 29
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',

                  fontWeight: '600'
                }}>
                Carbs
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: appThemeColors.textColorGrey,
                  fontWeight: '400',
                  letterSpacing: 0.17,
                  marginBottom: 5
                }}>
                12g
              </Text>
              <Progress.Bar
                progress={0.3}
                width={80}
                unfilledColor="#333333"
                borderWidth={0}
              />
            </View>
          </View>
          {/* this is the END OF  flat progress area */}

          {/* this is the Gradient button  area */}
          <View style={{ flex: 1, marginVertical: 15 }}>
            <View style={{ width: 318, alignSelf: 'center', borderRadius: 16 }}>
              <GradientButton
                onPress={buttonpressed}
                colors={['#012D61', '#0158BF']}
                title="See Your Trends "
                style={{ padding: 15, alignItems: 'center', borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Image
                  source={require('../../assets/shivronRight.png')}
                  style={{ width: 20, height: 20 }}
                />

              </GradientButton>
            </View>
          </View>
          {/* this is the END OF Gradient button  area */}
        </View>
        <View style={{ flex: 1 }}></View>
        {/* <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => console.log('Pressed')}
        /> */}
        {/* <FabGroup/> */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 40
  }
})

export default DiaryScreen
