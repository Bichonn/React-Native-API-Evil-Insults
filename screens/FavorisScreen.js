// Écran favoris - Liste des insultes sauvegardées (Firebase)
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { getInsults, deleteInsult } from '../fire';
import InsultItem from '../components/InsultItem';
import BackButton from '../components/BackButton';

export default function FavorisScreen({ navigation }) {
  const [insults, setInsults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => {
    const unsubscribe = getInsults((data) => {
      setInsults(data);
      setIsLoading(false);
    });
    return () => unsubscribe?.();
  }, []);

  const sortedInsults = [...insults].sort((a, b) =>
    sortDesc ? (b.shown || 0) - (a.shown || 0) : (a.shown || 0) - (b.shown || 0)
  );

  const handleDelete = (id) => {
    Alert.alert('Supprimer', 'Supprimer cette insulte des favoris ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => deleteInsult(id),
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {insults.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>Aucun favori</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity style={styles.sortBtn} onPress={() => setSortDesc(!sortDesc)}>
            <Text style={styles.sortTxt}>👁️ Vues {sortDesc ? '↓' : '↑'}</Text>
          </TouchableOpacity>
          <FlatList
            data={sortedInsults}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <InsultItem
                    item={item}
                    onPress={() => navigation.navigate('DetailScreen', { item, fromFavoris: true })}
                  />
                </View>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteTxt}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#2c3e50' 
  },
  centered: { 
    flex: 1, 
    backgroundColor: '#2c3e50', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emptyText: { 
    fontSize: 20, 
    color: '#ecf0f1', 
    fontWeight: 'bold' 
  },
  sortBtn: { 
    backgroundColor: '#e74c3c', 
    padding: 10, 
    borderRadius: 20, 
    alignSelf: 'center', 
    marginVertical: 10 
  },
  sortTxt: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  list: { 
    padding: 10, 
    paddingBottom: 80 
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  deleteBtn: { 
    backgroundColor: '#c0392b', 
    padding: 12, 
    borderRadius: 8, 
    marginLeft: 10 
  },
  deleteTxt: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' },
});
