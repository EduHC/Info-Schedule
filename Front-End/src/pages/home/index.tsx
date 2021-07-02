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

interface Help {
    props: any
    navigation: any
}
export default function Home({ route, navigation }: any) {
    const { token, otherParam } = route.params;
    const [gestor, onChangeGenGestor] = React.useState(false);
    const [load, onChangeLoad] = React.useState(true);
    const [colab, onChangecolab] = React.useState(false);
    var nomeUser;
    var idEmpresa: any;

    function decodeToken() {
        var jwtDecode = require('jwt-decode');
        var decode = jwtDecode(token);
        var idUser = decode.payload.id_user;
        nomeUser = decode.payload.name;
        getProfile(idUser);
        idEmpresa = decode.payload.id_owner;
    }

    decodeToken()
    // setTimeout(function(){
    // },3000)

    async function getProfile(id: any) {
        const resp = await api.get(`/usersprofiles/${id}`);
        var profile = resp.data[0].id_profile.name;
        if (profile === "Gestor") {
            onChangeGenGestor(true);
            onChangeLoad(false)
        } else {
            onChangecolab(true);
            onChangeLoad(false)
        }
    }

    if (gestor) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'flex-start', padding: 10, backgroundColor: "", borderRadius: 20 }}>
                <View style={styles.containerPerfil}>
                    <View style={styles.containerImagem}>
                        <Image
                            blurRadius={0}
                            resizeMode='contain'
                            style={styles.imagem}
                            source={require("./img/logo2.jpg")}
                        />
                    </View>
                    <PerfilHome name={nomeUser} />

                    <ScrollView>
                        <View style={styles.menu}>
                            <ButtonMenu name="Adicionar Usuário" nameIcon="account-plus" onPress={() => { navigation.navigate('Adicionar Usuario', { idEmpresa: idEmpresa, outros: 'pegando o id' }) }} />
                            <ButtonMenu name="Gerenciar Grupos" nameIcon="account-group" onPress={() => { navigation.push('Gerencia Grupos') }} />
                            <ButtonMenu name="Visualizar Usuários" nameIcon="account-search" onPress={() => { navigation.push('Lista Colaboradores') }} />
                            <ButtonMenu name="Gerenciar Escalas" nameIcon="text-box-search" onPress={() => { navigation.push('Gerenciar Escalas') }} />
                        </View>
                    </ScrollView>

                </View>

            </SafeAreaView>
        );

    } else if (load) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={{ uri: 'https://media.giphy.com/media/3o6UB4zAURoccSY000/giphy.gif' }}
                    style={{ width: "100%", height: "100%" }}
                />
            </View>
        )
    } else if (colab) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'flex-start', padding: 10, backgroundColor: "", borderRadius: 20 }}>
                <View style={styles.containerPerfil}>
                    <View style={styles.containerImagem}>
                        <Image
                            blurRadius={0}
                            resizeMode='contain'
                            style={styles.imagem}
                            source={require("./img/logo2.jpg")}
                        />
                    </View>
                    <PerfilHome name={nomeUser} />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: '100%', }}
                            source={require("../../../assets/images/team.png")}
                        />
                    </View>
                </View>

                <View style={styles.buttons}>
                    <Text style={{ fontSize: 14, color: "#56449A", margin: 5 }}>Deslize para direita para ver mais opções...</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <ButtonMenu name="Visualizar Escalas" nameIcon="text-box-search" onPress={() => { navigation.push('Lista Colaboradores') }} />
                        <ButtonMenu name="Cartão Ponto" nameIcon="alarm" onPress={() => { navigation.push('Lista Colaboradores') }} />
                        <ButtonMenu name="Notificações" nameIcon="bell-ring" onPress={() => { navigation.push('Lista Colaboradores') }} />

                    </ScrollView>
                </View>

            </SafeAreaView>
        );
    }
}