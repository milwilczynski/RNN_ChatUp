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
            friendName: String,
            token: String
        };
    }
    componentDidMount() {
        Store._retrieveData().then(response => this.setState({
            token: response
        }))

    }

    async addFriendConnection() {
        try {
            await fetch('http://192.168.1.110:8080/addFriend?friendName=' + this.state.friendName, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + this.state.token
                },
            }).then(response => {
                if (response.status === 401 || response.status === 400) {
                    Popup.show({
                        type: 'Warning',
                        title: 'Friend error?',
                        button: false,
                        textBody: 'Check username or friend is already on list.',
                        buttontext: 'Ok.',
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
                    Popup.show({
                        type: 'Success',
                        title: 'Together, we strong!',
                        button: false,
                        textBody: 'Friend has been successfully added!',
                        buttontext: 'Ok.',
                        callback: () => {
                            Popup.hide();
                        },
                    });
                }
            })
        } catch (error) {
            //console.log(error);
        }

    }

    render() {
        return (
            <Root>
                <View style={styles.body}>
                    <View style={styles.top}>
                    <Text style={{color: 'white'}}>Insert friend username here!</Text>
                    <Input
                        placeholder="Friend Username"
                        leftIcon={{
                            type: 'font-awesome',
                            name: 'user',
                            color: 'white',
                            size: 18,
                        }}
                        placeholderTextColor="white"
                        inputStyle={{color: 'white'}}
                        onChangeText={(value) => this.setState({friendName: value})}
                    />
                    <Button
                        onPress={() => this.addFriendConnection()}
                        title="Add Friend!"
                        type="outline"
                        containerStyle={{flex: 0.5, width: '50%', color: 'black'}}
                        buttonStyle={{borderColor: 'white', backgroundColor: '#222831'}}
                        titleStyle={{color: 'white'}}
                    />
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
        alignItems: 'center'
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
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
