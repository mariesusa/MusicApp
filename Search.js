import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, Keyboard, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ListItem } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather, Entypo } from "@expo/vector-icons";

import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from './Firebase'

export default function Search() {

const [records, setRecords] = useState([]);
const [searchPhrase, setSearchPhrase] = useState("");
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

const Item = ({ artist, album }) => (
    <View style={ styles.item }>
      <Text style={ styles.title }>{ artist }</Text>
      <Text style={ styles.details }>{ album }</Text>
    </View>
  );

const listSeparator = () => {
    return(
        <View
            style={{
                height: 5,
                width: '80%',
                backgroundColor: '#fff',
                marginLeft: '80%'
            }}
        />
    );
};

renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item artist={ item.artist }
             Item album={ item.album } />;
    }
    // filter of the name
    if (item.artist.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item artist={ item.artist } />;
    }
    // filter of the description
    if (item.album.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item album={item.album} />;
    }
  };

return (

    <View style={ styles.container }>
        <Text style={ styles.header }>
        Search and destroy
        </Text>

        <View>
            <View style={
                clicked
                    ? styles.searchBar__clicked
                    : styles.searchBar__unclicked
                }
            >
        <Feather
            name="search"
            size={20}
            color="black"
            style={{ marginLeft: 1 }}
        />
        <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
            setClicked(true);
            }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
            }}/>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            
            titleStyle={{ fontWeight: '200'}}
            title="CANCEL"
            buttonStyle={{
                backgroundColor: '#000000',
                borderRadius: 10,
                marginTop: 15
            }}
            containerStyle={{ width: '60%' }}
                icon={{ name: 'cancel', color: '#fff' }}
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
        </View>

        <Text style={{marginTop: 10}}></Text>

        <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
    >

      {!clicked && <Text style={styles.title}>Results</Text>}
      

        <FlatList
          data={ records }
          ItemSeparatorComponent={ listSeparator }
          renderItem={ renderItem }
          keyExtractor={ item => item.key }
        />
      </View>
    </SafeAreaView>

    </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: '20%'
    },
    header: {
        fontSize: 35,
        textAlign: 'center'
    },
    text: {
        textAlign: 'center'
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
    item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
      },
      root: {
        justifyContent: "center",
        alignItems: "center",
      },
});