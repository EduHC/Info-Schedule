import React from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle, StackNavigationProp } from '@react-navigation/stack'; //[Renald 01/04]  importando arquivos necessarios

/**[Renald 01/04] 
 * Devemos primeiro importar todas as nossas paginas para aplicação
 * com seu devido caminho
 */
import Login from '../pages/login';
import Home from '../pages/home';
import Usuario from '../pages/usuario';
import { Text } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
const Stack = createStackNavigator();

/**[Renald 01/04] -  Configurando as Rotas/Pages da aplicação
 * Entenda mais sobre Navegação/Rotas em
 *@external https://reactnavigation.org/docs/hello-react-navigation/  
*/
export default function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}  //[Renald 01/04] Usando o Stack.Screen para adicionar o nome para app bar a a pagina que ira ser exibidaPagina
            options={ { headerShown: false //[Renald 01/04]  opition responvel por ocutar a appBar
            } }/>
          <Stack.Screen name="Home" component={Home}
            options={{ headerShown: true }}
          />
          <Stack.Screen name="Adicionar Usuario" component={Usuario}
            options={{ 
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  