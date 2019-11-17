import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function Oval() {
    return ( 
    <View style={oval_style}>

    </View>
    )
}

var oval_style = {
    width: '60%',
    height: '10%',
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffe6',
    transform: [
      {scaleX: 2}
    ]
}