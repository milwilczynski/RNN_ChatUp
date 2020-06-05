import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderColor: '#cceabb',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 16,
        color: '#eee',
    },
    top:{

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
});

const Message = ({ title, message}) => (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <View style={styles.container_text}>
                <Text>
                    {message}
                </Text>
            </View>
        </View>
);

export default Message;
