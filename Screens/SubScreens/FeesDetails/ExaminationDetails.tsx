import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../ContextApi/AuthContext';
import {Table, Row, Rows} from 'react-native-table-component';
import BackButton from '../../CommanText/BackButton';
import {useNavigation} from '@react-navigation/native'; // Import the navigation hook

const ExaminationDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {authToken} = useContext(AuthContext);
  const navigation = useNavigation(); // Get navigation instance

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const fetchExamDetails = async () => {
    const url =
      'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentDashboard/ApplicantPreExaminationDetails';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Referer: 'http://172.25.15.22/',
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
    'Action',
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

  const handleNavigation = (row, actionType) => {
    // Navigate to another page with row data
    navigation.navigate('DetailsScreen', {row, actionType});
  };
  const NavigationOfResult = (row, actionType) => {
    // Navigate to another page with row data
    navigation.navigate('NavResult', {row, actionType});
  };
  const NavigationOfTimetable = (row, actionType) => {
    // Navigate to another page with row data
    navigation.navigate('TimeTable', {row, actionType});
  };
  const NavigationOfRecipt = (row, actionType) => {
    // Navigate to another page with row data
    navigation.navigate('E_Fee', {row, actionType});
  };

  const tableData = data.map((row, index) => [
    index + 1,
    <TouchableOpacity
      style={styles.tableData}
      onPress={() => NavigationOfRecipt(row, 'E_Fee')}>
      <Text style={styles.buttonData}>
        {row.IsExamFeesPaid ? 'Recipt' : 'Not Paid'}
      </Text>
    </TouchableOpacity>,
    <TouchableOpacity
      style={styles.tableData}
      onPress={() => handleNavigation(row, 'Hall Ticket')}>
      <Text style={styles.buttonData}>
        {row.IsHallTicket ? 'Hall Ticket' : 'No'}
      </Text>
    </TouchableOpacity>,
    <TouchableOpacity
      style={styles.tableData}
      onPress={() => NavigationOfResult(row, 'Result')}>
      <Text style={styles.buttonData}>
        {row.IsResult ? 'Result' : 'Not Available'}
      </Text>
    </TouchableOpacity>,
    <TouchableOpacity
      style={styles.tableData}
      onPress={() => NavigationOfTimetable(row, 'Timetable')}>
      <Text style={styles.buttonData}>
        {row.IsTimetable ? 'Exam Timetable' : 'Not Available'}
      </Text>
    </TouchableOpacity>,
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
      <View style={styles.heading}>
        <BackButton />
        <Text style={styles.headingText}>Educational List</Text>
      </View>
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
    // padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    height: 58,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#5287D7',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headingText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableContainer: {
    margin: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  header: {
    height: 60, // Set height for header
    backgroundColor: '#B9D5FF',
    // borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
    width: 150, // Set width for header
    flex: 2,
    color: '#000',

    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  tableData: {
    textAlign: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    width: 150, // Set width for data cells
    height: 60, // Set height for data cells
  },
  buttonData: {
    flex: 2,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#3498DB',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 5,
  },
  tableBorder: {
    borderColor: '#ccc',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
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
