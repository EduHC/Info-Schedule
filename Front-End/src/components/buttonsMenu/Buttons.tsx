import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
}from "react-native";
import { IconButton } from "react-native-paper";

export default function ButtonMenu(props) {
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
      padding: 10,
      flex: 1,
    },
  
    homeOptionButtonsContainer: {
        alignSelf: 'stretch'
    },
  
    buttonsPageHomeContainer: {
      backgroundColor: "#56449A",
      borderRadius: 6,
      alignItems: "center",
      justifyContent: "center",
      height: 130,
      width:180,
      marginTop: 10,
      marginRight: 10
    },
    textButtonsPageHome: {
      color: "white",
      fontSize: 20,
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