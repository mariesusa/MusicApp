import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Home() {

return (
    <View style={ styles.container }>

        <Text>Text</Text>

    </View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    }
  });