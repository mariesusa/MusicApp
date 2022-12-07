import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { VictoryBar, VictoryChart } from 'victory-native';

import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from './Firebase'

export default function Home() {

  const [length, setLength] = useState(0);
  const [cdLength, setCdLength] = useState(0);
  const [cassetteLength, setCassetteLength] = useState(0);
  const [vinylLength, setVinylLength] = useState(0);

  useEffect(() => {
    const itemsRef = ref(database, 'records/');
    onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        const records = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : []; 
        const length = records.length;

        const cassettes = records.filter((item) => item.format == 'Cassette').map(({ format }) => ({ format }));
        const cassetteLength = cassettes.length;

        const cds = records.filter((item) => item.format == 'Cd').map(({ format }) => ({ format }));
        const cdLength = cds.length;

        const vinyls = records.filter((item) => item.format == 'Vinyl').map(({ format }) => ({ format }));
        const vinylLength = vinyls.length;

        setLength(length)
        setCassetteLength(cassetteLength)
        setCdLength(cdLength)
        setVinylLength(vinylLength)

        });
}, []);

return (
  <View style={ styles.container }>
    <Text>
      <HomeClass 
        hookValue1={ length }
        hookValue2={ cdLength }
        hookValue3={ cassetteLength }
        hookValue4={ vinylLength }
        >
      </HomeClass>
    </Text>
  </View>
  )
}

class HomeClass extends React.Component {
  
  render() {

    const length = this.props.hookValue1;
    const cds = this.props.hookValue2;
    const cassettes = this.props.hookValue3;
    const vinyls = this.props.hookValue4;
    
    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>
          Music App
        </Text>
        <Text style={ styles.text1 }>
        – save your musics here –
        </Text>

        <VictoryChart
          domainPadding={{ x: 15 }}
        >
          <VictoryBar
            barRatio={0.5}
              padding={{ left: 80, right: 80, top: 40 }}
                alignment='middle'
                  data={[
                    { format: 'Cassettes', number: cassettes },
                    { format: 'CDs', number: cds },
                    { format: 'Vinyls', number: vinyls }
                    ]}
                  x='format'
                  y='number'
          />
        </VictoryChart>
          
            {<View style={{ flex: 2 }}>
            <Image source={ require('./Cassette.jpg') } 
              style={{ 
                width: 400,
                height: 200 }}
            />
            </View>}

          <Text style={ styles.text2 }>
            Number of saved records: 
          </Text>
          <Text style={ styles.header }>
            { length }
          </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEB',
    alignItems: 'center',
    padding: 5,
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    padding: 5,
  },
  text1: {
    fontSize: 20,
    textAlign: 'center',
    padding: 3,
  },
  text2: {
    fontSize: 24,
    textAlign: 'center',
    padding: 3,
    marginTop: 8,
  },
});

