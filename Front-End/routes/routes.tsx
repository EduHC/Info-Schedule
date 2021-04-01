import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { IconButton, Colors } from 'react-native-paper';

import Login from '../pages/login';
import Home from '../pages/home';  

function MyButton(){
    return (
      <View style={{flexDirection: "row"}}>
        <IconButton 
        onPress={() => {alert('This is a IconButton!')}}
        icon = "camera"
        color = {Colors.white}
        size = {30}
        ></IconButton>

        <IconButton 
        onPress={() => {alert('This is sa IconButton!')}}
        icon = "book"
        color = {Colors.white}
        size = {30}
        > </IconButton> 

        <IconButton 
        onPress={() => {alert('This is sa IconButton!')}}
        icon = "bug"
        color = {Colors.white}
        size = {30}
        > </IconButton> 
      </View>
     ); 
};

const Stack = createStackNavigator();

export default function Routes() {
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} 
            options={ { headerShown: false,
            title: 'Teste',
            headerStyle : { backgroundColor : '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'},
            headerRight: () => ( MyButton() )  } }/>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  