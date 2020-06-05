import React from 'react';
import{
    View,
    Text
} from 'react-native';
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.body}>
                <Text>Screen Chat</Text>
            </View>
        );
    }
}
