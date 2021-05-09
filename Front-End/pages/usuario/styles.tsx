import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        width: 270,
        borderBottomColor: '#56449A',
        color: '#56449A',
        marginTop: 15,
        padding: 10,

    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#56449A',
    },

    form: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 20
    },
    h1: {
        color:'#56449A',
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    appButtonContainer: {
        width: 270,
        borderRadius: 25,
        backgroundColor: '#56449A',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28, 

    },

    appButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

export default styles; // exportando o arquivo
