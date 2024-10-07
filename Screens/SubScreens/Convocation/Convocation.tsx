import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../ContextApi/AuthContext';

// Define the types for the response data
interface ConvocationData {
  Id: number;
  StudentAdmissionId: number;
  ConvocationId: number;
  ConvocationEnrollmentId: number;
  ExamEventId: number;
  ProgrammeId: number;
  SpecialisationId: number;
  ConvocationDate: string;
  StartDatePresentia: string;
  EndDatePresentia: string;
  StartDateAbsentia: string;
  EndDateAbsentia: string;
  ExamEventName: string;
  PresentiaAbsentia: string;
  IsPublished: boolean | null;
  IsDeleted: boolean;
  ProgrammeName: string;
  BranchName: string;
  Name: string;
  PresentiaAllowed: boolean;
  AbsentiaAllowed: boolean;
  FeeAmountPresentia: number;
  FeeAmountAbsentia: number;
  FeesStatus: number;
  StudentPhoto: string;
}

const Convocation: React.FC = () => {
  const [convocationData, setConvocationData] =
    useState<ConvocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {authToken, userDetails} = useContext(AuthContext);
  useEffect(() => {
    // Define the POST request
    const fetchData = async () => {
      try {

        // POST request with headers and an empty body
        const response = await axios.post(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/ConvocationEnrollment/getEligibleConvocationList',
          {}, // Empty body
          {
            headers: {
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken,
            },
          },
        );

        // Assuming we need the first item from the response object
        setConvocationData(response.data.obj[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching convocation data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!convocationData) {
    return (
      <View>
        <Text>No convocation data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{convocationData.Name}</Text>
      <Image
        source={{uri: convocationData.StudentPhoto}}
        style={styles.image}
      />
      <Text style={styles.label}>
        Programme: {convocationData.ProgrammeName}
      </Text>
      <Text style={styles.label}>Branch: {convocationData.BranchName}</Text>
      <Text style={styles.label}>
        Exam Event: {convocationData.ExamEventName}
      </Text>
      <Text style={styles.label}>
        Presentia Fee: ₹{convocationData.FeeAmountPresentia}
      </Text>
      <Text style={styles.label}>
        Absentia Fee: ₹{convocationData.FeeAmountAbsentia}
      </Text>
      <Text style={styles.label}>
        Presentia Dates: {convocationData.StartDatePresentia} -{' '}
        {convocationData.EndDatePresentia}
      </Text>
    </ScrollView>
  );
};

// Add some basic styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Convocation;
