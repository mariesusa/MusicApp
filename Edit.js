import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import DropDownPicker from 'react-native-dropdown-picker';

import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import database from './Firebase'

export default function Edit ({ route, navigation }) {
    console.log( route );
const { records } = route.params;

const [formatOpen, setFormatOpen] = useState(false);
const [formatValue, setFormatValue] = useState(null);
const [format, setFormat] = useState([
    { label: 'Vinyl', value: 'vinyl' },
    { label: 'CD', value: 'cd' },
    { label: 'Cassette', value: 'cassette' },
]);

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

return (
    <View style={ styles.container }>
        
        <Text style={{marginTop: 10}}></Text>

        <Input
            label='Artist'
        />

        <Input
            label='Album'
        />

        <Input
            label='Year'
        />

        <DropDownPicker
            open={ formatOpen }
            value={ formatValue }
                items={ format }
                setOpen={ setFormatOpen }
                setValue={ setFormatValue }
                setItems={ setFormat }
                placeholder='Select format'   
        />
        
        <Text style={{marginTop: 10}}></Text>

        <Input
            label='Genre'
        />

        <DropDownPicker
            open={ conditionOpen }
            value={ conditionValue }
                items={ condition }
                setOpen={ setConditionOpen }
                setValue={ setConditionValue }
                setItems={ setCondition }
                placeholder='Select condition'   
        />

        <Text style={{marginTop: 10}}></Text>
        
        <Input
            label='Picture'
        />

        <Input
            label='Info'
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