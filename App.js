import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
import CollectionScreen from './screens/CollectionScreen';

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
        <Stack.Screen name="CollectionScreen" component={CollectionScreen} options={{ title: 'Ma Collection', headerBackVisible: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
