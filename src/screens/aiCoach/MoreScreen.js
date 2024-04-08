import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SceneMap, TabView} from 'react-native-tab-view';

const MoreScreen = () => {
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('window');

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: '#ff4081'}} />
  );

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#673ab7'}} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/ic_back.png')} />
        </TouchableOpacity>

        <Text style={styles.titleText}>Prana AI</Text>

        <TouchableOpacity>
          <Image source={require('../../assets/ic_chat.png')} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          marginTop: 12,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'grey',
            fontWeight: '500',
          }}>
          Mode
        </Text>
        <TouchableOpacity style={{justifyContent: 'center', marginStart: 5}}>
          <Image source={require('../../assets/ic_info.png')} />
        </TouchableOpacity>
      </View>

      {/* <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
      /> */}

      <View
        style={[
          styles.textContainer,
          {
            width: width * 0.9,
          },
        ]}>
        <View style={styles.textContainer.subContainer}>
          <Image
            source={require('../../assets/ic_magic_chat.png')}
            resizeMode="contain"
          />
        </View>

        <TextInput
          style={styles.textInput}
          placeholderTextColor={'white'}
          placeholder="Type here..."
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010A18',
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
  },

  titleText: {
    textAlign: 'center',
    marginHorizontal: 12,
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    position: 'absolute',
    end: 0,
    start: 0,
  },

  textContainer: {
    backgroundColor: '#344760',
    height: 50,
    position: 'absolute',
    bottom: 0,
    marginBottom: 12,
    alignSelf: 'center',
    borderRadius: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    subContainer: {
      backgroundColor: '#8390A2',
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 40,
    },
  },

  textInput: {
    color: 'white',
    marginHorizontal: 12,
    flex: 1,
    height: 30,
  },
});

export default MoreScreen;
