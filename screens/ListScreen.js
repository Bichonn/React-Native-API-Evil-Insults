// Écran liste - Affichage des insultes avec scroll infini

import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import fetchRandomInsult from '../services/api';
import RandomInsultGenerator from '../components/RandomInsultGenerator';
import InsultItem from '../components/InsultItem';
import BackButton from '../components/BackButton';

export default function ListScreen({ navigation }) {
  const [insults, setInsults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isLoadingMoreRef = useRef(false); // Évite les appels multiples simultanés

  useEffect(() => {
    async function loadData() {
      const promises = Array(3).fill().map(() => fetchRandomInsult());
      const results = await Promise.all(promises);
      const validInsults = results.filter(item => item !== null);
      setInsults(validInsults);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const loadMoreInsults = async () => {
    if (isLoadingMoreRef.current) return;
    
    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);
    const startTime = Date.now();
    
    const currentInsults = insults;
    const newInsults = [];
    const maxAttempts = 20;
    let attempts = 0;
    
    while (newInsults.length < 3 && attempts < maxAttempts) {
      const insult = await fetchRandomInsult();
      if (insult && !currentInsults.some(existing => existing.insult === insult.insult) &&
          !newInsults.some(existing => existing.insult === insult.insult)) {
        newInsults.push(insult);
      }
      attempts++;
    }
    
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 1000 - elapsedTime);
    await new Promise(resolve => setTimeout(resolve, remainingTime));
    
    setInsults(prevInsults => [...prevInsults, ...newInsults]);
    setIsLoadingMore(false);
    isLoadingMoreRef.current = false;
  };

  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <RandomInsultGenerator navigation={navigation} />

        {isLoading ? (
            <ActivityIndicator size="large" color="#e74c3c" />
        ) : (
        <FlatList
            data={insults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <InsultItem 
                item={item}
                onPress={() => navigation.navigate('DetailScreen', { item })}
              />
            )}
            onEndReached={loadMoreInsults}
            onEndReachedThreshold={0.5}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={() => (
              isLoadingMore ? (
                <View style={styles.footerLoader}>
                  <ActivityIndicator size="large" color="#e74c3c" />
                </View>
              ) : null
            )}
        />
        )}
        <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2c3e50',
  },
  listContent: {
    paddingBottom: 80,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
