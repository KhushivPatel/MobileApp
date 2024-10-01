import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Ensure you install this library
import {AuthContext} from '../../ContextApi/AuthContext';


const CountryDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/CountryMasterGet',
          {
            method: 'GET',
            headers: {
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setCountries(result.obj);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [authToken]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading countries...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Country</Text>
      <Picker
        selectedValue={selectedCountry}
        onValueChange={itemValue => setSelectedCountry(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Select a country" value="" />
        {countries.map(country => (
          <Picker.Item
            key={country.Id}
            label={country.CountryName}
            value={country.CountryName}
          />
        ))}
      </Picker>
      {/* <Text style={styles.selectedText}>
        Selected Country: {selectedCountry}
      </Text> */}
    </View>
  );
};

export default CountryDropdown;

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
