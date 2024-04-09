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
  ScrollView,
  FlatList,
} from 'react-native';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import QuickQuestion from '../../components/QuickQuestion';

const MoreScreen = (props: any) => {
  const {width, height} = Dimensions.get('window');

  const data = [
    {title: 'How do I create a workout?'},
    {title: 'How do I create a workout?'},
    {title: 'How do I create a workout?'},
  ];

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: '0', title: 'Supplements'},
    {key: '1', title: 'Exercises'},
    {key: '2', title: 'Nutrition'},
    {key: '3', title: 'Coaches'},
    {key: '4', title: 'Dietitian'},
  ]);

  const FirstRoute = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          width: width,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../../assets/ic_chat_ai.png')}
        />

        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            width: width * 0.6,
            fontSize: 18,
            marginTop: 14,
          }}>
          Ask me anything. For example, “generate a meal plan for me”.
        </Text>

        <FlatList
          style={{marginTop: 16}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => {
            return <QuickQuestion item={item} />;
          }}
        />
      </View>
    </View>
  );

  const renderScene = SceneMap({
    0: FirstRoute,
    1: FirstRoute,
    2: FirstRoute,
    3: FirstRoute,
    4: FirstRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'transparent'}}
      style={{
        backgroundColor: '#033673',
        borderRadius: 30,
        marginHorizontal: 12,
        marginVertical: 12,
        padding: 3,
      }}
      scrollEnabled={true}
      activeColor="white"
      inactiveColor="#DADADA"
      tabStyle={{width: 'auto'}}
      renderTabBarItem={({
        inactiveColor,
        activeColor,
        route,
        navigationState,
      }) => {
        const isActive =
          navigationState.index ===
          navigationState.routes.findIndex(r => r.key === route.key);

        const handleTabPress = () => {
          const tabIndex = navigationState.routes.findIndex(
            r => r.key === route.key,
          );
          if (tabIndex !== navigationState.index) {
            setIndex(tabIndex);
          }
        };

        return (
          <View>
            {isActive ? (
              <TouchableOpacity
                onPress={() => handleTabPress()}
                style={{
                  backgroundColor: '#2578DC',
                  borderRadius: 30,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  marginEnd: 8,
                }}>
                <Text style={{color: activeColor}}>{route.title}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => handleTabPress()}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                }}>
                <Text style={{color: inactiveColor}}>{route.title}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props?.navigation?.goBack()}>
          <Image source={require('../../assets/ic_back.png')} />
        </TouchableOpacity>

        <Text style={styles.titleText}>Prana AI</Text>

        <TouchableOpacity
          onPress={() => {
            props?.navigation?.navigate('ChatHistory', null);
          }}>
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

      <TabView
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        navigationState={{index, routes}}
        renderScene={renderScene}
        swipeEnabled={false}
      />

      <View
        style={[
          styles.textContainer,
          {
            width: width * 0.9,
          },
        ]}>
        <View style={styles.textSubContainer}>
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
  },

  textSubContainer: {
    backgroundColor: '#8390A2',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },

  textInput: {
    color: 'white',
    marginHorizontal: 12,
    flex: 1,
    height: 30,
  },
});

export default MoreScreen;
