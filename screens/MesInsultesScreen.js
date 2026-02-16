import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { getMyInsults, addMyInsult, updateMyInsult, deleteMyInsult } from '../fire';
import BackButton from '../components/BackButton';

export default function MesInsultesScreen() {
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

    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const openCreateModal = () => {
    setCurrentInsult(null);
    setInsultText('');
    setModalVisible(true);
  };

  const openEditModal = (insult) => {
    setCurrentInsult(insult);
    setInsultText(insult.insult);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!insultText.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer une insulte');
      return;
    }

    let result;
    if (currentInsult) {
      result = await updateMyInsult(currentInsult.id, insultText.trim());
      if (result.success) {
        Alert.alert('Succès', 'Insulte modifiée avec succès');
      }
    } else {
      result = await addMyInsult(insultText.trim());
      if (result.success) {
        Alert.alert('Succès', 'Insulte créée avec succès');
      }
    }

    if (!result.success) {
      Alert.alert('Erreur', 'Une erreur est survenue');
    }

    setModalVisible(false);
    setInsultText('');
    setCurrentInsult(null);
  };

  const handleDelete = (insult) => {
    Alert.alert(
      'Supprimer',
      'Voulez-vous vraiment supprimer cette insulte ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteMyInsult(insult.id);
            if (result.success) {
              Alert.alert('Succès', 'Insulte supprimée');
            } else {
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
        <Text style={styles.insultText}>"{item.insult}"</Text>
        <Text style={styles.dateText}>
          Créé le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => openEditModal(item)}
        >
          <Text style={styles.actionButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.actionButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text style={styles.loadingText}>Chargement de vos insultes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <TouchableOpacity style={styles.createButton} onPress={openCreateModal}>
        <Text style={styles.createButtonText}>➕ Créer une insulte</Text>
      </TouchableOpacity>

      {insults.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>✍️</Text>
          <Text style={styles.emptyText}>Aucune insulte créée</Text>
          <Text style={styles.emptySubtext}>
            Créez votre première insulte !
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {insults.length} insulte{insults.length > 1 ? 's' : ''} créée{insults.length > 1 ? 's' : ''}
            </Text>
          </View>
          <FlatList
            data={insults}
            keyExtractor={(item) => item.id}
            renderItem={renderInsultItem}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {currentInsult ? '✏️ Modifier l\'insulte' : '➕ Nouvelle insulte'}
              </Text>
              
              <TextInput
                style={styles.textInput}
                placeholder="Entrez votre insulte..."
                placeholderTextColor="#7f8c8d"
                value={insultText}
                onChangeText={setInsultText}
                multiline
                numberOfLines={4}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>
                    {currentInsult ? 'Modifier' : 'Créer'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
  createButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    textAlign: 'center',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  headerText: {
    color: '#bdc3c7',
    fontSize: 14,
    textAlign: 'center',
  },
  listContainer: {
    padding: 10,
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#34495e',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
  },
  insultContent: {
    flex: 1,
  },
  insultText: {
    color: '#ecf0f1',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  dateText: {
    color: '#7f8c8d',
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#34495e',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: '#2c3e50',
    borderRadius: 10,
    padding: 15,
    color: '#ecf0f1',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#7f8c8d',
  },
  saveButton: {
    backgroundColor: '#27ae60',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
