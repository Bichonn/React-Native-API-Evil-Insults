import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>😈 Evil Insult 😈 Generator</Text>
      <Text style={styles.subtitle}>Prêt pour une dose de méchanceté ?</Text>

      <CustomButton onPress={() => navigation.navigate('ListScreen')}>
        Voir les Insultes
      </CustomButton>

      <View style={styles.buttonSpacer} />

      <CustomButton onPress={() => navigation.navigate('FavorisScreen')}>
        ⭐ Mes Favoris
      </CustomButton>

      <View style={styles.buttonSpacer} />

      <CustomButton onPress={() => navigation.navigate('MesInsultesScreen')}>
        ✍️ Mes Insultes
      </CustomButton>

      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ecf0f1',
    marginBottom: 40,
    fontStyle: 'italic',
  },
  buttonSpacer: {
    height: 15,
  },
});
