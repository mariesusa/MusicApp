import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList } from 'react-native';

import { getDatabase, push, ref, onValue, remove, update } from 'firebase/database';
import database from './Firebase'

export default function Edit ({ route, navigation }) {
console.log( route );
const { item } = route.params;

const [artist, setArtist] = useState(item.artist);
const [album, setAlbum] = useState(item.album);
const [year, setYear] = useState(item.year);

const [formatOpen, setFormatOpen] = useState(false);
const [formatValue, setFormatValue] = useState(item.formatValue);
const [format, setFormat] = useState([
    { label: 'Vinyl', value: 'vinyl' },
    { label: 'CD', value: 'cd' },
    { label: 'Cassette', value: 'cassette' },
]);

const [genre, setGenre] = useState(item.genre);

const [conditionOpen, setConditionOpen] = useState(false);
const [conditionValue, setConditionValue] = useState(item.conditionValue);
const [condition, setCondition] = useState([
    { label: 'Mint', value: 'mint' },
    { label: 'Near Mint', value: 'nearMint' },
    { label: 'Very Good Plus', value: 'veryGoodPlus' },
    { label: 'Very Good', value: 'veryGood' },
    { label: 'Good', value: 'good' },
    { label: 'Fair', value: 'fair' },
]);

const [picture, setPicture] = useState(item.picture);
const [info, setInfo] = useState(item.info);

const albumKey = item.key

const updateRecord = () => {
    update(
        ref(database, 'records/' + albumKey),
        { 'artist': artist, 'album': album, 'year': year, 'format': formatValue, 'genre': genre, 'condition': conditionValue, 'picture': picture, 'info': info }
    );
}

return (
    <View style={ styles.container }>

        <Text style={{marginTop: 10}}></Text>

        <Input
            label='Artist'
            placeholder={ item.artist }
            onChangeText={ artist => setArtist(artist) } 
        />

        <Input
            label='Album'
            placeholder={ item.album }
            onChangeText={ album => setAlbum(album) }
        />

        <Input
            label='Year'
            placeholder={ item.year }
            onChangeText={ year => setYear(year) }
        />

        <DropDownPicker
            closeAfterSelecting={ true }
            open={ formatOpen }
            value={ formatValue }
                items={ format }
                setOpen={ setFormatOpen }
                setValue={ setFormatValue }
                setItems={ setFormat }
                onChangeValue={ (formatValue) => setFormatValue(formatValue) }
        />
        
        <Text style={{marginTop: 10}}></Text>

        <Input
            label='Genre'
            placeholder={ item.genre }
            onChangeText={ genre => setGenre(genre) }
        />

        <DropDownPicker
            open={ conditionOpen }
            value={ conditionValue }
                items={ condition }
                setOpen={ setConditionOpen }
                setValue={ setConditionValue }
                setItems={ setCondition }
                onChangeValue={ (conditionValue) => setConditionValue(conditionValue) }
        />

        <Text style={{marginTop: 10}}></Text>
        
        <Input
            label='Picture'
            placeholder={ item.picture }
            onChangeText={ picture => setPicture(picture) }
        />

        <Input
            label='Info'
            placeholder={ item.info }
            onChangeText={ info => setInfo(info) }
        />

        <Button
            raised
            titleStyle={{ fontWeight: '200' }}
            buttonStyle={{
                backgroundColor: '#000000',
                borderRadius: 10,
            }}
            containerStyle={{ width: '60%' }}
                icon={{ name: 'save', color: '#fff' }}
                title='UPDATE'
                onPress={() => updateRecord()}
        />
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