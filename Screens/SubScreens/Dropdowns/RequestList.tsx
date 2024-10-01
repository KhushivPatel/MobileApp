import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Ensure you install this library
import {AuthContext} from '../../ContextApi/AuthContext';

const RequestList = () => {
  const [requests, setRequests] = useState([]); // For storing requests data
  const [selectedRequest, setSelectedRequest] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authToken} = useContext(AuthContext); // Assuming authToken is available in AuthContext

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/RequestListForProfileGet',
          {
            method: 'GET',
            headers: {
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken, // Pass the authToken in the header
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setRequests(result.obj); // Store the list of requests in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [authToken]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading requests...</Text>{' '}
        {/* Text component for the loading state */}
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>; // Handle the error state
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a Request</Text>
      <Picker
        selectedValue={selectedRequest}
        onValueChange={itemValue => setSelectedRequest(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Select a Request" value="" />
        {requests.map(request => (
          <Picker.Item
            key={request.Id}
            label={request.Request}
            value={request.Request}
          />
        ))}
      </Picker>
    </View>
  );
};

export default RequestList;

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
