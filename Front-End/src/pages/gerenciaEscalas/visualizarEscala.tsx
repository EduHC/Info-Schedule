import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, StatusBar, FlatList, Pressable, Modal } from "react-native";
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


export default function VisualizarEscala({ route, navigation }: any) {

    const [escala, setEscala] = React.useState([]);
    const [dadosGrupo, setDadosGrupo] = React.useState([]);
    const [usuarios, setUsuarios] = React.useState([]);
    const [data, setData] = React.useState("");
    const [modalVisibleGroup, setModalVisibleGroup] = useState(false);
    const [modalVisibleGroupDayEscala, setModalVisibleGroupDayEscala] = useState(false);


    React.useEffect(() => {
        api.get('/workschedules').then(function (response) {
            // handle success

            console.log(response);

            //console.log(response.data.workschedules);
            //console.log(response.data.workschedules[1].groups);
            setEscala(response.data.workschedules);
        })
            .catch(function (error) {
                // handle errorf
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, []);

    const Item = ({ item }: any) => (
        <TouchableOpacity style={[styles.item]} onPress={() => {
            //@ts-ignore
            setDadosGrupo(item.groups)
            console.log(item.groups);
            setData(item.date);
            setModalVisibleGroup(true);
        }} >
            <Text style={[styles.descricao]}>Data da Escala: {item.date}</Text>

        </TouchableOpacity>
    )

    const ItemF = ({ item }: any) => (
        <TouchableOpacity style={styles.itemDadosGrupo}
            onPress={() => {
                setModalVisibleGroupDayEscala(true);
                setUsuarios(item.users);
            }}

        >
            <Text>Data da escala do grupo: {data}</Text>
            <Text >Hora Inicio: {item.start_hour}</Text>
            <Text >Hora Fim: {item.end_hour}</Text>
            <Text >Nome Grupo: {item.groupName}</Text>
            <Text >ID Grupo: {item.id_group}</Text>
        </TouchableOpacity>
    )

    const ItemA = ({ item }: any) => (
        <TouchableOpacity style={styles.itemDadosGrupo}
            onPress={() => {

            }}

        >
            <Text>Nome Colaborador: {item.name}</Text>
        </TouchableOpacity>
    )
    //console.log(dadosGrupo);
    return (
        <SafeAreaView style={styles.containerButtonGerenciador}>
            <FlatList
                data={escala}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id_workschedule.toString()}
            />



            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleGroupDayEscala}
                    onRequestClose={() => {
                        setModalVisibleGroupDayEscala(!modalVisibleGroupDayEscala);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Colaboradores Escalados neste grupo
                            </Text>
                            <FlatList
                                data={usuarios}
                                renderItem={({ item }) => <ItemA item={item} />}
                                keyExtractor={item => item.id_user.toString()}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {

                                }}
                            >
                                <Text style={styles.textStyle}>Editar Grupo</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisibleGroupDayEscala(false);
                                }}
                            >
                                <Text style={styles.textStyle}>Fechar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleGroup}
                    onRequestClose={() => {
                        setModalVisibleGroup(!modalVisibleGroup);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Dados do grupo
                            </Text>
                            <FlatList
                                data={dadosGrupo}
                                renderItem={({ item }) => <ItemF item={item} />}
                                keyExtractor={item => item.id_group.toString()}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {

                                }}
                            >
                                <Text style={styles.textStyle}>Editar Grupo</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisibleGroup(false);
                                }}
                            >
                                <Text style={styles.textStyle}>Fechar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>

        </SafeAreaView>
    )


}
