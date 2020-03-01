import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native';
import StitchLogin from './src/Components/StitchLogin';
import { StitchAuthProvider, useStitchAuth } from "./src/Components/StitchAuth";
import Goals from './src/Components/Goals';
import DashBoard from "./src/Components/Dashboard";
// import TodoApp from "./src/Components/TodoApp";


export default function App() {
  return (
      <View style={{flex:1}}>
          <StitchAuthProvider>
              <AppUI/>
          </StitchAuthProvider>
      </View>
  );
}

AppUI.propTypes = {};

function AppUI() {
  const {
    isLoggedIn,
    actions: { handleLogout },
  } = useStitchAuth();
  return (
      <View style={styles.container}>
          {isLoggedIn && <Button onPress={handleLogout} title="Logout"/>}
          {/* Todo fit that image of the pet in here.*/}
          {isLoggedIn ? <DashBoard/> : <StitchLogin />}
      </View>
  );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor : "blue",
        fontWeight: 30,
        borderRadius: 5
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    Login: {
        flex: 1,
        backgroundColor: 'red'
    }
});

