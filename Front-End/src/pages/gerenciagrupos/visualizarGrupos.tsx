import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, StatusBar, Button, Picker, Modal, Pressable, FlatList } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import React, { useEffect, useState } from 'react';
import styles from './styles'
import { TimePicker } from 'react-native-simple-time-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import api from "../../services/api";
import moment from "moment";

/**
    * [Renald 01/04] abaixo realmente começamos a implementanção da tela de home
    * utilizamos muito o conceito de html e css aqui as Views basicamente funcionam como <div>
    * Text como <h1> ou <p>, TextInput como <input>
    * entenda mais de style em react native em
    * @external https://reactnative.dev/docs/style
*/
export default function VisualizarGrupos({ route, navigation }: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleGroup, setModalVisibleGroup] = useState(false);
    const [group, setGroup] = React.useState([]);
    //const [groupsSelecteds, setGroupsSelected] = React.useState([]);
    const [funcionarios, setFuncionario] = React.useState([]);
    let usersSelects = [];

    React.useEffect(() => {
        api.get('/groups').then(function (response) {
            // handle success
            console.log(response.data.groups);
            setGroup(response.data.groups);
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, []);

    console.log(funcionarios);
    const Item = ({ item }: any) => (
        <TouchableOpacity style={[styles.item, { backgroundColor: 'white', flexDirection: 'row', height: 75, alignItems: 'center', justifyContent: 'space-between', marginTop: 45 }]} 
        onPress={() => {
            setFuncionario(item.users);
            setModalVisibleGroup(true);
        }} >
            <Text style={[styles.descricao, { color: 'black' }]}>Nome do grupo: {item.groupName}</Text>
            {/* <Text >Nome Colaborador: {item.id_group}</Text> */}
            <TouchableOpacity
                style={styles.containerImagem}>
                <Image
                    style={styles.imagem}
                    source={require("../../../assets/images/user.png")}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )

    const ItemF = ({ item }: any) => (
        <TouchableOpacity style={styles.item}
            onPress={() => {
            }}
        >
            <Text >Nome Colaborador: {item.name}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.containerButtonGerenciador}>
            <FlatList
                data={group}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => (item.id_group.toString())}
            />

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                Grupo Criado Com sucesso
                            </Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    navigation.push('Gerencia Grupos');
                                    setModalVisible(!modalVisible);

                                }}
                            >
                                <Text style={styles.textStyle}>Escala Gerada Com sucesso</Text>
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
                                Funcionarios Escalados
                            </Text>
                            <FlatList
                                data={funcionarios}
                                renderItem={({ item }) => <ItemF item={item} />}
                                keyExtractor={item => item.id_user.toString()}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisibleGroup(!modalVisibleGroup);
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
