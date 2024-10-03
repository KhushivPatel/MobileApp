import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../ContextApi/AuthContext'; // Assuming AuthContext is available for token

const Alert1 = () => {
  const [loading, setLoading] = useState(true);
  const [programmeName, setProgrammeName] = useState('');
  const {authToken} = useContext(AuthContext); // Assuming you are using AuthContext for the token

  useEffect(() => {
    fetchProgrammeDetails();
  }, []);

  const fetchProgrammeDetails = async () => {
    const url =
      'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/NextYearAdmDetails/AdmDetailsGet';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Referer: 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
          Token: authToken,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (json.response_code === '200') {
        const programme = json.obj[0].ProgrammeName; // Extracting ProgrammeName from the first object
        setProgrammeName(programme); // Set ProgrammeName in state
      } else {
        console.error('Error fetching data:', json);
      }
    } catch (error) {
      console.error('API call failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E74C3C" />
        <Text>Loading Programme Details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.certificateMainContainer}>
      <View style={styles.certificateTitleContainer}>
        <Text style={styles.certificateTitleText}>
          Certificate Course in Temple Management
        </Text>
      </View>
      <View style={styles.certificatemessage}>
        <Text style={styles.placeholderText}>Programme Name</Text>
        {/* Display the ProgrammeName here */}
        <Text style={styles.remarksText}>{programmeName}</Text>
      </View>
    </View>
  );
};

export default Alert1;

const styles = StyleSheet.create({
  certificateMainContainer: {
    backgroundColor: '#FFC6C0',
    marginTop: 10,
    borderRadius: 10,
  },
  certificateTitleContainer: {
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    height: 38,
    justifyContent: 'center',
    color: '#fff',
  },
  certificateTitleText: {
    color: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  certificatemessage: {
    paddingTop: 10,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 13,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#E74C3C',
    fontWeight: 'bold',
    fontSize: 12,
  },
  remarksText: {
    color: '#000',
    fontSize: 16,
    paddingTop: 5,
  },
});
