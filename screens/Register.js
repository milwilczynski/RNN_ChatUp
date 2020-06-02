import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: String,
            password: String,
            rePassword: String,
            email: String,
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
                    <View style={{flex: 1, width: '85%', alignItems: 'center'}}>
                        <Input
                            placeholder="Email"
                            leftIcon={{type: 'font-awesome', name: 'at', color: 'white', size: 18}}
                            placeholderTextColor='white'
                            inputStyle={{color: 'white'}}
                            onChangeText={value => this.setState({email: value})}
                        />
                        <Input
                            placeholder="Login"
                            leftIcon={{type: 'font-awesome', name: 'user', color: 'white', size: 18}}
                            placeholderTextColor='white'
                            inputStyle={{color: 'white'}}
                            onChangeText={value => this.setState({login: value})}
                        />
                        <Input
                            placeholder="Password"
                            leftIcon={{type: 'font-awesome', name: 'unlock-alt', color: 'white', size: 18}}
                            placeholderTextColor='white'
                            inputStyle={{color: 'white'}}
                            secureTextEntry={true}
                            onChangeText={value => this.setState({password: value})}
                        />
                        <Input
                            placeholder="Re-Password"
                            leftIcon={{type: 'font-awesome', name: 'unlock-alt', color: 'white', size: 18}}
                            placeholderTextColor='white'
                            inputStyle={{color: 'white'}}
                            secureTextEntry={true}
                            onChangeText={value => this.setState({rePassword: value})}
                        />
                        <Button
                            onPress={()=>{
                                console.log("Login: " + this.state.login);
                                console.log("Email: " + this.state.email);
                                console.log("Password: " + this.state.password);
                                console.log("RePassword: " + this.state.rePassword);
                            }}
                            title="Register Now!"
                            type="outline"
                            containerStyle={{flex: 0.5, width: '50%', color: 'black'}}
                            buttonStyle={{borderColor: 'white', backgroundColor: '#222831'}}
                            titleStyle={{color: 'white'}}
                        />
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
        flex: 0.35,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: '80%',
        marginLeft: '10%',
    },
    bottom: {
        flex: 0.65,
        alignItems: 'center',
    },
});
