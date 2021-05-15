import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        width: '100%',
        borderBottomColor: '#56449A',
        color: '#56449A',
        marginTop: 15,
        padding: 10,
    },

    container: {
        flex: 1,
        backgroundColor: '#56449A',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 10,
    },

    form: {
        display: 'flex',
        backgroundColor: '#f5f5f5',
        flexGrow: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        position: 'relative',
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
        marginTop: 250,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
        textAlign: "center",
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'left',
      },
      info: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10
      },
      containerInfo: {
        padding: 10,
        marginTop: 20,
      },
      image: {
        width: 50,
        height: 50,
      },
      containerImage: {
        backgroundColor: '#f5f5f5',
        width: 80,
        height: 80,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -30,
        right: -15,
        zIndex: 10

      }
});

export default styles; // exportando o arquivo
