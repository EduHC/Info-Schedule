import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, StatusBar } from "react-native";
import React, { useEffect, useState } from 'react';
import { IconButton, Colors } from 'react-native-paper'; //[Renald 01/04] importando icones e cores do material desing
import styles from './styles'
import ButtonMenu from "../../components/buttonsMenu/Buttons";
import api from "../../services/api";
import PerfilHome from "../../components/perfilHome";

/**
    * [Renald 01/04] abaixo realmente começamos a implementanção da tela de home
    * utilizamos muito o conceito de html e css aqui as Views basicamente funcionam como <div>
    * Text como <h1> ou <p>, TextInput como <input>
    * entenda mais de style em react native em
    * @external https://reactnative.dev/docs/style
*/
export default function Escalas({ route, navigation }: any) {
    return(
        <SafeAreaView style={styles.containerButtonGerenciador}>
          <Text style={styles.tituloPaginaGerenciamento}>Gerencie aqui as Escalas.</Text>
          <View style={styles.containerGroupMenu}>
            <ButtonMenu name="Criar um nova Escala" nameIcon="text-box-plus" onPress={() => { navigation.push('Criar Escala') }} />
            <ButtonMenu name="Visualizar Escala" nameIcon="text-box-search" onPress={() => { navigation.push('Visualizar Escalas') }} />
          </View>
        </SafeAreaView>
    )

   
}
