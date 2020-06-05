import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Message from './Message';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const MessageList = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={
                ({item}) =>
                    <Message
                        title={item.title}
                        message={item.message}
                    />
            }
        />
    </View>
);

export default MessageList;
