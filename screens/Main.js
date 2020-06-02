import React from 'react';
import {
  View,
  Text, StyleSheet,
} from 'react-native';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.body}>
        <Text>Screen głowny</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: '#222831',
    flex: 1,
  },
});
