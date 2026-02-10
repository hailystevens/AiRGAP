import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Configure your backend URL here
const API_URL = 'http://localhost:8000';

export default function App() {
  const [status, setStatus] = useState('Connecting...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/health`);
      setStatus(response.data.status === 'healthy' ? 'Connected' : 'Unknown');
    } catch (error) {
      setStatus('Offline Mode');
      console.error('API connection error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AiRGAP</Text>
      <Text style={styles.subtitle}>Offline AI Assistant</Text>
      
      <View style={styles.statusContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#667eea" />
        ) : (
          <>
            <Text style={styles.statusLabel}>Status:</Text>
            <Text style={[
              styles.statusText,
              status === 'Connected' ? styles.online : styles.offline
            ]}>
              {status}
            </Text>
          </>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Your completely offline AI assistant</Text>
        <Text style={styles.infoText}>No internet connection required</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 40,
  },
  statusContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 20,
    minWidth: 200,
    alignItems: 'center',
    marginBottom: 30,
  },
  statusLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
  },
  online: {
    color: '#4ade80',
  },
  offline: {
    color: '#fbbf24',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginVertical: 4,
  },
});
