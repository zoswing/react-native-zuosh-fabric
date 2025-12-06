import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';
import { CustomButton } from 'react-native-zuosh-fabric';

const App: React.FC = () => {
  const [pressCount, setPressCount] = useState(0);
  const [lastAction, setLastAction] = useState('');

  const handlePress = (event: { value: string }) => {
    setPressCount(prev => prev + 1);
    setLastAction(`Pressed: ${event.value}`);
  };

  const handleLongPress = (event: { value: string }) => {
    setLastAction(`Long pressed: ${event.value}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>React Native Fabric Button Demo</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Button</Text>
          <CustomButton
            title="Press Me"
            onPress={handlePress}
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Colors</Text>
          <CustomButton
            title="Green Button"
            backgroundColor="#4CAF50"
            textColor="#FFFFFF"
            onPress={handlePress}
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disabled Button</Text>
          <CustomButton
            title="Disabled"
            backgroundColor="#CCCCCC"
            textColor="#666666"
            disabled={true}
            onPress={handlePress}
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>With Long Press</Text>
          <CustomButton
            title="Long Press Me"
            backgroundColor="#FF5722"
            textColor="#FFFFFF"
            onPress={handlePress}
            onLongPress={handleLongPress}
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Log</Text>
          <View style={styles.logContainer}>
            <Text style={styles.logText}>
              Press Count: {pressCount}
            </Text>
            <Text style={styles.logText}>
              Last Action: {lastAction || 'None'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666666',
  },
  button: {
    marginBottom: 10,
  },
  logContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  logText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
