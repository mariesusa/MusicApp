import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

import { getDatabase, push, ref, onValue, remove, update } from 'firebase/database';
import database from './Firebase'

export default function Edit ({ route, navigation }) {
console.log( route );
const { item } = route.params;

const [showConfirmation, setShowConfirmation] = useState(true);

const [artist, setArtist] = useState(item.artist);
const [album, setAlbum] = useState(item.album);
const [year, setYear] = useState(item.year);

const [formatOpen, setFormatOpen] = useState(false);
const [formatValue, setFormatValue] = useState(item.formatValue);
const [format, setFormat] = useState([
    { label: 'Vinyl', value: 'Vinyl' },
    { label: 'CD', value: 'Cd' },
    { label: 'Cassette', value: 'Cassette' },
]);

const [genre, setGenre] = useState(item.genre);

const [conditionOpen, setConditionOpen] = useState(false);
const [conditionValue, setConditionValue] = useState(item.conditionValue);
const [condition, setCondition] = useState([
    { label: 'Mint', value: 'Mint' },
    { label: 'Near Mint', value: 'Near Mint' },
    { label: 'Very Good Plus', value: 'Very Good Plus' },
    { label: 'Very Good', value: 'Very Good' },
    { label: 'Good', value: 'Good' },
    { label: 'Fair', value: 'Fair' },
]);

const [picture, setPicture] = useState(item.picture);
const [info, setInfo] = useState(item.info);

const albumKey = item.key

const showConfirmationDialog = () => {
    return Alert.alert(
        'Are you sure?',
        'Press yes if sure',
        [
            {
                text: 'Yes',
                onPress: () => {
                    if (formatValue === '') {
                        setFormatValue(item.formatValue)
                    }
                    if (conditionValue === '') {
                        setConditionValue(item.conditionValue)
                    }
                    setShowConfirmation(false);
                    update(
                        ref(database, 'records/' + albumKey),
                        { 'artist': artist, 'album': album, 'year': year, 'format': formatValue, 'genre': genre, 'condition': conditionValue, 'picture': picture, 'info': info }
                    );
                },
            },
            {
                text: 'No',
            },
        ]
    );
};

return (

    <KeyboardAvoidingView style={ styles.container } enabled>
        <View style={{ width: '100%' , marginTop: 10 }}>

            <Input
                style={ styles.input }
                labelStyle={ styles.label }
                label='Artist'
                placeholder={ item.artist }
                onChangeText={ artist => setArtist(artist) } 
            />

            <Input
                    style={ styles.input }
                labelStyle={ styles.label }
                label='Album'
                placeholder={ item.album }
                onChangeText={ album => setAlbum(album) }
            />

            <Input
                style={ styles.input }
                labelStyle={ styles.label }
                label='Year'
                placeholder={ item.year }
                onChangeText={ year => setYear(year) }
                keyboardType='number-pad'
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
                style={ styles.input }
                labelStyle={ styles.label }
                label='Genre'
                placeholder={ item.genre }
                onChangeText={ genre => setGenre(genre) }
            />

            <DropDownPicker
                closeAfterSelecting={ true }
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
                style={ styles.input }
                labelStyle={ styles.label }
                label='Picture'
                placeholder={ item.picture }
                onChangeText={ picture => setPicture(picture) }
            />

            <Input
                style={ styles.input }
                labelStyle={ styles.label }
                label='Info'
                placeholder={ item.info }
                onChangeText={ info => setInfo(info) }
            />

        </View>

            <Button
                style={ styles.button }
                titleStyle={{ fontWeight: '200' }}
                buttonStyle={{
                    backgroundColor: '#000000',
                    borderRadius: 10,
                }}
                containerStyle={{ width: '60%' }}
                icon={{ name: 'save', color: '#fff' }}
                title='UPDATE'
                onPress={() => showConfirmationDialog()}
            />

    </KeyboardAvoidingView>
    
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ECECEB',
      alignItems: 'center',
      padding: 5,
    },
    input: {
        fontSize: 15
    },
    label: {
        fontSize: 20,
        fontWeight: 'normal',
        color: 'black'
    },
    button: {
        alignItems: 'center'
    }
});