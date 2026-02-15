import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import fetchRandomInsult from '../services/api';
import CustomButton from './CustomButton';

export default function RandomInsultGenerator({ navigation }) {
  const [randomInsult, setRandomInsult] = useState(null);

  const generateInsult = async () => {
    const newInsult = await fetchRandomInsult();
    if (newInsult) {
      setRandomInsult(newInsult);
    }
  };

  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 20,
    marginTop: 10,
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
  itemPressed: {
    opacity: 0.8,
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
  },
});
