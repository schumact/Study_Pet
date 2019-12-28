import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Layout from './Components/Layout/layout';
import styles from './Components/Misc/Styles';

export default class App extends Component {
  render() {
    return (
      // TODO create a layout component instead of just using App class
      <View style={styles.app}>
        <Layout>
            
        </Layout>
      </View>
      );
  }
}
