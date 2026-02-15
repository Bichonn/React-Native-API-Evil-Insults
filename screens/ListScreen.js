import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import fetchRandomInsult from '../services/api';
import CustomButton from '../components/CustomButton';

export default function ListScreen({ navigation }) {
  const [insults, setInsults] = useState([]);
  const [randomInsult, setRandomInsult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const promises = Array(5).fill().map(() => fetchRandomInsult());
      const results = await Promise.all(promises);
      const validInsults = results.filter(item => item !== null);
      setInsults(validInsults);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const generateInsult = async () => {
    const newInsult = await fetchRandomInsult();
    if (newInsult) {
      setRandomInsult(newInsult);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <CustomButton onPress={generateInsult}>
            Générer une insulte
          </CustomButton>
        </View>

        {randomInsult && (
          <Pressable 
            style={({ pressed }) => [
              styles.randomInsultContainer,
              pressed && styles.itemPressed
            ]}
            onPress={() => navigation.navigate('DetailScreen', { item: randomInsult })}
          >
            <Text style={styles.insultText}>"{randomInsult.insult}"</Text>
            {randomInsult.created && <Text style={styles.dateText}>Created: {randomInsult.created}</Text>}
          </Pressable>
        )}

        {isLoading ? (
            <ActivityIndicator size="large" color="#e74c3c" />
        ) : (
        <FlatList
            data={insults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            <Pressable 
              style={({ pressed }) => [
                styles.itemContainer,
                pressed && styles.itemPressed
              ]}
              onPress={() => navigation.navigate('DetailScreen', { item })}
            >
                <Text style={styles.insultText}>"{item.insult}"</Text>
                {item.created && <Text style={styles.dateText}>Created: {item.created}</Text>}
            </Pressable>
            )}
        />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2c3e50', // Couleur de fond du HomeScreen
  },
  buttonContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#34495e', // Légèrement plus clair que le fond
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#c0392b', // Accent rouge
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemPressed: {
    opacity: 0.8,
  },
  randomInsultContainer: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#e74c3c', // Rouge vif pour se démarquer
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  randomInsultLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 10,
    marginTop: 5,
  },
  insultText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 5,
    color: '#ecf0f1', // Texte clair
  },
  dateText: {
    fontSize: 12,
    color: '#95a5a6', // Gris clair pour les infos secondaires
  }
});
