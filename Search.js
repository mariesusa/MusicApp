import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, Keyboard, Image } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Feather, Entypo } from "@expo/vector-icons";

import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from './Firebase'

export default function Search() {

const [records, setRecords] = useState([]);
const [searchPhrase, setSearchPhrase] = useState('');
const [clicked, setClicked] = useState(false);

useEffect(() => {
  const itemsRef = ref(database, 'records/');
  onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const records = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      setRecords(records);
      console.log(records)
  });
}, []);

const Item = ({ artist, album, year }) => (
    <View style={ styles.item }>
      <Text style={ styles.title }>{ artist }</Text>
      <Text style={ styles.details }>{ album }</Text>
      <Text style={ styles.details }>{ year }</Text>
    </View>
  );

const listSeparator = () => {
    return(
        <View
            style={{
                height: 5,
                width: '85%',
                backgroundColor: '#fff',
                marginLeft: '100%',
                padding: 2,
            }}
        />
    );
};

renderItem = ({ item }) => {
  if (searchPhrase === '') {
    return '';
    }
    if (item.artist.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))) {
      return <Item artist={ item.artist }
                  album={ item.album }
                  year={ item.year }
                  format={ item.formatValue }
                  condition={ item.conditionValue }
      />;
    }
    if (item.album.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))) {
      return <Item artist={ item.artist }
                  album={ item.album }
                  year={ item.year } 
                  format={ item.formatValue }
                  condition={ item.conditionValue }
      />;
    }
    if (item.year.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))) {
      return <Item artist={ item.artist }
                  album={ item.album }
                  year={ item.year }
                  format={ item.formatValue }
                  condition={ item.conditionValue }
      />;
    }
  };

return (

    <View style={ styles.container }>

        { <View style={{ flex: 2 }}>
          <Image source={ require('./ManyCassettes.jpg') } 
            style={{ 
              width: 500,
              height: 45 }}
          />
        </View> }

      <View style={{ height: 60 }} />

      <View>
        <View style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
            }
        >
        
        <Feather
          name='search'
          size={ 20 }
          color='black'
          style={{ marginLeft: 1 }}
        />

        <TextInput
          style={ styles.input }
          placeholder='Search'
          value={ searchPhrase }
          onChangeText={ setSearchPhrase }
          onFocus={() => {
          setClicked(true);
          }}
        />

        { clicked && (
          <Entypo 
            name='cross' 
            size={ 20 } 
            color='black' 
            style={{ padding: 1 }} 
            onPress={() => { setSearchPhrase('') }}
          />
        )}

      </View>

      { clicked && ( 
        <View style={{ alignItems: 'center' }}>

          <Button 
            style={ styles.button }
            titleStyle={{ fontWeight: '200'}}
            buttonStyle={{
              backgroundColor: '#000000',
              borderRadius: 10,
              marginTop: 15
            }}
            containerStyle={{ width: '60%' }}
            icon={{ name: 'cancel', color: '#fff' }}
            title='CANCEL'
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          />
        </View>
      )}
        </View>

      <Text style={{ marginTop: 10 }}></Text>

      <View
        style={ styles.list__container }
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >

      { !clicked && <Text style={ styles.searchText }>Type something in the text field</Text> }
      
      <FlatList
        data={ records }
        ItemSeparatorComponent={ listSeparator }
        renderItem={ renderItem }
        keyExtractor={ item => item.key }
      />
      
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ECECEB',
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 5,
      marginBottom: 60,
    },
    header: {
      fontSize: 20,
      textAlign: 'center',
    },
    text: {
      textAlign: 'center',
    },
    searchBar__unclicked: {
      padding: 10,
      flexDirection: 'row',
      width: '90%',
      backgroundColor: '#d9dbda',
      borderRadius: 15,
      alignItems: 'center',
    },
    searchBar__clicked: {
      padding: 10,
      flexDirection: 'row',
      width: '90%',
      backgroundColor: '#d9dbda',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    input: {
      fontSize: 15,
      marginLeft: 10,
      width: '90%',
    },
    item: {
      margin: 20,
      borderBottomWidth: 2,
      borderBottomColor: 'lightgrey',
    },
    title: {
      fontSize: 20,
      fontWeight: 'normal',
      marginBottom: 5,
    },
    details: {
      fontSize: 15,
    },
    root: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      alignItems: 'center',
    },
    searchText: {
      marginLeft: 32,
    },
});