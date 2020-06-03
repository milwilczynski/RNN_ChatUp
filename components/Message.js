import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const Message: () => React$Node = () => {
  return(

      <View style={styles.body}>

      </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    minHeight: '100%',
  },
  button: {
    flex: 0.33,
    height: '100%',
    margin: 5,
  },
  buttonTextStyle: {
    color: 'white',
  },
});

export default Message;
