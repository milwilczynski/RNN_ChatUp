import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import User from './User';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const UserList = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={
                ({item}) =>
                <User
                    title={item.title}
                    image_url={item.image_url}
                />
            }
        />

    </View>
);

export default UserList;
