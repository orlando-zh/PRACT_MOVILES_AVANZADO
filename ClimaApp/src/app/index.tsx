import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import WeatherCard from '../../components/WeatherCard';
import { getWeather } from '../../services/weatherApi';
import type { WeatherData } from '../../types/weather';

export default function index() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (cityName = city) => {
    const searchCity = cityName.trim();

    if (!searchCity) {
      setError('Escribe el nombre de una ciudad');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setError('');

    try {
      const data = await getWeather(searchCity);
      setWeather(data);
      setCity(searchCity);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ocurrió un error inesperado'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>ClimaApp</Text>

      <Text style={styles.subtitle}>Consulta el clima de cualquier ciudad</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ej. San Salvador"
          placeholderTextColor="#999999"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={() => handleSearch()}
          returnKeyType="search"
          autoCapitalize="words"
        />

        <Pressable
          style={({ pressed }) => [
            styles.searchButton,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}
          onPress={() => handleSearch()}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </Pressable>
      </View>

      {loading && (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.message}>Consultando el clima...</Text>
        </View>
      )}

      {!!error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {weather && !loading && !error && <WeatherCard weather={weather} />}

      {!weather && !loading && !error && (
        <View style={styles.welcome}>
          <Text style={styles.welcomeIcon}>⛅</Text>

          <Text style={styles.welcomeTitle}>¿Cómo está el clima?</Text>

          <Text style={styles.welcomeText}>
            Escribe una ciudad para consultar su temperatura y condiciones actuales.
          </Text>

          <Pressable
            style={styles.exampleButton}
            onPress={() => {
              setCity('San Salvador');
              handleSearch('San Salvador');
            }}
          >
            <Text style={styles.exampleButtonText}>Consultar San Salvador</Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.footer}>Datos meteorológicos: Open-Meteo</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#edf4ff',
  },

  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 65,
    paddingBottom: 30,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1d3557',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#457b9d',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },

  searchContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },

  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dbeafe',
    color: '#1d3557',
  },

  searchButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingHorizontal: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  messageContainer: {
    alignItems: 'center',
    marginTop: 40,
    gap: 12,
  },

  message: {
    color: '#475569',
    fontSize: 16,
  },

  errorContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
  },

  errorText: {
    color: '#b91c1c',
    textAlign: 'center',
    fontSize: 15,
  },

  welcome: {
    alignItems: 'center',
    marginTop: 35,
    padding: 20,
  },

  welcomeIcon: {
    fontSize: 65,
    marginBottom: 18,
  },

  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1d3557',
    textAlign: 'center',
  },

  welcomeText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 32,
  },

  exampleButton: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },

  exampleButtonText: {
    color: '#4338ca',
    fontWeight: 'bold',
    fontSize: 14,
  },

  footer: {
    textAlign: 'center',
    marginTop: 'auto',
    paddingTop: 30,
    color: '#94a3b8',
    fontSize: 12,
  },
});