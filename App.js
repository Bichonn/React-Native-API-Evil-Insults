import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Accueil' }}/>
        <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: 'Liste des Insultes' }}/>
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Détail de l\'Insulte' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
