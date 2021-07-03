import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, StatusBar, Pressable, Modal } from "react-native";
import React, { useEffect, useState } from 'react';
import { IconButton, Colors } from 'react-native-paper'; //[Renald 01/04] importando icones e cores do material desing
import styles from './styles'
import ButtonMenu from "../../components/buttonsMenu/Buttons";
import DatePicker from 'react-native-datepicker';
import api from "../../services/api";
import PerfilHome from "../../components/perfilHome";
import moment from "moment";

/**
    * [Renald 01/04] abaixo realmente começamos a implementanção da tela de home
    * utilizamos muito o conceito de html e css aqui as Views basicamente funcionam como <div>
    * Text como <h1> ou <p>, TextInput como <input>
    * entenda mais de style em react native em
    * @external https://reactnative.dev/docs/style
*/
export default function criarEscalas({ route, navigation }: any) {
    const [date, setDate] = useState(new Date(1598051730000));
    const [dataEscolhida, setDataEscolhida] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [id_workshedule, setId_workshedule ] = useState("");



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        formataData(currentDate);
    };
    function formataData(date: any) {
        moment.locale('en');
        var dataFormatada = moment(date).format('YYYY-MM-DD');
        setDataEscolhida(dataFormatada);
    }
    async function criarEscala() {
        const resp = await api.post('/workschedules', {
          id_owner: 2,
          date: dataEscolhida,
        });
        
        if (resp.status === 201 || resp.status === 200) {
            setId_workshedule(resp.data.workschedule.id_workschedule);
            setModalVisible(true);
        }

      }

      console.log(id_workshedule);
    return (
        <SafeAreaView style={styles.containerButtonGerenciador}>
            <Text style={{ color: 'white', fontSize: 25, marginBottom: 10 }}>Selecione uma data</Text>
            <DatePicker
                format="DD/MM/YYYY"
                style={styles.dateComponent}
                date={date}
                onDateChange={onChange}
            ></DatePicker>
            <TouchableOpacity onPress={() => { criarEscala() }} style={{ height: 50, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', width: 150, borderRadius: 10, marginTop: 15 }}>
                <Text style={{ color: 'white', fontSize: 20, }}>Criar Escala</Text>
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
                                Escala criada com sucesso
                            </Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    console.log(id_workshedule + '  id da escala gerada');
                                    navigation.push('Adicionar Grupo a Escala', {
                                        idEscala: id_workshedule
                                    })
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Adicionar um grupo nessa escala</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )


}
