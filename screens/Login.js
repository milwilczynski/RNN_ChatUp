import React from 'react';
import {
    View,
    Text,
    TouchableOpacty,
    StyleSheet, TouchableOpacity,
}
    from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Input, Button} from 'react-native-elements';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: String,
            password: String,
        };

    }

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.top}>
                    <Text style={{fontSize: 50, color: 'white'}}>Chat</Text>
                    <Text style={{fontSize: 50, marginLeft: '20%', marginTop: '-5%', color: 'white'}}>Up!</Text>
                </View>
                <View style={styles.bottom}>
                    <View style={{flex: 1, width: '85%', marginTop: '5%', alignItems: 'center'}}>
                        <Input
                            placeholder="Login"
                            leftIcon={{type: 'font-awesome', name: 'user', color: 'white', size: 18}}
                            placeholderTextColor='white'
                            inputStyle={{color: 'white'}}
                            onChangeText={value => this.setState({password: value})}
                        />
                        <Input
                            placeholder="Password"
                            leftIcon={{type: 'font-awesome', name: 'unlock-alt', color: 'white', size: 18}}
                            placeholderTextColor='white'
                            inputStyle={{color: 'white'}}
                            secureTextEntry={true}
                            onChangeText={value => this.setState({login: value})}
                        />
                        <Button
                            onPress={() =>{
                                Navigation.push('MAIN_STACK', {
                                    component: {
                                    name: 'Main',
                                    options:{
                                        topBar:{
                                            title:{
                                                text: 'Home',
                                                color: 'white'
                                            },
                                            visible: true
                                        }
                                    }
                                }
                                });
                            }}
                            title="Log In"
                            type="outline"
                            containerStyle={{flex: 0.5, width: '50%', color: 'black'}}
                            buttonStyle={{borderColor: 'white', backgroundColor: '#222831'}}
                            titleStyle={{color: 'white'}}
                        />
                        <View>
                            <TouchableOpacity onPress={() => {
                                Navigation.push('MAIN_STACK', {
                                    component: {
                                        name: 'Register',
                                    },
                                });
                            }}>
                                <Text style={{color: 'white'}}> Don't have an account? Join now!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
