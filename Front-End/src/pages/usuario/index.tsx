import React, { useState } from "react";
import { View, Text, Pressable, Alert, Modal, Image, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import api from "../../services/api";
import styles from "./styles";

interface Help {
  props: any;
  navigation: any;
}

export default function Usuario(props: Help) {
  const [nome, onChangeNome] = React.useState("");
  const [login, onChangeLogin] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [empresa, onChangeEmpresa] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);

  let FuncionarioModal = {
    name: nome,
    login: login,
    password: password,
    id_owner: 1,
  };

  function createUsuario() {
    const Funcionario = {
      name: nome,
      login: login,
      password: password,
      id_owner: 1,
    };

    api
      .post("/users", {
        name: Funcionario.name,
        login: Funcionario.login,
        password: Funcionario.password,
        id_owner: Funcionario.id_owner,
      })
      .then(function (response) {
        console.log(response.data.user.name);
        FuncionarioModal.name = response.data.user.name;
      })
      .catch(function (error) {
        console.log(error);
      });

    setModalVisible(true);
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
            value= {nome}
          />

          <TextInput
            style={styles.input}
            autoCompleteType="username"
            mode="outlined"
            label="Login"
            returnKeyType="next"
            placeholderTextColor="#56449A"
            onChangeText={text => onChangeLogin(text)}
            value= {login}
          />

          <TextInput
            style={styles.input}
            autoCompleteType="password"
            mode="outlined"
            label="Senha"
            returnKeyType="next"
            placeholderTextColor="#56449A"
            onChangeText={text => onChangePassword(text)}
            value= {password}
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
              Alert.alert("Modal has been closed.");
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
