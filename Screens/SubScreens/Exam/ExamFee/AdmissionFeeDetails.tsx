/* eslint-disable no-catch-shadow */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../../ContextApi/AuthContext';
import {useRoute} from '@react-navigation/native';

const AdmissionFeeDetails = () => {
  const {authToken} = useContext(AuthContext);
  const route = useRoute();
  const {StudentAdmissionId, InstPTId} = route.params;
  const [loading, setLoading] = useState(true);
  const [feeDetails, setFeeDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeeDetails();
  }, [StudentAdmissionId, InstPTId]);

  const fetchFeeDetails = async () => {
    const url =
      'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentDashboard/AdmStudentAdmissionFeeGet';
    const body = JSON.stringify({StudentAdmissionId, InstPTId});

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Referer: 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
          Token: authToken,
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const json = await response.json();
      if (json.response_code === '200') {
        setFeeDetails(json.obj);
      } else {
        console.error('Error fetching fee details:', json);
        setError('Failed to load fee details.');
      }
    } catch (error) {
      console.error('API call failed:', error);
      setError('Failed to fetch fee details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading fee details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!feeDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load fee details or no details available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admission Fee Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Total Fee:</Text>
        <Text style={styles.value}>{feeDetails.TotalFee || 'N/A'}</Text>
        <Text style={styles.label}>Paid Amount:</Text>
        <Text style={styles.value}>{feeDetails.PaidAmount || 'N/A'}</Text>
        <Text style={styles.label}>Balance Fee:</Text>
        <Text style={styles.value}>{feeDetails.BalanceFee || 'N/A'}</Text>
        {/* Add more fields as needed */}
      </View>
    </ScrollView>
  );
};

export default AdmissionFeeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
