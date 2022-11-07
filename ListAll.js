import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ListItem } from'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ListAll( { route, navigation }) {
    console.log( route );

const { records: records } = route.params;

useEffect(() => { listAll(records); }, []);

const listSeparator = () => {
    return(
        <View
            style={{
                height: 5,
                width: '80%',
                backgroundColor: '#fff',
                marginLeft: '10%'
            }}
        />
    );
};

const listAll = ({ records }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 10 }}>
        <ListItem.Title>{ records[0].artist }</ListItem.Title>
        <ListItem.Subtitle>{ records[0].album }</ListItem.Subtitle>
        </View>
        <View style={{ flex: 1 }}>
        <MaterialCommunityIcons name="md-trash-bin" size={ 30 }
              onPress={() => deleteProduct(item.key)} />
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