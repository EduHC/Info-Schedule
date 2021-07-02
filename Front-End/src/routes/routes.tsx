import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle, StackNavigationProp } from '@react-navigation/stack'; //[Renald 01/04]  importando arquivos necessarios

/**[Renald 01/04] 
 * Devemos primeiro importar todas as nossas paginas para aplicação
 * com seu devido caminho
 */
import Login from '../pages/login';
import Home from '../pages/home';
import Usuario from '../pages/usuario';
import ListaUsuario from '../pages/listaUsuarios';
import Grupos from '../pages/gerenciagrupos';
import CriaGrupos from '../pages/gerenciagrupos/criarGrupo';
import AdicionaPessoas from '../pages/gerenciagrupos/adicionarPessoas';
import Escalas from '../pages/gerenciaEscalas';
import criarEscalas from '../pages/gerenciaEscalas/criarEscala';
import LinkaGrupoEscalas from '../pages/gerenciaEscalas/linkaGrupoEscala';
import VisualizarGrupos from '../pages/gerenciagrupos/visualizarGrupos';
import VisualizarEscala from '../pages/gerenciaEscalas/visualizarEscala';

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
          options={{
            headerShown: false //[Renald 01/04]  opition responvel por ocutar a appBar
          }} />
        <Stack.Screen name="Home" component={Home}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="Adicionar Usuario" component={Usuario}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen name="Lista Colaboradores" component={ListaUsuario}/>
        <Stack.Screen name="Gerencia Grupos" component={Grupos}/>
        <Stack.Screen name="Criar novo grupo" component={CriaGrupos}/>
        <Stack.Screen name="Adicionar pessoas ao grupo" component={AdicionaPessoas}/>
        <Stack.Screen name="Gerenciar Escalas" component={Escalas}/>
        <Stack.Screen name="Visualizar Escalas" component={VisualizarEscala}/>
        <Stack.Screen name="Criar Escala" component={criarEscalas}/>
        <Stack.Screen name="Adicionar Grupo a Escala" component={LinkaGrupoEscalas}/>
        <Stack.Screen name="Visualizar Grupo" component={VisualizarGrupos}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
