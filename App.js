import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Login from './Components/Login/Login';
import styles from './Components/Misc/Styles';

export default class App extends Component {
  render() {
    return (
      // TODO create a layout component instead of just using App class
      <View style={styles.root_flex}>
        <Login></Login>
      </View>
      );
  }
}
