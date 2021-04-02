import React from "react";
import { View, Text } from "react-native";

 /**
     * [Renald 01/04] abaixo realmente começamos a implementanção da tela de home
     * utilizamos muito o conceito de html e css aqui as Views basicamente funcionam como <div>
     * Text como <h1> ou <p>, TextInput como <input>
     * entenda mais de style em react native em
     * @external https://reactnative.dev/docs/style
     */
export default function Home() {
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Bem Vindo a Home</Text>
        </View>
    );
}