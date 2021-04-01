import React from 'react';
import { View, Text, Button, StatusBar, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import styles from './styles';


interface Navegacao {
    navigation : any;
}

export default function Login({ navigation }:Navegacao ) {
    React.useEffect(() => {
        StatusBar.setHidden(true); 
    });
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(''); 
    const [showPassword, onChangeShow ] = React.useState(false);
    return ( 
       <View style={[styles.header,]}>
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
                        onPress={() => {alert('This is a IconButton!')}}
                        icon = "account-circle-outline"
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
                        secureTextEntry={ showPassword === false ? true : false }
                        placeholder="Password"
                        
                    />
                    <IconButton 
                        onPress={() => { showPassword == true ? onChangeShow(false) : onChangeShow(true) }}
                        icon = {showPassword == false ? "eye-off" : 'eye'}
                        color = {Colors.white} 
                        size = {20}
                        style={ styles.eye }
                    />
                     
                </View>
                <View>
                    <TouchableOpacity onPress={() => {navigation.navigate('Home')}} style={styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>Sing In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerForgotPassword}>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.textpassword}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>         
            </View> 
        </View>
    );
} 


