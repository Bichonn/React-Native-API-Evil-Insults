import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { addInsult } from '../fire';
import BackButton from '../components/BackButton';

export default function DetailScreen({ route }) {
  const { item, fromCollection } = route.params;

  const handleAddToCollection = async () => {
    const result = await addInsult(item);
    if (result.success) {
      Alert.alert(
        'Succès', 
        'L\'insulte a été ajoutée à votre collection !',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Erreur', 
        'Impossible d\'ajouter l\'insulte à la collection',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
        <Text style={styles.title}>Insulte #{item.number}</Text>
        
        <Text style={styles.insult}>"{item.insult}"</Text>
        
        <View style={styles.separator} />
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Auteur :</Text>
          <Text style={styles.value}>{item.createdby}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Vues :</Text>
          <Text style={styles.value}>{item.shown} fois</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Créé le :</Text>
          <Text style={styles.value}>{item.created}</Text>
        </View>

        {!fromCollection && (
          <>
            <View style={styles.separator} />
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddToCollection}
            >
              <Text style={styles.addButtonText}>📚 Ajouter à ma collection</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      </ScrollView>
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  scrollContent: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#34495e',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#c0392b',
  },
  title: {
    fontSize: 14,
    color: '#e74c3c',
    marginBottom: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  insult: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#7f8c8d',
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    color: '#95a5a6',
  },
  value: {
    color: '#bdc3c7',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
