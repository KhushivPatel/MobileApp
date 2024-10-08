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
import BackButton from '../../../CommanText/BackButton';

const Fee = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const fetchExamDetails = async () => {
    const url =
      // 'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/NextYearAdmDetails/AdmDetailsGet';
      'http://14.139.121.110:4760/Vidhyarthi_API/api/NextYearAdmDetails/AdmDetailsGet';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // Referer: 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
          Referer: 'http://172.25.15.22/',
          Token: authToken,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (json.response_code === '200') {
        const extractedData = json.obj.flatMap(item => item.PTAdmList); // Flatten PTAdmList into one array
        setData(extractedData); // Set the flattened PTAdmList as the data
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
    'Paper Selection',
    'Admission Fee Status',
    'Admission Fee List',
    'Elective Preference',
    'Academic Year',
    'Semester Name',
    'Yearly Status',
  ];

  const tableData = data.map((row, index) => [
    index + 1,
    row.IsPaperSelByStudent ? 'Selected' : 'Not Selected',
    row.PTFeeStatus || 'N/A',
    row.PTFeeStatus || 'N/A',
    'yes', // Assuming Elective Preference is always 'yes'
    row.AcademicYearCode || 'N/A',
    row.InstancePartTermName || 'N/A',
    row.IsFullyPaid ? 'Yes' : 'No',
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <BackButton />
        <Text style={styles.headingText}>Fees Details</Text>
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

export default Fee;

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
    width: 100, // Set width for header
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
    width: 100, // Set width for data cells
    height: 60, // Set height for data cells
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
