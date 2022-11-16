import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryBar, VictoryChart } from 'victory-native';

import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from './Firebase'

const data = [
  {quarter: 1, earnings: 1},
  {quarter: 2, earnings: 2},
  {quarter: 3, earnings: 3}
];

export default class Home extends React.Component {
  
  render() {
    return (
      <View styles={ styles.container }>
          <Text style={ styles.header }>
            Music App
          </Text>
          <Text style={ styles.text }>
            save your musics here
          </Text>

        <VictoryChart>
          <VictoryBar
            padding={{ left: 80, right: 80, top: 40 }}
            alignment='middle'
            domainPadding={{ x: 15 }}
              categories={{
                x: ['Cassettes', 'CDs', 'Vinyls']
              }}
          data={ data }
          // data accessor for x values
          x="quarter"
          // data accessor for y values
          y="earnings"
        />
        </VictoryChart>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center'
  },
  text: {
    textAlign: 'center'
  }
});

