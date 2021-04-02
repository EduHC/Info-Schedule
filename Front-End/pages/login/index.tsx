import React from 'react';
/**
 * [Renald 01/04]  importando components necessario para a pagina
 * entenda mais sobre components em
 * @external https://reactnative.dev/docs/components-and-apis
 */
import { View, Text, Button, StatusBar, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { IconButton, Colors } from 'react-native-paper'; //[Renald 01/04] importando icones e cores do material desing
import styles from './styles'; //[Renald 01/04]  importando pagina de estilo da pagina/tela
/**
 * [Renald 01/04] 
 * entenda mais sobre organização de css/estilos/styles do reative native em
 * @external https://blog.rocketseat.com.br/como-organizar-estilos-no-react-native/
 */

// [Renald 01/04] gerando uma interface para não o typeScript nao reclamar da variavel navigation
interface Navegacao {
    navigation : any;
}
//[Renald 01/04] abaixo apos o return começamos a nossa tela de login

export default function Login({ navigation }:Navegacao ) {
    /**
     * [Renald 01/04] useEffect responvel por esconder as informação da app como hora/dia/data/bateria
     * entenda mais sobre StatusBar.setHidden em
     * @external https://reactnative.dev/docs/statusbar#sethidden
     */
    React.useEffect(() => {
        StatusBar.setHidden(true); 
    });

    /**
     * [Renald 01/04] useStates para controlar algumas variaveis
     * entenda mais sobre useStates em 
     * @external https://pt-br.reactjs.org/docs/hooks-state.html#declaring-a-state-variable
     */
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(''); 
    const [showPassword, onChangeShow ] = React.useState(false);

    /**
     * [Renald 01/04] abaixo realmente começamos a implementanção da tela de login 
     * utilizamos muito o conceito de html e css aqui  as Views basicamente funcionam como <div>
     * Text com <h1> ou <p>, TextInput como <input>
     * entenda mais de style em react native em
     * @external https://reactnative.dev/docs/style
     */
    return ( 
       <View style={[styles.header]}>
           <Image source={ require("./img/bannerFundo.jpg")} blurRadius={10} />
            <View style={styles.container}>
                <View>
                    <Image 
                    blurRadius={0}
                    resizeMode='contain'
                    style={styles.imagem} 
                    source={ require("./img/logo.jpg") }
                    />
                </View>
                <View style={styles.icon}>
                    <IconButton 
                        onPress={() => {alert('This is a IconButton!')}} //[Renald 01/04] aqui colocamos um função para executar quando é pressionado o button/icon-button
                        icon = "account-circle-outline" /**[Renald 01/04] escolher o icone por nome do mesmo devemos pesquisar o nome dos icones em  @external https://materialdesignicons.com/*/
                        color = {Colors.white}
                        size = {30}
                    />
                    <TextInput style={styles.input} 
                        placeholder="Name"
                        placeholderTextColor='white'
                        onChangeText={onChangeText}
                    />
                </View>
                <View style={styles.icon}>
                    <IconButton 
                        onPress={() => {alert('This is a IconButton!')}}
                        icon = "lock"
                        color = {Colors.white}
                        size = {30}
                    />
                    <TextInput  style={styles.input}
                        placeholderTextColor='white'
                        onChangeText={onChangeText}
                        secureTextEntry={ showPassword === false ? true : false } //[Renald 01/04] usando if ternario para mostrar ou nao a senha baseado no useState
                        placeholder="Password"
                    />
                    <IconButton 
                        onPress={() => { showPassword == true ? onChangeShow(false) : onChangeShow(true) }} //[Renald 01/04] usando if ternario para mudar o valor do showPassword quando pressinado o button
                        icon = {showPassword == false ? "eye-off" : 'eye'}//[Renald 01/04]usando if ternario para alterar icone de mostrar ou nao  senha 
                        color = {Colors.white} 
                        size = {20}
                        style={ styles.eye }
                    />
                </View>
                <View>
                    {/**Abaixo criamos o button que tera a função futuramente de fazer a verificação de login e mandar para home 
                     * basicamente criamos o button colocamos uma função nele em onPress={() => {}} e dentro dele damos um nome 
                     * para o ficar dentro do button Text
                    */}
                    <TouchableOpacity onPress={() => {navigation.navigate('Home')}} style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>Sing In</Text>
                    </TouchableOpacity>
                </View>
                 {/**Abaixo criamos o button que tera a função futuramente de recuperar a senha
                  * do usuario
                */}
                <View style={styles.containerForgotPassword}>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.textpassword}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>         
            </View> 
        </View>
    );
} 


