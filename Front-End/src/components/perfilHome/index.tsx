import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
}from "react-native";
import { IconButton } from "react-native-paper";

export default function PerfilHome(props:any) {
    return(
        <View style={{flexDirection:"row", alignItems: 'center', padding: 15}}>
            <View 
                style={styles.borderIcon}>
                    <IconButton style={{}}
                    icon={"account-circle-outline"}
                    color='#56449A'
                    size={50}
                />
            </View>
            <View style={styles.containerText}>
                <Text style={styles.textProfileName}>Olá {props.name}!</Text>
                <Text style={styles.textProfile}>Selecione uma opção</Text>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    borderIcon: {
        borderColor: "#56449A",
        borderWidth: 2,
        borderRadius: 50,
        alignContent: 'center',
        justifyContent: 'center',
    },
    containerText: {
        marginLeft: 15,
    },
    textProfileName:{
        fontSize: 25,
        color: '#56449A',
    },
    textProfile: {
        fontSize:18,
        color: '#56449A',
        marginTop: 10,
    }
  });