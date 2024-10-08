import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Ensure this is installed for Picker component
import {AuthContext} from '../../../ContextApi/AuthContext'; // Your AuthContext setup

// Define the type for individual request item from the API
interface RequestItem {
  Id: number;
  Request: string;
}

const RequestDropdown: React.FC = () => {
  const [requests, setRequests] = useState<RequestItem[]>([]); // Type the requests array
  const [selectedRequest, setSelectedRequest] = useState<number | string>(''); // Can be number or empty string
  const [loading, setLoading] = useState<boolean>(true); // Boolean for loading state
  const [error, setError] = useState<string | null>(null); // Error message or null
  const {authToken} = useContext(AuthContext); // Ensure authToken type is available in AuthContext

  // Fetch the request data from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          // 'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/RequestListForProfileGet',
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/RequestListForProfileGet',
          {
            method: 'GET',
            headers: {
              Referer:
                // 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
                'http://172.25.15.22/',
              Token: authToken, // Use token from AuthContext
              'Content-Type': 'application/json',
            },
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        setRequests(result.obj); // Store the request list in state
      } catch (err: any) {
        setError(err.message); // TypeScript type assertion for Error handling
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [authToken]);

  // Handle loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading requests...</Text>
      </View>
    );
  }

  // Handle error state
  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Request</Text>
      <Picker
        selectedValue={selectedRequest}
        onValueChange={(itemValue: number | string) =>
          setSelectedRequest(itemValue)
        } // Strongly typed onValueChange
        style={styles.picker}>
        <Picker.Item label="Select a Request" value="" /> {/* Default option */}
        {requests.map((request: RequestItem) => (
          <Picker.Item
            key={request.Id}
            label={request.Request} // Display request name
            value={request.Id} // Use request Id as value
          />
        ))}
      </Picker>
    </View>
  );
};

export default RequestDropdown;

// Styles
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
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
  },
});
