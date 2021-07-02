/**
 * [Renald 01/04] aqui estamos pegando as classes que criamos na pagina de home e
 * aplicando "css" para as classes, o conceito aqui é basicamente o mesmoa da criação de classes no
 * HTML e estilizando no arquivo CSS
 * entenda mais sobre em
 * @external https://reactnative.dev/docs/stylesheet
 */

import { StyleSheet } from "react-native";
import { black, white } from "react-native-paper/lib/typescript/styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#56449A',
    alignItems: 'center',
    padding: 10,
  },
  containerButtonGerenciador: {
    flex: 1,
    backgroundColor: '#56449A',
    padding: 10,
  },
  tituloPaginaGerenciamento: {
    color: "white",
    marginTop: 10,
    marginBottom: 20,
    fontSize:20
  },
  dateComponent: {
    width: 350,
    backgroundColor: 'white',
    fontSize: 50,
  },
  timer:{
    backgroundColor: '#56449A',
  },
  fonteText: {
    fontSize: 20,
  },
  input: {
    fontSize: 18,
    width: '100%',
    borderBottomColor: '#56449A',
    color: '#56449A',
    borderColor: '#56449A',
    marginTop: 15,
    padding: 10,
  },
  itemDadosGrupo: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#56449A',
    borderWidth: 3,
    padding: 5,
    borderRadius: 5,
    
  },
  hora: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHora: {
    fontSize: 18,
    width: '20%',
    borderBottomColor: '#56449A',
    color: '#56449A',
    borderColor: '#56449A',
    marginTop: 15,
    padding: 5,
    textAlign: 'center',
  },
  pickerComponet: {
    width: 200,
  },


  homeContainer: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },

  homeOptionButtonsContainer: {
      alignSelf: 'stretch'
  },

  buttonsPageHomeContainer: {
    backgroundColor: "#56449A",
    borderRadius: 6,
    borderColor: '#ccc',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height:80,
    marginBottom: 15,
    marginTop: 15,
    elevation: 1,
  },
  textButtonsPageHome: {
    color: "white",
    fontSize: 20,
    padding: 7,
    textAlign: "center",
  },
  titlePageHomeContainer: {
    flexDirection: "row",
    alignItems: 'center'
  },
  titlePageHomeText: {
    fontSize: 20,
  },

  titleSectionPageHome: {
      fontSize: 20,
      marginTop: 20
  },
  buttonIconPageHome: {
    margin: 0,
    padding: 0,
  },

  item: {
    backgroundColor: '#f5f5f5',
    height: 50,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 15,
    position: 'relative',
  },
  title: {
    marginTop: 18,
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
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
    width: 70,
    height: 70,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,

  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: 400,
    height: 500,
    marginTop: 0,
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
    elevation: 2,
    marginTop: 10
  },
  adicionarPesssoasText : {
    fontSize: 18,
    fontWeight: 'bold'
  },
  tituloAdionatext: {
    fontSize: 15,
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
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

  containerAdicionaPessoas: {
    padding: 10,
    backgroundColor: "#56449A",
    flex: 1,

  },
  tituloAdionaPessoas: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },

  boxItensSave: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 90,
  },

  countUsers: {
    backgroundColor: '#f5f5f5',
    fontSize: 50,
    padding: 9,
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerGroup: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },

  containerGroupMenu: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    borderRadius: 10,
    paddingLeft: 25,
  },

});

export default styles;
