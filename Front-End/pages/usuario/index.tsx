import { set } from 'ramda';
import React, { useState }  from 'react'
import { View, Text, Pressable, Alert, Modal } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper'
import api from '../../services/api';
import styles from './styles';



export default function Usuario(props) {

  const [nome, onChangeNome] = React.useState('');
  const [login, onChangeLogin] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const [empresa, onChangeEmpresa] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);

  let FuncionarioModal = {
    name: nome,
    login:login,
    password: password,
    email: email,
    phone: phone,
    id_owner: 1,
  }

  function createUsuario() {

   const Funcionario = {
      name: nome,
      login:login,
      password: password,
      email: email,
      phone: phone,
      id_owner: 1,
    }

    api.post('/users',{
      name: Funcionario.name,
      login:Funcionario.login,
      password: Funcionario.password,
      email: Funcionario.email,
      phone: Funcionario.phone,
      id_owner: Funcionario.id_owner,
    }).then(function (response) {
      console.log(response.data);
      FuncionarioModal.name  = '';
      FuncionarioModal.login = '';
      FuncionarioModal.email = '';


    })
    .catch(function (error) {
      console.log(error);
    });

    setModalVisible(true)

  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.h1}>Preencha o Formulario a abaixo</Text>
        <TextInput
          mode = 'outlined'
          autoCompleteType = 'username'
          label = "Nome Completo"
          style={styles.input}
          returnKeyType = 'next'
          placeholderTextColor = '#56449A'
          onChangeText={onChangeNome}
        />

        <TextInput
          style={styles.input}
          autoCompleteType = 'username'
          mode = 'outlined'
          label = "Login"
          returnKeyType = 'next'
          placeholderTextColor = '#56449A'
          onChangeText={onChangeLogin}
        />

        <TextInput
          style={styles.input}
          autoCompleteType = 'password'
          mode = 'outlined'
          label = "Senha"
          returnKeyType = 'next'
          placeholderTextColor = '#56449A'
          onChangeText={onChangePassword}
        />

        <TextInput
          style={styles.input}
          mode = 'outlined'
          autoCompleteType = 'email'
          keyboardType = 'email-address'
          label = "Email"
          returnKeyType = 'next'
          placeholderTextColor = '#56449A'
          onChangeText={onChangeEmail}
        />
  
        <TextInput
          style={styles.input}
          mode = 'outlined'
          autoCompleteType = 'tel'
          keyboardType = 'numeric'
          returnKeyType = 'next'
          label = "Telefone"
          placeholderTextColor = '#56449A'
          onChangeText={onChangePhone}
        />
         <TouchableOpacity onPress={() => {
            createUsuario();
          }} style={styles.appButtonContainer}>
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
            <Text style={styles.modalText}>Funcionario Cadastrado com sucesso</Text>
            <Text style={styles.modalText}>Nome: {FuncionarioModal.name}</Text>
            <Text style={styles.modalText}>Login: {FuncionarioModal.login}</Text>
            <Text style={styles.modalText}>Email: { FuncionarioModal.email}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                props.navigation.push('Adicionar Usuario');
              }
              }
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    
    </View>

    
  )
}