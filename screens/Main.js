import React from 'react';
import {
    View,
    Text, StyleSheet, ScrollView, FlatList, TouchableOpacity,
} from 'react-native';
import Store from './../store/Store';
import UserList from './../components/UserList';
import {Popup} from 'popup-ui';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            friends: null,
            render: [],
        };
        this._getToken().then();
    }

    componentDidMount() {
    }

    _getToken = async () =>{
        try{
            this.setState({
                token:  await Store._retrieveData().then(response=>{return response})
            })
            if(this.state.token !== null){
                this._getFriends().then();
            }
        }catch(err){
            //
        }
    }

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
                        friends: response
                    })
                    if(this.state.friends !== null){
                        this.getData(this.state.friends);
                    }
                })
        } catch (error) {
            //console.log(error);
        }
    }

    getData = async (friends) => {
        let friendsArray = friends.friends;
        let friendList = friendsArray.slice(0, friendsArray.length);
        let dataArray = [];
        let i = 0;
        friendList.forEach(friend => {
                dataArray.push(
                    {
                        key: i.toString(),
                        title: friend,
                        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
                    }
                    );
                i++;
            },
        );
        this.setState({
            render: dataArray
        })

    }

    render() {

        return (
            <View style={styles.body}>
                <UserList itemList={this.state.render}/>
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
