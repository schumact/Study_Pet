import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function NavBar() {
  return (
      <View style={styles.Nav}>
          {/* TODO use username from account*/}
          <Text style={styles.Greeting}> Welcome Back USERNAME HERE</Text>
      </View>
  )
};

const styles = StyleSheet.create({
    Nav: {
        fontWeight: 'bold',
        backgroundColor: "#1e90ff",
        height: 100,
        paddingTop: 50
    },
    Greeting: {
        color: 'white',
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 25
    }
});
