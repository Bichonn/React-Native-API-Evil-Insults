import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Projects as InitialProjects } from './data/projectsData';
import ProjectItem from './components/ProjectItem';
import CreateProject from './components/CreateProject';

export default function App() {
  const [projects, setProjects] = useState(InitialProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleProjectSelect = (id) => {
    setSelectedProjectId(selectedProjectId === id ? null : id);
  };

  const handleAddProject = (newProject) => {
    setProjects([newProject, ...projects]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Modelify</Text>

      <CreateProject onAddProject={handleAddProject} />
      
      <FlatList
        style={styles.listProject}
        data={projects} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <ProjectItem 
            item={item}
            isSelected={selectedProjectId === item.id}
            onSelect={() => handleProjectSelect(item.id)}
          />
        )}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    marginTop: 60,
    fontSize: 32,
    fontWeight: 'bold',
  },
  listProject: {
    marginTop: 30,
    width: '80%',
  },
});