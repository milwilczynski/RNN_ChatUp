import React from 'react';
import {
    View,
    Text,
    TouchableOpacty,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Store from './../store/Store';
import {Navigation} from 'react-native-navigation';
import {Input, Button} from 'react-native-elements';
import {Root, Popup} from 'popup-ui';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: 'urkek',
            password: 'urkek123',
        };
    }

    async login() {
        try {
            await fetch('http://192.168.1.110:8080/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: this.state.login,
                    password: this.state.password,
                }),
            }).then(response => {
                console.log(response.status)
                if (response.status === 401) {
                    Popup.show({
                        type: 'Danger',
                        title: 'Login failed!',
                        button: false,
                        textBody: 'Something went wrong, be sure you typed correct password either login.',
                        buttontext: 'Try again.',
                        callback: () => Popup.hide(),
                    });
                }
                if (response.status === 500) {
                    Popup.show({
                        type: 'Warning',
                        title: 'Server issue!',
                        button: false,
                        textBody: 'Please try again.',
                        buttontext: 'Try again.',
                        callback: () => {
                            Popup.hide();
                        },
                    });
                }
                if (response.status === 200) {
                    return response.json();
                }
            })
                .then((responseData) => {
                    Store._storeData(responseData.token);
                })
                .then(function () {
                        Navigation.push('MAIN_STACK', {
                            component: {
                                name: 'Main',
                                options: {
                                    topBar: {
                                        visible: true,
                                    },
                                },
                            },
                        });
                    },
                );
        } catch (error) {
            //console.log(error);
        }

    }

    render() {
        return (
            <Root>
                <View style={styles.body}>
                    <View style={styles.top}>
                        <Text style={{fontSize: 50, color: 'white'}}>Chat</Text>
                        <Text
                            style={{
                                fontSize: 50,
                                marginLeft: '20%',
                                marginTop: '-5%',
                                color: 'white',
                            }}>
                            Up!
                        </Text>
                    </View>
                    <View style={styles.bottom}>
                        <View
                            style={{
                                flex: 1,
                                width: '85%',
                                marginTop: '5%',
                                alignItems: 'center',
                            }}>
                            <Input
                                placeholder="Login"
                                leftIcon={{
                                    type: 'font-awesome',
                                    name: 'user',
                                    color: 'white',
                                    size: 18,
                                }}
                                placeholderTextColor="white"
                                inputStyle={{color: 'white'}}
                                onChangeText={(value) => this.setState({login: value})}
                            />
                            <Input
                                placeholder="Password"
                                leftIcon={{
                                    type: 'font-awesome',
                                    name: 'unlock-alt',
                                    color: 'white',
                                    size: 18,
                                }}
                                placeholderTextColor="white"
                                inputStyle={{color: 'white'}}
                                secureTextEntry={true}
                                onChangeText={(value) => this.setState({password: value})}
                            />
                            <Button
                                onPress={() => this.login()}
                                title="Log In"
                                type="outline"
                                containerStyle={{flex: 0.5, width: '50%', color: 'black'}}
                                buttonStyle={{borderColor: 'white', backgroundColor: '#222831'}}
                                titleStyle={{color: 'white'}}
                            />
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        Navigation.push('MAIN_STACK', {
                                            component: {
                                                name: 'Register',
                                            },
                                        });
                                    }}>
                                    <Text style={{color: 'white'}}>
                                        {' '}
                                        Don't have an account? Join now!
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: '100%',
        backgroundColor: '#222831',
        flex: 1,
    },
    top: {
        flex: 0.4,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: '80%',
        marginLeft: '10%',
    },
    bottom: {
        flex: 0.6,
        alignItems: 'center',
    },
    inputs: {
        backgroundColor: 'white',
        color: 'white',
    },
});
