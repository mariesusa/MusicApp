import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, Image } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import DropDownPicker from 'react-native-dropdown-picker';

import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from './Firebase'

export default function AddNew() {

const [showConfirmation, setShowConfirmation] = useState(true);

const [artist, setArtist] = useState('');
const [album, setAlbum] = useState('');
const [year, setYear] = useState('');

const [formatOpen, setFormatOpen] = useState(false);
const [formatValue, setFormatValue] = useState(null);
const [format, setFormat] = useState([
    { label: 'Vinyl', value: 'Vinyl' },
    { label: 'CD', value: 'Cd' },
    { label: 'Cassette', value: 'Cassette' },
]);

const [genre, setGenre] = useState('');

const [conditionOpen, setConditionOpen] = useState(false);
const [conditionValue, setConditionValue] = useState(null);
const [condition, setCondition] = useState([
    { label: 'Mint', value: 'Mint' },
    { label: 'Near Mint', value: 'Near Mint' },
    { label: 'Very Good Plus', value: 'Very Good Plus' },
    { label: 'Very Good', value: 'Very Good' },
    { label: 'Good', value: 'Good' },
    { label: 'Fair', value: 'Fair' },
]);

const [info, setInfo] = useState('');

const showConfirmationDialog = () => {
    return Alert.alert(
        'Are you sure?',
        'Press yes if sure.',
        [
            {
                text: 'Yes',
                onPress: () => {
                    setShowConfirmation(false);
                    push(
                        ref(database, 'records/'),
                        { 'artist': artist, 'album': album, 'year': year, 'format': formatValue, 'genre': genre, 'condition': conditionValue, 'info': info }
                    );
                    setArtist('');
                    setAlbum('');
                    setYear('');
                    setFormatValue(null);
                    setGenre('');
                    setConditionValue(null);
                    setInfo('');
                },
            },
            {
                text: 'No',
            },
        ]
    );
};

return (

    <View style={ styles.container }>
        <ScrollView 
            automaticallyAdjustKeyboardInsets={ true }>

        { <View style={{ flex: 2 }}>
            <Image source={ require('./ManyCassettes.jpg') } 
              style={{ 
                width: 500,
                height: 45 }}
            />
        </View> }
        
        <View style={{ height: 50 }} />
        <View style={{ width: '100%' }}>

            <Input
                style={ styles.input }
                labelStyle={ styles.label }
                placeholder='Artist name' 
                label='Artist' 
                onChangeText={ artist => setArtist(artist) }
                value={ artist }
                />

            <Input
                style={ styles.input }
                labelStyle={ styles.label }
                placeholder='Album name' label='Album'
                onChangeText={ album => setAlbum(album) }
                value={ album }
            />

            <Input
                style={ styles.input }
                labelStyle={ styles.label }
                placeholder='Publication year' label='Year'
                onChangeText={ year => setYear(year) }
                value={ year }
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
                placeholder='Select format'   
            />
        
            <Text style={{ marginTop: 10 }}></Text>

            <Input
                style={ styles.input }
                labelStyle={ styles.label }
                placeholder='Genre' label='Genre'
                onChangeText={ genre => setGenre(genre) }
                value={ genre }
            />

            <DropDownPicker
                closeAfterSelecting={ true }
                open={ conditionOpen }
                value={ conditionValue }
                items={ condition }
                setOpen={ setConditionOpen }
                setValue={ setConditionValue }
                setItems={ setCondition }
                onChangeValue={ (conditionValue) => setConditionValue(conditionValue)}
                placeholder='Select condition'   
            />

            <Text style={{ marginTop: 10 }}></Text>

            <Input
                style={ styles.input }
                labelStyle={ styles.label }
                placeholder='Additional information' label='Info'
                onChangeText={ info => setInfo(info) }
                value={ info }
            />
    
        </View>
        
        { showConfirmation && <View style={ styles.box }></View> }

            <Button
                style={ styles.button }
                titleStyle={{ fontWeight: '200' }}
                buttonStyle={{
                    backgroundColor: '#000000',
                    borderRadius: 10,
                    marginBottom: 20,
                }}
                containerStyle={{ width: '60%' }}
                icon={{ name: 'save', color: '#fff' }}
                onPress={() => showConfirmationDialog() }
                title='SAVE'
            />
 
        <View style={{ height: 30 }} />

        { <View style={{ flex: 2 }}>
            <Image source={ require('./ManyCassettes.jpg') } 
              style={{ 
                width: 500,
                height: 45 }}
            />
         
        </View> }
        
    </ScrollView>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ECECEB',
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 5,
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
        alignItems: 'center',
        marginBottom: 10,
    },
});