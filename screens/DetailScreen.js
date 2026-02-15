import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
  // On récupère les données passées par la navigation
  const { item } = route.params;

  return (
    <View style={styles.container}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2c3e50', // Fond sombre
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#34495e', // Fond de carte sombre
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#c0392b', // Bordure rouge subtile
  },
  title: {
    fontSize: 14,
    color: '#e74c3c', // Rouge vif
    marginBottom: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  insult: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1', // Blanc
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
    color: '#95a5a6', // Gris moyen
  },
  value: {
    color: '#bdc3c7', // Gris clair
    fontWeight: 'bold',
  },
});
