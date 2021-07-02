import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
}from "react-native";
import { IconButton } from "react-native-paper";

export default function ButtonMenu(props:any) {
    return(
        <TouchableOpacity onPress={props.onPress} style={styles.buttonsPageHomeContainer}>
            <IconButton style={styles.buttonIconPageHome}
                icon={props.nameIcon}
                color='white'
                size={40}
            />
            <Text style={styles.textButtonsPageHome}>{props.name}</Text>
        </TouchableOpacity>
    );

}


const styles = StyleSheet.create({
    homeContainer: {
      backgroundColor: "#f5f5f5",
      flex: 1,
    },
  
    homeOptionButtonsContainer: {
        alignSelf: 'stretch'
    },
  
    buttonsPageHomeContainer: {
      backgroundColor: "#56449A",
      borderRadius: 6,
      borderColor: '#ccc',
      alignItems: "center",
      justifyContent: "center",
      width:163,
      height:150,
      marginRight: 15,
      marginBottom: 15,
      elevation: 1,
    },
    textButtonsPageHome: {
      color: "white",
      fontSize: 20,
      padding: 7,
      textAlign: "center",
    },
    titlePageHomeContainer: {
      flexDirection: "row",
      alignItems: 'center'
    },
    titlePageHomeText: {
      fontSize: 20,
    },
  
    titleSectionPageHome: {
        fontSize: 20,
        marginTop: 20
    },
    buttonIconPageHome: {
      margin: 0,
      padding: 0,
    },
  });