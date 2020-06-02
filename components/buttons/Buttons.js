import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
//<Image source={require('./../../android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png')}/>
const Buttons: () => React$Node = () => {
    return (
        <View style={styles.body}>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => {
                    Navigation.push('MAIN_STACK', {
                        component: {
                            name: 'Chat',
                            options:{
                                topBar:{
                                    visible: true
                                }
                            }
                        },
                    })
                }}>
                    <Icon name='comments' color='white' size={20}/>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity>
                    <Icon name='user-plus' color='white' size={20}/>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => {
                    Navigation.push('MAIN_STACK', {
                        component: {
                            name: 'Main',
                            options:{
                                topBar:{
                                    visible: true
                                }
                            }
                        },
                    })
                }}>
                    <Icon name='home' color='white' size={23}/>
                </TouchableOpacity>
            </View>
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
        margin: 5
    },
    buttonTextStyle:{
        color: 'white'
    }
});

export default Buttons;
