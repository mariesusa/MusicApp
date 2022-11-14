import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ReactDOM from 'react';
import { VictoryBar } from 'victory';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

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

/*class Home extends React.Component {
  render() {
    return (
      <View styles={ styles.container }>
          <Text style={{ fontSize: 35 }}>
            Music App
          </Text>
          <Text>
            save your musics here
          </Text>

          <VictoryBar
          data={ data }
          // data accessor for x values
          x="quarter"
          // data accessor for y values
          y="earnings"
        />
      </View>
    )
  }
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

//ReactDOM.render(<Home />, mountNode);

//export default Home;

