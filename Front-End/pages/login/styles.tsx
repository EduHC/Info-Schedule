/**
 * [Renald 01/04] aqui estamos pegando as classes que criamos na pagina de login e 
 * aplicando "css" para as classes, o conceito aqui é basicamente o mesmoa da criação de classes no 
 * HTML e estilizando no arquivo CSS
 * entenda mais sobre em 
 * @external https://reactnative.dev/docs/stylesheet
 */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    header: {
        width: '100%',
        height: '100%',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        position: 'relative',
    },
    input: {
        fontSize: 30,
        width: 270,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        color: 'white',
    },

    appButtonContainer: {
        width: 270,
        borderRadius: 25,
        backgroundColor: '#56449A',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50, 

    },

    appButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },

    imagem: {
        borderRadius: 300,
        height: 230,
        width: 230,
        marginBottom: 50,
    },

    textpassword: {
        marginTop: 13,
        color: 'white',
        flexDirection: 'row',
        marginLeft: 23,
    },

    containerForgotPassword: {
        marginTop: 25,
        marginLeft: 165,
    },

    eye: {
        position: 'absolute',
        right: 0
    },

    imageFundoPageLogin : {
        resizeMode: 'contain',
    },

    textError: {
        color: 'red',
        textAlign: 'left',
    },
    divText : {
        justifyContent: 'flex-start',
        marginRight: 55,
        marginTop: 10,
    }


})

export default styles; // exportando o arquivo