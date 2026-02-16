// Composant d'affichage d'une insulte dans une liste
import { Pressable, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function InsultItem({ item, onPress }) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.itemContainer,
        pressed && styles.itemPressed
      ]}
      onPress={handlePress}
    >
      <Text style={styles.insultText}>"{item.insult}"</Text>
      {item.shown && <Text style={styles.shownText}>vues : {item.shown}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#34495e',
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#c0392b',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemPressed: {
    opacity: 0.8,
  },
  insultText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 5,
    color: '#ecf0f1',
  },
  shownText: {
    fontSize: 12,
    color: '#95a5a6',
  },
});
