import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { IconButton, Colors } from 'react-native-paper'; //[Renald 01/04] importando icones e cores do material desing

import styles from './styles'

/**
    * [Renald 01/04] abaixo realmente começamos a implementanção da tela de home
    * utilizamos muito o conceito de html e css aqui as Views basicamente funcionam como <div>
    * Text como <h1> ou <p>, TextInput como <input>
    * entenda mais de style em react native em
    * @external https://reactnative.dev/docs/style
*/
export default function Home() {
    return (
        <View style={styles.homeContainer}>
            <View style={styles.titlePageHomeContainer}>
                <IconButton
                    icon='desktop-mac-dashboard'
                    color='black'
                />
                <Text style={styles.titlePageHomeText}>Menu administrativo</Text>
            </View>
        
            {/** 
             * [Renald 02/04] Utilizando o ScrollView  no container do botton para
             * habilitar o rolamento da tela 
             * ententa mais em 
             * @external  https://reactnative.dev/docs/scrollview
            */}
            <ScrollView>
                <View style={styles.homeOptionButtonsContainer}>
                    <Text style={styles.titleSectionPageHome}>Gerenciamento de Escalas</Text>
                    {/** [Renald 02/04] Utilizando o TouchableOpacity como button e estilando ele para 
                     * se adequar a largura total da telac
                     * o mesmo esta esperando uma função que futuramente ira levar para outras telas da aplicação
                     * entenda mais sobre o Touch
                     * @external https://reactnative.dev/docs/touchableopacity
                     */}
                    <TouchableOpacity onPress={() => { }} style={styles.buttonsPageHomeContainer}>
                        <IconButton style={styles.buttonIconPageHome}
                            icon="text-box-search"
                            color='white'
                            size={40}
                        />
                        <Text style={styles.textButtonsPageHome}>Visualizar Escala</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={styles.buttonsPageHomeContainer}>
                        <IconButton style={styles.buttonIconPageHome}
                            icon="text-box-plus"
                            color='white'
                            size={40}
                        />
                        <Text style={styles.textButtonsPageHome}>Adicionar Escala</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={styles.buttonsPageHomeContainer}>
                        <IconButton style={styles.buttonIconPageHome}
                            icon="text-box-minus"
                            color='white'
                            size={40}
                        />
                        <Text style={styles.textButtonsPageHome}>Remover Escala</Text>
                    </TouchableOpacity>

                    <Text style={styles.titleSectionPageHome}>Gerenciamento de Usuários</Text>
                    <TouchableOpacity onPress={() => { }} style={styles.buttonsPageHomeContainer}>
                        <IconButton style={styles.buttonIconPageHome}
                            icon="account-search"
                            color='white'
                            size={40}

                        />
                        <Text style={styles.textButtonsPageHome}>Visualizar Usuario</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={styles.buttonsPageHomeContainer}>
                        <IconButton style={styles.buttonIconPageHome}
                            icon="account-plus"
                            color='white'
                            size={40}

                        />
                        <Text style={styles.textButtonsPageHome}>Adicionar Usuário</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={styles.buttonsPageHomeContainer}>
                        <IconButton style={styles.buttonIconPageHome}
                            icon="account-multiple-remove"
                            color='white'
                            size={40}

                        />
                        <Text style={styles.textButtonsPageHome}>Remover Usuário</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    );
}