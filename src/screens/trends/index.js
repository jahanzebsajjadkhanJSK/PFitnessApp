import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ProgressRingLayout from '../../components/ProgressRingLayout';
import {appThemeColors} from '../../utils/theme';
import * as Progress from 'react-native-progress';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import GradientButton from '../../components/GradientButton';
import FabGroup from '../../components/FabGroup';
import {FAB, Portal, PaperProvider} from 'react-native-paper';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

const DiaryScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [state, setState] = React.useState({open: false});
  const [screenInFocus, setScreenInFocus] = useState(false);
  const navigation = useNavigation();

  const onStateChange = ({open}) => {
    console.log('this is state chanfe', open);
    setState({open});
  };
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setScreenInFocus(true);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      setScreenInFocus(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  const {open} = state;

  const actionItems = [
    {
      icon: () => (
        <Image
          source={require('../../assets/fab_icons/Favorites_duotone_line.png')}
          style={{width: 24, height: 24}}
        />
      ),
      label: 'Custom Foods',
      labelTextColor: 'white',
      style: {
        marginBottom: -30,
        backgroundColor: 'white',
        borderRadius: 40,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
      },
      containerStyle: {marginBottom: -20},
      onPress: () => console.log('Pressed email'),
    },
    {
      icon: () => (
        <Image
          source={require('../../assets/fab_icons/Favorites_duotone_line.png')}
          style={{width: 24, height: 24}}
        />
      ),
      label: 'Log Weight',
      labelTextColor: 'white',
      style: {
        marginBottom: -30,
        backgroundColor: 'white',
        borderRadius: 40,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
      },
      containerStyle: {marginBottom: -20},
      color: 'green',
      onPress: () => console.log('Pressed star'),
    },
    {
      icon: () => (
        <Image
          source={require('../../assets/fab_icons/Orange_light.png')}
          style={{width: 24, height: 24}}
        />
      ),
      label: 'Add Food',
      labelTextColor: 'white',

      style: {
        marginBottom: -30,
        backgroundColor: 'white',
        borderRadius: 40,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
      },
      containerStyle: {marginBottom: -20},

      onPress: () =>
        navigation.navigate('Trends', {screen: 'searchFoodScreen'}),
    },
    {
      icon: () => (
        <Image
          source={require('../../assets/fab_icons/Add_ring_light.png')}
          style={{width: 24, height: 24}}
        />
      ),
      label: 'Add Bodyfat',
      labelTextColor: 'white',

      style: {
        marginBottom: -30,
        backgroundColor: 'white',
        borderRadius: 40,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
      },
      containerStyle: {marginBottom: -20},

      onPress: () => console.log('Pressed email'),
    },
    {
      icon: () => (
        <Image
          source={require('../../assets/fab_icons/View_alt_light.png')}
          style={{width: 24, height: 24}}
        />
      ),
      label: 'Barcode Scan',
      labelTextColor: 'white',

      style: {
        marginBottom: -30,
        backgroundColor: 'white',
        borderRadius: 40,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
      },
      containerStyle: {marginBottom: -20},

      onPress: () => console.log('Pressed email'),
    },
    {
      icon: () => (
        <Image
          source={require('../../assets/fab_icons/comment_duotone_line.png')}
          style={{resizeMode: 'contain'}}
        />
      ),
      label: 'New Chat',
      labelTextColor: 'white',
      style: {
        backgroundColor: 'white',
        borderRadius: 40,
        width: 32,
        height: 32,
        justifyContent: 'center',

        alignItems: 'center',
        marginBottom: -30,
      },
      containerStyle: {marginBottom: -20},

      onPress: () => console.log('Pressed notifications'),
    },
  ];

  const _renderItem = ({item}) => {
    return item.component;
  };
  const buttonpressed = () => {
    console.log('button pressed ');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: appThemeColors.backgroundPrimary,
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

      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: appThemeColors.backgroundSecondary,
            flex: 2.5,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingTop: 50,
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 24,
                color: 'white',
                alignSelf: 'center',
                fontWeight: '600',
              }}>
              Food Log
            </Text>
          </View>
          <View style={{paddingTop: 35}}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                alignSelf: 'center',
                fontWeight: 'bold',
                letterSpacing: -0.17,
              }}>
              {' '}
              \-- March 7, 2024 --/
            </Text>
          </View>
          <View
            style={{
              flex: 2.5,
              flexDirection: 'row',
              paddingTop: 34,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: '300',
                }}>
                810
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: appThemeColors.textColorGrey,
                  alignSelf: 'center',
                  fontWeight: '500',
                  letterSpacing: 0.17,
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
                position: 'relative',
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
                  top: 33,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: '300',
                  }}>
                  810
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: appThemeColors.textColorGrey,
                    alignSelf: 'center',
                    fontWeight: '500',
                    letterSpacing: 0.17,
                  }}>
                  Consumed
                </Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: '300',
                  }}>
                  810
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: appThemeColors.textColorGrey,
                    alignSelf: 'center',
                    fontWeight: '500',
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
              flexDirection: 'row',
              paddingTop: 30,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 29,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',

                  fontWeight: '600',
                }}>
                Protein
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: appThemeColors.textColorGrey,
                  fontWeight: '400',
                  letterSpacing: 0.17,
                  marginBottom: 5,
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
                paddingLeft: 29,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',

                  fontWeight: '600',
                }}>
                Fats
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: appThemeColors.textColorGrey,
                  fontWeight: '400',
                  letterSpacing: 0.17,
                  marginBottom: 5,
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
                paddingLeft: 29,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',

                  fontWeight: '600',
                }}>
                Carbs
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: appThemeColors.textColorGrey,
                  fontWeight: '400',
                  letterSpacing: 0.17,
                  marginBottom: 5,
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
          <View style={{flex: 1.3, marginVertical: 15}}>
            <View style={{width: 318, alignSelf: 'center', borderRadius: 16}}>
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
        <View style={{flex: 1}}></View>
        {/* <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => console.log('Pressed')}
        /> */}
        {/* <FabGroup/> */}
        <Portal>
          {open && (
            <BlurView
              style={styles.absolute}
              blurType="dark"
              blurAmount={5}
              reducedTransparencyFallbackColor="white"
            />
          )}
          {screenInFocus && (
            <FAB.Group
              open={open}
              visible
              fabStyle={{
                backgroundColor: 'white',
                borderRadius: 40,
                marginBottom: 87,
              }}
              backdropColor="transparent"
              icon={'plus'}
              actions={actionItems}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                }
              }}
            />
          )}
        </Portal>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 40,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default DiaryScreen;
