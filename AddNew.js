import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, ImagePickerIOS } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import DropDownPicker from 'react-native-dropdown-picker';

import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from './Firebase'

export default function AddNew() {

/*let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
}*/

const [artist, setArtist] = useState('');
const [album, setAlbum] = useState('');
const [year, setYear] = useState('');

const [formatOpen, setFormatOpen] = useState(false);
const [formatValue, setFormatValue] = useState(null);
const [format, setFormat] = useState([
    { label: 'Vinyl', value: 'vinyl' },
    { label: 'CD', value: 'cd' },
    { label: 'Cassette', value: 'cassette' },
]);

const [genre, setGenre] = useState('');

const [conditionOpen, setConditionOpen] = useState(false);
const [conditionValue, setConditionValue] = useState(null);
const [condition, setCondition] = useState([
    { label: 'Mint', value: 'mint' },
    { label: 'Near Mint', value: 'nearMint' },
    { label: 'Very Good Plus', value: 'veryGoodPlus' },
    { label: 'Very Good', value: 'veryGood' },
    { label: 'Good', value: 'good' },
    { label: 'Fair', value: 'fair' },
]);

const [picture, setPicture] = useState('');
const [info, setInfo] = useState('');

const [records, setRecords] = useState([]);

const saveRecord = () => {
    push(
        ref(database, 'records/'),
        { 'artist': artist, 'album': album, 'year': year, 'format': formatValue, 'genre': genre, 'condition': conditionValue, 'picture': picture, 'info': info }
    );
}

return (
    <View style={ styles.container }>

        <Input
            placeholder='Artist name' label='Artist'
            onChangeText={ artist => setArtist(artist) }
            value={ artist }
        />

        <Input
            placeholder='Album name' label='Album'
            onChangeText={ album => setAlbum(album) }
            value={ album }
        />

        <Input
            placeholder='Publication year' label='Year'
            onChangeText={ year => setYear(year) }
            value={ year }
        />

        <DropDownPicker
            open={ formatOpen }
            value={ formatValue }
                items={ format }
                setOpen={ setFormatOpen }
                setValue={ setFormatValue }
                setItems={ setFormat }
                onChangeValue={ (formatValue) => setFormatValue(formatValue) }
                placeholder='Select format'   
        />
        
        <Text style={{marginTop: 10}}></Text>

        <Input
            placeholder='Genre' label='Genre'
            onChangeText={ genre => setGenre(genre) }
            value={ genre }
        />

        <DropDownPicker
            open={ conditionOpen }
            value={ conditionValue }
                items={ condition }
                setOpen={ setConditionOpen }
                setValue={ setConditionValue }
                setItems={ setCondition }
                onChangeValue={ (conditionValue) => setConditionValue(conditionValue)}
                placeholder='Select condition'   
        />

        <Text style={{marginTop: 10}}></Text>
        
        <Input
            placeholder='Picture URL' label='Picture'
            onChangeText={ picture => setPicture(picture) }
            value={ picture }
        />

        <Input
            placeholder='Additional information' label='Info'
            onChangeText={ info => setInfo(info) }
            value={ info }
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
                onPress={ saveRecord }
                title='SAVE'
        />

    </View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    }
});