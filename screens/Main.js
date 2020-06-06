import React from 'react';
import {
    View,
    Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image,
} from 'react-native';
import Store from './../store/Store';
import SockJS from 'sockjs-client';
import MessageStore from '../store/MessageStore';
import {Input} from 'react-native-elements';

var stompClient = require('stompjs/lib/stomp').Stomp;

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            friends: null,
            login: this.props.login,
            render: [],
            messages: '',
            arrayOfMsg: '',
            lastSender: '',
            msgToSend: '',
            chosenFriend: 'A nice friend! :)',
            url: 'http://192.168.1.110:8080',

        };
        this._getToken().then();
    }
    static msgStore = new MessageStore();
    componentDidMount() {
        try {
            this.interval = setInterval(() => {
                if(this.state.messages != Main.msgStore.getMessage()) {
                    this.setState({
                        messages: Main.msgStore.getMessage(),
                        arrayOfMsg: this.state.arrayOfMsg + '\n' + Main.msgStore.getSender() +': ' + Main.msgStore.getMessage()
                    })
                }
                }, 1000);
        } catch (err) {
            //
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _connectToChat = async (login) => {
        try {
            let socket = new SockJS(this.state.url + '/chat');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('connected to: ' + frame);
                stompClient.subscribe('/topic/messages/' + login, function (response) {
                    let data = JSON.parse(response.body);
                    Main.msgStore.setMessage(data.message);
                    Main.msgStore.setSender(data.fromLogin);
                });
            });
        } catch (err) {
            //
        }
    };

    sendMsg(to, text) {
        stompClient.send('/app/chat/' + to, {}, JSON.stringify({
            fromLogin: this.state.login,
            message: text,
        }));
        this.setState({
            arrayOfMsg: this.state.arrayOfMsg + '\n' + this.state.login + ': ' + text,
        });
    }

    _getToken = async () => {
        try {
            this.setState({
                token: await Store._retrieveData().then(response => {
                    return response;
                }),
            });
            if (this.state.token !== null) {
                this._getFriends().then();
            }
        } catch (err) {
            //
        }
    };

    _getFriends = async () => {
        console.log(this.state.token);
        try {
            await fetch('http://192.168.1.110:8080/refresh', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.token,
                },
            })
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        friends: response,
                    });
                    if (this.state.friends !== null) {
                        this.getData(this.state.friends);
                    }
                });
        } catch (error) {
            //console.log(error);
        }
    };

    getData = async (friends) => {
        let friendsArray = friends.friends;
        let friendList = friendsArray.slice(0, friendsArray.length);
        let dataArray = [];
        let i = 0;
        friendList.forEach(friend => {
                dataArray.push
                (
                    <TouchableOpacity key={i.toString()} onPress={() => this._friendNameOnClick(friend)}>
                        <View style={styles.container2}>
                            <Image
                                source={{uri: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'}}
                                style={styles.photo}/>
                            <View style={styles.container_text}>
                                <Text style={styles.title}>
                                    {friend}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>,
                );
                i++;
            },
        );
        this.setState({
            render: dataArray,
        });
        if (this.state.render !== []) {
            await this._connectToChat(this.props.login);
        }
    };

    _friendNameOnClick(friend) {
        if(friend != this.state.lastSender){
            this.setState({
                arrayOfMsg: ' '
            })
        }
        this.setState({
            chosenFriend: friend,
        });
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.topContainer}>
                    <ScrollView>
                        {this.state.render}
                    </ScrollView>
                </View>
                <View style={styles.middleContainer}>
                    <Text style={styles.title}>{this.state.chosenFriend}</Text>
                </View>
                <ScrollView style={styles.bottomContainer}>
                    <Text>{this.state.arrayOfMsg}</Text>
                    <TouchableOpacity onPress={() => this.sendMsg(this.state.chosenFriend, this.state.msgToSend)}>
                        <Text>WYSLIJ</Text>
                    </TouchableOpacity>
                    <Input
                        placeholder="Message"
                        placeholderTextColor="white"
                        inputStyle={{color: 'white'}}
                        onChangeText={(value) => this.setState({msgToSend: value})}
                    />
                </ScrollView>
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
    topContainer: {
        flex: 0.5,
    },
    middleContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    bottomContainer: {
        flex: 0.4,
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderColor: '#cceabb',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 16,
        color: '#eee',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
});
