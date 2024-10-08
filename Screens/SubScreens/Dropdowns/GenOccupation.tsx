import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Ensure you install this library
import {AuthContext} from '../../ContextApi/AuthContext';

const GenOccupation = () => {
  const [occupations, setOccupations] = useState([]); // Renamed to occupations
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const response = await fetch(
          // 'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/ReligionGet',
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/GenOccupationGet',
          {
            method: 'GET',
            headers: {
              // Referer: 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Referer: 'http://172.25.15.22/',
              Token: authToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setOccupations(result.obj); // Set occupations from result.obj
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOccupations();
  }, [authToken]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        {/* Make sure this is wrapped in <Text> */}
        <Text>Loading occupations...</Text> {/* Changed from countries */}
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Occupation</Text>
      {/* Ensure the Picker and its children are used correctly */}
      <Picker
        selectedValue={selectedOccupation}
        onValueChange={itemValue => setSelectedOccupation(itemValue)}
        style={styles.picker}>
        {/* Default value */}
        <Picker.Item label="Select an Occupation" value="" />
        {occupations.map(occupation => (
          <Picker.Item
            key={occupation.Id} // Ensure 'Id' is used as a key
            label={occupation.Occupation} // Display Occupation as label
            value={occupation.Occupation} // Use Occupation as value
          />
        ))}
      </Picker>
    </View>
  );
};

export default GenOccupation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  selectedText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
  },
});
