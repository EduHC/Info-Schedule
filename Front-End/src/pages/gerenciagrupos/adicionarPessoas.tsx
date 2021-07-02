import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, StatusBar, FlatList, Pressable, Modal } from "react-native";
import React, { useEffect, useState } from 'react';
import { IconButton, Colors } from 'react-native-paper'; //[Renald 01/04] importando icones e cores do material desing
import styles from './styles'
import api from "../../services/api";
import { transduce } from "ramda";
/**
  * [Renald 01/04] abaixo realmente começamos a implementanção da tela de home
  * utilizamos muito o conceito de html e css aqui as Views basicamente funcionam como <div>
  * Text como <h1> ou <p>, TextInput como <input>
  * entenda mais de style em react native em
  * @external https://reactnative.dev/docs/style
*/
export default function AdicionaPessoas({ route, navigation }: any) {
  const { grupo, idGrupo, otherParam } = route.params;
  const [users, setUsers] = React.useState([]);
  const [id, setId] = React.useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  let usersSelects = [];
  let countUsersSelected = id.length;
  console.log(idGrupo);
  console.log(id);


  React.useEffect(() => {
    api.get('/users').then(function (response) {
      // handle success
      //   console.log(response.data);
      setUsers(response.data);
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const Item = ({ item }: any) => (
    <TouchableOpacity style={[styles.item, { backgroundColor: id.includes(item.id_user) === true ? 'green' : 'white' }]} onPress={() => {
      //@ts-ignore
      if (!id.includes(item.id_user)) {
        //@ts-ignore
        setId(id => [...id, item.id_user]);
      } else {
        usersSelects = [...id];
        //@ts-ignore
        usersSelects.splice(usersSelects.indexOf(item.id_user), 1);
        setId(usersSelects);
      }
    }} >
      <Text style={[styles.descricao, { color: id.includes(item.id_user) === true ? 'white' : 'black' }]}>Nome Colaborador: {item.name}</Text>
    </TouchableOpacity>
  )

  async function adicionarPessoaAoGrupo() {
    const resp = await api.post('/groupsusers', {
      id_group: idGrupo,
      users: id,
    });

    if (resp.status === 200) {
      setModalVisible(true);
    }
  }
  return (
    <SafeAreaView style={styles.containerAdicionaPessoas}>
      <Text style={styles.tituloAdionaPessoas}>Grupo Selecionado: {grupo}</Text>
      <Text style={styles.tituloAdionatext}>Selecione os Funcionarios:</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id_user.toString()}
      />
      <View style={styles.boxItensSave}>
        <TouchableOpacity style={{ backgroundColor: 'green', padding: 15, borderRadius: 15, marginRight: 10 }}
          onPress={() => {
            adicionarPessoaAoGrupo();
          }}
        >
          <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Salvar</Text>
        </TouchableOpacity>
        <View style={styles.countUsers}>
          <Text style={{ fontSize: 35 }}>{countUsersSelected}</Text>
        </View>
      </View>
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
                  navigation.push('Criar Escala', {

                  })
                  setModalVisible(!modalVisible);

                }}
              >
                <Text style={styles.textStyle}>Pronto</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}
