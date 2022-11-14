import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Home() {

  return (
    <View style={ styles.container }>

      <Text style={{ fontSize: 35 }}>
        Music App
      </Text>
      <Text>
        save your musics here
      </Text>

    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
;