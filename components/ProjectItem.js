import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

// Ce composant est responsable de l'affichage d'un seul projet dans la liste.
// Il gère l'interaction utilisateur (clic) et l'affichage conditionnel de l'image.

export default function ProjectItem({ item, isSelected, onSelect }) {
  
  const handlePress = () => {
    // Retour haptique lors de la sélection
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Project selected:', item.title);
    
    // Déclenche la fonction de sélection du parent
    onSelect();
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.use}>{item.use}</Text>
        <Text>{item.budget} €</Text>

        {isSelected && (
          <Image source={item.image} style={styles.image} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  use: {
    fontStyle: 'italic',
    color: 'gray',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
