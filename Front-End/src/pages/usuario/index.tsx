import { composeP } from "ramda";
import React, { useState } from "react";
import { View, Text, Pressable, Alert, Modal, Image, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import api from "../../services/api";
import styles from "./styles";


export default function Usuario({ route, navigation }: any) {
  const { idEmpresa, outros } = route.params;
  const [nome, onChangeNome] = React.useState("");
  const [login, onChangeLogin] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [empresa, onChangeEmpresa] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);

  let FuncionarioModal = {
    name: nome,
    login: login,
    password: password,
    id_owner: idEmpresa,
  };

  async function createUsuario() {
    const Funcionario = {
      name: nome,
      login: login,
      password: password,
      id_owner: idEmpresa,
    };

    await api
      .post("/users", {
        name: Funcionario.name,
        login: Funcionario.login,
        password: Funcionario.password,
        id_owner: Funcionario.id_owner,
      })
      .then(function (response) {
        console.log(response.data.id_user);
        FuncionarioModal.name = response.data.name;
        addProfile(response.data.id_user);
      })
      .catch(function (error) {
        console.log(error);
      });

    setModalVisible(true);
  }

  function addProfile(id_user: any) {
    const resp = api.post('/usersprofiles', {
      id_user: id_user,
      profiles: [2],
    }).then(function (resp) {

    });
  }

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.containerInfo}>
        <Text style={styles.info}>
          Preencha os dados do novo Colaborador no formulario abaixo.
        </Text>
      </View>
      <View style={styles.container}>

        <View style={styles.form}>
          <Text style={styles.h1}>Novo Colaborador</Text>
          <View style={styles.containerImage}>
            <Image
              style={styles.image}
              source={require("../../../assets/images/colaborador.png")}
            />
          </View>
          <TextInput
            mode="outlined"
            autoCompleteType="username"
            label="Nome Completo"
            style={styles.input}
            returnKeyType="next"
            placeholderTextColor="#56449A"
            onChangeText={text => onChangeNome(text)}
            value={nome}
          />

          <TextInput
            style={styles.input}
            autoCompleteType="username"
            mode="outlined"
            label="Login"
            returnKeyType="next"
            placeholderTextColor="#56449A"
            onChangeText={text => onChangeLogin(text)}
            value={login}
          />

          <TextInput
            style={styles.input}
            autoCompleteType="password"
            mode="outlined"
            label="Senha"
            returnKeyType="next"
            placeholderTextColor="#56449A"
            onChangeText={text => onChangePassword(text)}
            value={password}
          />

          <TouchableOpacity
            onPress={() => {
              createUsuario();
            }}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Cadastrar</Text>
          </TouchableOpacity>
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
                  Funcionario Cadastrado com sucesso!
                </Text>
                <Text style={styles.modalText}>
                  Nome: {FuncionarioModal.name}
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    onChangeNome('');
                    onChangePassword('');
                    onChangeLogin('');
                    navigation.navigate('Home');
                  }}
                >
                  <Text style={styles.textStyle}>Fechar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}
