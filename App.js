import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
import FavorisScreen from './screens/FavorisScreen';
import MesInsultesScreen from './screens/MesInsultesScreen';

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#34495e',
          },
          headerTintColor: '#ecf0f1',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Accueil' }}/>
        <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: 'Liste des Insultes', headerBackVisible: false }}/>
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Détail de l\'Insulte', headerBackVisible: false }}/>
        <Stack.Screen name="FavorisScreen" component={FavorisScreen} options={{ title: 'Mes Favoris', headerBackVisible: false }}/>
        <Stack.Screen name="MesInsultesScreen" component={MesInsultesScreen} options={{ title: 'Mes Insultes', headerBackVisible: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
