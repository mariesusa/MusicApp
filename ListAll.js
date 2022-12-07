import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, Image } from 'react-native';
import { ListItem } from'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from './Firebase'

export default function ListAll( { navigation } ) {

const [showConfirmation, setShowConfirmation] = useState(true);

const [records, setRecords] = useState([]);

useEffect(() => {
  const itemsRef = ref(database, 'records/');
  onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const records = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
      setRecords(records);
      console.log(records)
  });
}, []);

const showConfirmationDialog = (key) => {
  return Alert.alert(
    'Are you sure?',
    'Press delete if sure.',
    [
      {
        text: 'Delete',
        onPress: () => {
          setShowConfirmation(false);
          remove(
            ref(database, 'records/' + key),
          );
        },
      },
      {
        text: 'Cancel',
      },
    ]
  );
};

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

renderItem = ({ item }) => (
  <ListItem bottomDivider>
    <ListItem.Content>

      <View style={{ flex: 1, flexDirection: 'row' }}>
      <Image source={ require('./SmallCassette.jpg') } 
        style={{ 
          height: 125,
          width: 130,
          padding: 3,
          marginRight: 15,
          }}
          />
        <View style={{ flex: 10 }}>
          <ListItem.Title style={{ fontSize: 20 }}>{ item.artist }</ListItem.Title>
          <ListItem.Subtitle style={{ fontSize: 15 }}>{ item.album }</ListItem.Subtitle>
          <ListItem.Subtitle style={{ fontSize: 15 }}>{ item.year }</ListItem.Subtitle>
          <ListItem.Subtitle style={{ fontSize: 15, fontWeight: 'bold' }}>{ item.format }</ListItem.Subtitle>
          <ListItem.Subtitle style={{ fontSize: 15 }}>{ item.genre }</ListItem.Subtitle>
          <ListItem.Subtitle style={{ fontSize: 15 }}>{ item.condition }</ListItem.Subtitle>
          <ListItem.Subtitle style={{ fontSize: 15 }}>{ item.info }</ListItem.Subtitle>
        </View>
        
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: '110%' }}>
          <MaterialCommunityIcons 
            name='trash-can' 
            size={ 40 }
            onPress={() => showConfirmationDialog(item.key)} 
          />
          </View>

          <View style={{ flex: 2 }}>
          <MaterialCommunityIcons 
            name='clipboard-edit' 
            size={ 36 }
            onPress={() => {(navigation.navigate('Edit', { item } ));
            }}                                              
          />
          </View>

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
      backgroundColor: '#ECECEB',
      alignItems: 'center',
      paddingTop: 5,
      marginRight: 5,
    },
});