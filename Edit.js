import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from './Firebase'

export default function Edit ({ route, navigation }) {
    console.log( route );
//const { item } = route.params;

return (
    <View style={ styles.container }>
        <Text>
            Show things here
        </Text>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    }
});