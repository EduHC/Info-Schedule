import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f5f5f5',
        height: 120,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 15,
        position: 'relative',
        marginTop: 50,
      },
      title: {
        marginTop: 18,
        fontSize: 25,
        textAlign: 'center',
        color: 'white',
      },
      container :{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#56449A',
        paddingRight: 10,
        paddingLeft: 10,
        position: 'relative',
      },
      descricao: {
          marginTop: 10,
          fontSize: 15,
          fontWeight: 'bold',
      },
      imagem: {
          width: 50,
          height: 50,
      },
      containerImagem: {
        backgroundColor: '#f5f5f5',
        width: 80,
        height: 80,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -38,
        right: -15,
        zIndex: 10,

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
        borderColor: 'green',
        borderWidth: 3,
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
        color: 'black',
      },

});

export default styles;