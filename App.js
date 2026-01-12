import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const Projects = [
  {
    id: 1,
    title: 'Pot de fleurs',
    description: 'un petit pot de fleurs bleu rond',
    use: 'décoration',
    budget: 15,
  },
  {
    id: 2,
    title: 'Support téléphone',
    description: 'un support téléphone en bois',
    use: 'commercial',
    budget: 45,
  },
  {
    id: 3,
    title: 'Maquette maison',
    description: 'une maquette de maison pour projet 3D',
    use: 'pédagogique',
    budget: 30,
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to</Text>
      <Text style={styles.Title}>Modelify</Text>
      <FlatList
        data={Projects} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <View style={styles.ElementlistProject}>
            <Text style={styles.ProjectTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.use}</Text>
            <Text>{item.budget} €</Text>
          </View>
        )} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    marginTop: 30,
    fontSize: 32,
    fontWeight: 'bold',
  },
  listProject: {
    marginTop: 30,
    width: '80%',
  },
  ElementlistProject: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  ProjectTitle: {
    fontWeight: 'bold',
  },


});
