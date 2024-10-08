import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../ContextApi/AuthContext';
import BackButton from '../../../CommanText/BackButton';

const DownloadCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchCertificates = async () => {
      console.log('Auth Token:', authToken); // Log auth token
      try {
        const response = await fetch(
          // 'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/DownloadCertificate/DownloadCerti',
          'http://14.139.121.110:4760/Vidhyarthi_API/api/DownloadCertificate/DownloadCerti',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Referer:
                // 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
                'http://172.25.15.22/',
              // origin: 'https://admission.msubaroda.ac.in',
              origin: 'http://172.25.15.22',
              Token: authToken,
            },
            body: JSON.stringify({}),
          },
        );

        const data = await response.json();
        console.log('API Response:', data); // Log the response

        if (data.response_code === '200') {
          console.log('Certificates Data:', data.obj); // Log certificates data
          setCertificates(data.obj); // Store the certificates in state
        } else {
          console.error('Failed to fetch data:', data);
        }
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates(); // Call the function to fetch data
  }, [authToken]); // Add authToken as dependency

  // Function to render each certificate item
  const renderItem = ({item}) => (
      <View style={styles.card}>
        <Text style={styles.title}>{item.CertificateName}</Text>
        <Text>Request Date: {item.RequestDate}</Text>
        <Text>Issue Date: {item.IssueDate}</Text>
        <Text>Status: {item.RequestStatus}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(item.DownloadLink)} // Open the download link
        >
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
      </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerText}>Certificate</Text>
      </View>
      <FlatList
        data={certificates}
        renderItem={renderItem}
        keyExtractor={item => item.CertiId.toString()} // Unique key for each item
      />
    </View>
  );
};

export default DownloadCertificate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff', // Dark/Light mode background
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#5287D7',
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9', // Added background color for visibility
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
