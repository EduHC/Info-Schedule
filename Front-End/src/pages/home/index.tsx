import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from 'react';
import { IconButton, Colors } from 'react-native-paper'; //[Renald 01/04] importando icones e cores do material desing
import styles from './styles'
import ButtonMenu from "../../components/buttonsMenu/Buttons";
/**
    * [Renald 01/04] abaixo realmente começamos a implementanção da tela de home
    * utilizamos muito o conceito de html e css aqui as Views basicamente funcionam como <div>
    * Text como <h1> ou <p>, TextInput como <input>
    * entenda mais de style em react native em
    * @external https://reactnative.dev/docs/style
*/

interface Help {
    props: any
    navigation: any
}
export default function Home({ route, navigation }) {
    const { token, otherParam } = route.params;
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'flex-start', padding: 10, backgroundColor:"#f5f5f5" }}>
            <View>
                <Text style={{marginTop: 10, textAlign: 'center',fontSize: 20, fontWeight: 'bold', color: '#56449A'}}>Organize agora facilmente suas escalas  de maneira rápida e prática</Text>
                <Image
                style={{height:480, width:400, marginTop: 10}}
                source={require("../../../assets/images/home.png")}
                />
            </View>
            <View style={{backgroundColor: 'white', height:150 }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                   

                >

                    <ButtonMenu name="Visualizar Usuários" nameIcon="account-search" onPress={() => { navigation.push('Lista Colaboradores') }} />
                    <ButtonMenu name="Adicionar Usuário" nameIcon="account-plus" onPress={() => { navigation.push('Adicionar Usuario') }} />
                    <ButtonMenu name="Remover Usuário" nameIcon="account-multiple-remove" onPress={() => { navigation.push('Lista Colaboradores') }} />

                    <ButtonMenu name="Visualizar Escalas" nameIcon="text-box-search" onPress={() => { navigation.push('Lista Colaboradores') }} />
                    <ButtonMenu name="Adicionar Escala" nameIcon="text-box-plus" onPress={() => { navigation.push('Lista Colaboradores') }} />
                    <ButtonMenu name="Remover Escala" nameIcon="text-box-minus" onPress={() => { navigation.push('Lista Colaboradores') }} />

                </ScrollView>
            </View>

        </SafeAreaView>
    );
}