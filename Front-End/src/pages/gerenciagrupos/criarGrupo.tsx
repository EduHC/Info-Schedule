import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, StatusBar, Button, Picker, Modal, Pressable } from "react-native";
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
export default function CriaGrupos({ route, navigation }: any) {
    const [date, setDate] = useState(new Date(1598051730000));
    const [dataEscolhida, setDataEscolhida] = useState("");
    const [hoursI, setHoursI] = React.useState("00");
    const [minutesI, setMinutesI] = React.useState("00");
    const [modalVisible, setModalVisible] = useState(false);

    const [hoursF, setHoursF] = React.useState("00");
    const [minutesF, setMinutesF] = React.useState("00");

    const [nome, onChangeNome] = React.useState("");
    const [noidGrupome, setidGrupo] = React.useState();
    let id = 0;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        formataData(currentDate);
    };

    function formataData(date: any) {
        moment.locale('en');
        var dataFormatada = moment(date).format('DD-MM-YYYY');
        setDataEscolhida(dataFormatada);
    }

    let horaInicio = `${hoursI}:${minutesI}:00`;
    let horaFim = `${hoursF}:${minutesF}:00`;

    function criaGrupo() {

        const Grupo = {
            id_owner: 1,
            name: nome,
            start_hour: horaInicio,
            end_hour: horaFim,
        }

        return Grupo;
        console.log(Grupo);

    }

    function limpaCampo() {
        setHoursI('00');
        setHoursF('00');
        setMinutesI('00');
        setMinutesF('00');
        setMinutesF('00');
        onChangeNome('');
    }

    function enviar() {
        console.log('enviando');
        let grupo = criaGrupo()
        api
            .post("/groups", {
                id_owner: grupo.id_owner,
                name: grupo.name,
                start_hour: grupo.start_hour,
                end_hour: grupo.end_hour,
            })
            .then(function (response: any) {
                let deuCerto = response.data.message;
                //console.log(response.data.group.id_group);
                setidGrupo(response.data.group.id_group);
                console.log(response.data);
                if (deuCerto === 'grupo criado') {
                    setModalVisible(true);
                }

            })
            .catch(function (error: any) {
                console.log(error);
            });

        }   
        console.log(noidGrupome);
    return (
        <SafeAreaView style={styles.container}>
            {/* <DatePicker 
                format="DD/MM/YYYY"
                style={styles.dateComponent}
                date={date}
                onDateChange={onChange}
            /> */}
            <View style={styles.containerGroup}>
                <Text style={styles.fonteText}>Escolha o nome do grupo</Text>
                <TextInput
                    mode="outlined"
                    autoCompleteType="username"
                    label="Nome do grupo"
                    style={styles.input}
                    returnKeyType="next"
                    placeholderTextColor="#56449A"
                    onChangeText={text => onChangeNome(text)}
                    value={nome}
                />
                <Text style={styles.fonteText}>Escolha a hora inicial para o grupo</Text>

                <View style={styles.hora}>
                    <TextInput
                        mode="outlined"
                        autoCompleteType="username"
                        label="00"
                        maxLength={2}
                        style={styles.inputHora}
                        keyboardType="numeric"
                        returnKeyType="next"
                        placeholderTextColor="#56449A"
                        onChangeText={text => setHoursI(text)}
                        value={hoursI}

                    />

                    <Text style={styles.fonteText}>:</Text>

                    <TextInput
                        mode="outlined"
                        keyboardType="numeric"
                        autoCompleteType="username"
                        label="00"
                        maxLength={2}
                        style={styles.inputHora}
                        returnKeyType="next"
                        placeholderTextColor="#56449A"
                        onChangeText={text => setMinutesI(text)}
                        value={minutesI}

                    />
                </View>

                <Text style={styles.fonteText}>Escolha a hora final para o grupo</Text>

                <View style={styles.hora}>
                    <TextInput
                        mode="outlined"
                        autoCompleteType="username"
                        label="00"
                        maxLength={2}
                        style={styles.inputHora}
                        keyboardType="numeric"
                        returnKeyType="next"
                        placeholderTextColor="#56449A"
                        onChangeText={text => setHoursF(text)}
                        value={hoursF}

                    />

                    <Text style={styles.fonteText}>:</Text>

                    <TextInput
                        mode="outlined"
                        keyboardType="numeric"
                        autoCompleteType="username"
                        label="00"
                        maxLength={2}
                        style={styles.inputHora}
                        returnKeyType="next"
                        placeholderTextColor="#56449A"
                        onChangeText={text => setMinutesF(text)}
                        value={minutesF}

                    />
                </View>

                <TouchableOpacity onPress={enviar} style={styles.buttonsPageHomeContainer}>
                    <IconButton style={styles.buttonIconPageHome}
                        icon="content-save-move"
                        color='white'
                        size={40}
                    />
                    <Text style={styles.textButtonsPageHome}>Salvar</Text>
                </TouchableOpacity>


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
                                <Text style={styles.modalText}>
                                </Text>
                                <Text style={styles.modalText}>
                                    Nome do grupo: {nome}
                                </Text>
                                <Text style={styles.modalText}>
                                    Hora inicial: {horaInicio}
                                </Text>
                                <Text style={styles.modalText}>
                                    Hora Fim: {horaFim}
                                </Text>

                                <Text style={styles.adicionarPesssoasText}>
                                    Deseja adicional pessoas nesse grupo?
                                </Text>

                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        navigation.push('Adicionar pessoas ao grupo', {
                                            grupo: nome,
                                            idGrupo: noidGrupome,
                                            otherParam: 'anything you want here',
                                        })
                                        setModalVisible(!modalVisible);

                                    }}
                                >
                                    <Text style={styles.textStyle}>Sim</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);

                                    }}
                                >
                                    <Text style={styles.textStyle}>Criar outro grupo</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </SafeAreaView>
    )


}
