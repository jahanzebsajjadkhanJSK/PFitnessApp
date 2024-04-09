import {View, Text} from 'react-native';
import React from 'react';

type Props = {
  item: any;
};

const QuickQuestion = (props: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#225FA7',
        borderRadius: 4,
        marginEnd: 8,
      }}>
      <Text
        style={{
          color: 'white',
          margin: 12,
        }}>
        {props?.item?.title}
      </Text>
    </View>
  );
};

export default QuickQuestion;
