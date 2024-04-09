import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const ChatHistory = (props: any) => {
  return (
    <View style={[styles.container]}>
      <SafeAreaView
        style={{
          backgroundColor: '#1C242D',
          borderBottomStartRadius: 12,
          borderBottomEndRadius: 12,
        }}>
        <View style={[styles.header]}>
          <TouchableOpacity onPress={() => props?.navigation?.goBack()}>
            <Image source={require('../../assets/ic_back.png')} />
          </TouchableOpacity>

          <Text style={styles.titleText}>Chat History</Text>

          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../../assets/ic_chat.png')} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010A18',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 30,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },

  titleText: {
    textAlign: 'center',
    marginHorizontal: 12,
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
});

export default ChatHistory;
