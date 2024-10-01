import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../../ContextApi/AuthContext';
import {Table, Row, Rows} from 'react-native-table-component';

const ExaminationDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const fetchExamDetails = async () => {
    const url =
      'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentDashboard/ApplicantPreExaminationDetails';

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
        setData(json.obj); // Set data directly from the response
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
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load data or no data available.</Text>
      </View>
    );
  }

  const tableHead = [
    'S.No',
    'Exam Fee Status',
    'Hall Ticket',
    'Result',
    'Timetable',
    'PRN',
    'Display Name',
    'Faculty Name',
    'Instance Name',
    'Appearance Type',
    'Form No',
    'Fee Start Date',
    'Fee End Date',
    'Inward Mode',
    'Seat Number',
    'Result Status',
  ];

  const tableData = data.map((row, index) => [
    index + 1,
    row.IsExamFeesPaid ? 'Paid' : 'Not Paid',
    row.IsHallTicket ? 'Yes' : 'No',
    row.IsResult ? 'Available' : 'Not Available',
    row.IsTimetable ? 'Available' : 'Not Available',
    row.PRN,
    row.DisplayName,
    row.FacultyName,
    row.InstanceName,
    row.AppearanceType,
    row.FormNo,
    row.ExamFeeStartDateView,
    row.ExamFeeEndDateForStudentView,
    row.InwardMode,
    row.SeatNumber,
    row.ResultStatus,
  ]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Examination Details</Text>
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <Table borderStyle={styles.tableBorder}>
            <Row
              data={tableHead}
              style={styles.header}
              textStyle={styles.headerText}
            />
          </Table>
          {/* Table Data */}
          <Table borderStyle={styles.tableBorder}>
            <Rows data={tableData} textStyle={styles.tableData} />
          </Table>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default ExaminationDetails;

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
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
  },
  header: {
    height: 60, // Set height for header
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
    width: 100, // Set width for header
    flex: 2,
  },
  tableData: {
    textAlign: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 100, // Set width for data cells
    height: 60, // Set height for data cells
  },
  tableBorder: {
    borderColor: '#000',
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
