import React from 'react'
import { View, Text, Button, StatusBar, ImageBackground, StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components/native';


const  styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    header: { 
        width: '100%',
        height: '100%',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        position: 'relative',
    },
    input: {
        fontSize: 30,
        width: 270,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        color: 'white',
    },

    appButtonContainer: {
        width: 270,
        borderRadius: 25,
        backgroundColor: '#56449A',
        height: 50,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 50,

    },

    appButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },

    imagem: {
        borderRadius: 250,
        height: 250,
        width: 250,
        marginBottom: 50,
    },

    textpassword: {
        marginTop: 13,
        color: 'white',
        flexDirection: 'row',
        marginLeft: 23,
    },

    containerForgotPassword: {
        marginTop: 25,
        marginLeft: 165,
    },

    eye : {
        position: 'absolute',
        right: 0
    }


})

export default styles;