import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ListItem } from'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from './Firebase'

export default function ListAll( { navigation } ) {

const [records, setRecords] = useState([]);

useEffect(() => {
  const itemsRef = ref(database, 'records/');
  onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const records = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];  
      setRecords(records);
  });
}, []);

const deleteProduct = (key) => {
  remove(
    ref(database, 'records/' + key),
  )
}

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

renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 10 }}>
        <ListItem.Title>{ item.artist }</ListItem.Title>
        <ListItem.Subtitle>{ item.album }</ListItem.Subtitle>
        <ListItem.Subtitle>{ item.year }</ListItem.Subtitle>
        </View>
        <View style={{ flex: 1 }}>
        <MaterialCommunityIcons name='trash-can' size={ 30 }
              onPress={() => deleteProduct(item.key)} />
          </View>
        <View style={{ flex: 1 }}>
        <MaterialCommunityIcons name='clipboard-edit' size={ 30 }
              onPress={(key) => navigation.navigate('Edit', { 
                                                Screen: 'Edit',
                                                //params: { item: item.key }
                                              })}
        />
          </View>
        </View>
      </ListItem.Content>
    </ListItem>
  )

return (
   
    <View style={ styles.container }>

        <FlatList
            data={ records }
            ItemSeparatorComponent={ listSeparator }
            renderItem={ renderItem }
            keyExtractor={ item => item.key }
        />

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