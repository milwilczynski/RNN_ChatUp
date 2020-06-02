/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        Navigation.push('MAIN_STACK', {
            component: {
                name: 'Login',
                options: {
                    topBar: {
                        visible: false
                    }
                }
            }
        })
    }
    render() {
        return (
            <View style={styles.body}>
                <Text>Screen APP</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#222831'
    },
});

