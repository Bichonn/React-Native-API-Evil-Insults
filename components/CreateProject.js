import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Pressable } from 'react-native';

export default function CreateProject({ onAddProject }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [use, setUse] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !budget) {
      alert('Veuillez remplir au moins le titre, la description et le budget.');
      return;
    }

    const newProject = {
      id: Date.now(),
      title,
      description,
      use: use || 'Autre',
      budget: parseFloat(budget) || 0,
      image: null,
    };

    onAddProject(newProject);
    
    setTitle('');
    setDescription('');
    setUse('');
    setBudget('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Nouveau Projet" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Ajouter un projet</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Titre"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Usage (ex: déco, pro...)"
            value={use}
            onChangeText={setUse}
          />
          <TextInput
            style={styles.input}
            placeholder="Budget (€)"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />

          <View style={styles.buttonContainer}>
            <Button title="Annuler" onPress={() => setModalVisible(false)} color="red" />
            <Button title="Ajouter" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '80%',
  },
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 20,
  },
});
