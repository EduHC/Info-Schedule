/**
 * [Renald 01/04] aqui estamos pegando as classes que criamos na pagina de home e
 * aplicando "css" para as classes, o conceito aqui é basicamente o mesmoa da criação de classes no
 * HTML e estilizando no arquivo CSS
 * entenda mais sobre em
 * @external https://reactnative.dev/docs/stylesheet
 */

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    flex: 1,
  },

  homeOptionButtonsContainer: {
      alignSelf: 'stretch'
  },
  containerPerfil :{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 2,
    borderRadius: 5,
    borderBottomColor: '#ccc',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  menu:{
    padding: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  
  buttons : {
    height: 200,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginTop: 5,

  },
  buttonsPageHomeContainer: {
    backgroundColor: "#56449A",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    marginTop: 10,
    marginRight: 10,
  },
  containerImagem :{
    flexDirection: 'row',
    width: "100%",
    backgroundColor: "#56449A",
  },
  imagem: {
    height: 150,
    width: "100%",
  },
  textButtonsPageHome: {
    color: "white",
    fontSize: 20,
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
});

export default styles;
