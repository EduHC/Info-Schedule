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

  buttonsPageHomeContainer: {
    backgroundColor: "#56449A",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    marginTop: 10,
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
