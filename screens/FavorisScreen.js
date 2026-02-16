// Écran favoris - Liste des insultes sauvegardées (Firebase)
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useMemo } from 'react';
import * as Haptics from 'expo-haptics';
import { getInsults, deleteInsult } from '../fire';
import InsultItem from '../components/InsultItem';
import BackButton from '../components/BackButton';

export default function FavorisScreen({ navigation }) {
  const [insults, setInsults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); // Tri par nombre de vues

  useEffect(() => {
    const unsubscribe = getInsults((fetchedInsults) => {
      setInsults(fetchedInsults);
      setIsLoading(false);
    });

    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const sortedInsults = useMemo(() => {
    const sorted = [...insults].sort((a, b) => {
      const viewsA = a.shown || 0;
      const viewsB = b.shown || 0;
      return sortOrder === 'desc' ? viewsB - viewsA : viewsA - viewsB;
    });
    return sorted;
  }, [insults, sortOrder]);

  const toggleSortOrder = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const handleDelete = (insult) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert(
      'Supprimer',
      'Voulez-vous vraiment supprimer cette insulte de vos favoris ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteInsult(insult.id);
            if (result.success) {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } else {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
              Alert.alert('Erreur', 'Impossible de supprimer l\'insulte');
            }
          },
        },
      ]
    );
  };

  const renderInsultItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.insultContent}>
        <InsultItem 
          item={item}
          onPress={() => navigation.navigate('DetailScreen', { item, fromFavoris: true })}
        />
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text style={styles.loadingText}>Chargement de vos favoris...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {insults.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Vos favoris sont vides</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {insults.length} insulte{insults.length > 1 ? 's' : ''} dans vos favoris
            </Text>
            <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
              <Text style={styles.sortButtonText}>
                👁️ Vues {sortOrder === 'desc' ? '↓' : '↑'}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={sortedInsults}
            keyExtractor={(item) => item.id}
            renderItem={renderInsultItem}
            contentContainerStyle={styles.listContainer}
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
    backgroundColor: '#2c3e50',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#ecf0f1',
    fontSize: 16,
  },
  header: {
    padding: 15,
    backgroundColor: '#34495e',
    borderBottomWidth: 2,
    borderBottomColor: '#e74c3c',
  },
  headerText: {
    color: '#ecf0f1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sortButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
    paddingBottom: 80,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  insultContent: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#c0392b',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 10,
    textAlign: 'center',
  },
});
