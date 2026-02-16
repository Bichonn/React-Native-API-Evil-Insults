import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { getMyInsults, addMyInsult, updateMyInsult, deleteMyInsult } from '../fire';
import BackButton from '../components/BackButton';
import InsultModal from '../components/InsultModal';

export default function MyInsultsScreen() {
  const [insults, setInsults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentInsult, setCurrentInsult] = useState(null);
  const [insultText, setInsultText] = useState('');

  useEffect(() => {
    const unsubscribe = getMyInsults((fetchedInsults) => {
      setInsults(fetchedInsults);
      setIsLoading(false);
    });
    return () => unsubscribe?.();
  }, []);

  const openModal = (insult = null) => {
    setCurrentInsult(insult);
    setInsultText(insult?.insult || '');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setInsultText('');
    setCurrentInsult(null);
  };

  const handleSave = async () => {
    if (!insultText.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer une insulte');
      return;
    }

    const action = currentInsult 
      ? updateMyInsult(currentInsult.id, insultText.trim())
      : addMyInsult(insultText.trim());
    
    const result = await action;
    const message = currentInsult ? 'Insulte modifiée' : 'Insulte créée';
    
    Alert.alert(result.success ? 'Succès' : 'Erreur', result.success ? message : 'Une erreur est survenue');
    if (result.success) closeModal();
  };

  const handleDelete = (insult) => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette insulte ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          const result = await deleteMyInsult(insult.id);
          Alert.alert(result.success ? 'Succès' : 'Erreur', 
            result.success ? 'Insulte supprimée' : 'Impossible de supprimer');
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>"{item.insult}"</Text>
        <Text style={styles.itemDate}>
          Créé le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
        </Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => openModal(item)}>
          <Text style={styles.actionText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item)}>
          <Text style={styles.actionText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <TouchableOpacity style={styles.createBtn} onPress={() => openModal()}>
        <Text style={styles.createBtnText}>➕ Créer une insulte</Text>
      </TouchableOpacity>

      {insults.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyIcon}>✍️</Text>
          <Text style={styles.emptyText}>Aucune insulte créée</Text>
          <Text style={styles.emptySubtext}>Créez votre première insulte !</Text>
        </View>
      ) : (
        <>
          <Text style={styles.header}>
            {insults.length} insulte{insults.length > 1 ? 's' : ''} créée{insults.length > 1 ? 's' : ''}
          </Text>
          <FlatList
            data={insults}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        </>
      )}

      <InsultModal
        visible={modalVisible}
        onClose={closeModal}
        onSave={handleSave}
        value={insultText}
        onChangeText={setInsultText}
        isEditing={!!currentInsult}
      />

      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  centered: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#ecf0f1',
    fontSize: 16,
  },
  createBtn: {
    backgroundColor: '#27ae60',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    color: '#ecf0f1',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bdc3c7',
  },
  header: {
    color: '#bdc3c7',
    fontSize: 14,
    textAlign: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  list: {
    padding: 10,
    paddingBottom: 100,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#34495e',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    color: '#ecf0f1',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  itemDate: {
    color: '#7f8c8d',
    fontSize: 12,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 10,
  },
  editBtn: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 18,
  },
});
