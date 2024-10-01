// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import {AuthContext} from '../../ContextApi/AuthContext';

// const ExaminationDetails = () => {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(null);
//   const {authToken, userDetails} = useContext(AuthContext);

//   useEffect(() => {
//     fetchExamDetails();
//   }, []);

//   const fetchExamDetails = async () => {
//     const url =
//       'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/NextYearAdmDetails/AdmDetailsGet';

//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           Referer: 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
//           Token: authToken,
//           'Content-Type': 'application/json',
//         },
//       });

//       const json = await response.json();
//       if (json.response_code === '200') {
//         setData(json.obj);
//       } else {
//         console.error('Error fetching data:', json);
//       }
//     } catch (error) {
//       console.error('API call failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading data...</Text>
//       </View>
//     );
//   }

//   if (!data) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text>Failed to load data.</Text>
//       </View>
//     );
//   }

//   const renderTableRow = (row, index) => (
//     <View key={index} style={styles.tableRow}>
//       <Text style={styles.tableData}>{index + 1}</Text>
//       <Text style={styles.tableData}>
//         {row.IsPaperSelByStudent ? 'Selected' : 'Not Selected'}
//       </Text>
//       <Text
//         style={[
//           styles.tableData,
//           row.PTFeeStatus === 'Paid' ? styles.paid : styles.notPaid,
//         ]}>
//         {row.PTFeeStatus || 'N/A'}
//       </Text>
//       <Text style={styles.tableData}>{row.PartTermStatus}</Text>
//       <Text style={styles.tableData}>yes</Text>
//       <Text style={styles.tableData}>{row.AcademicYearCode}</Text>
//       <Text style={styles.tableData}>{row.InstancePartTermName}</Text>
//       <Text
//         style={[
//           styles.tableData,
//           row.IsFullyPaid ? styles.paid : styles.notPaid,
//         ]}>
//         {row.IsFullyPaid ? 'Yes' : 'No'}
//       </Text>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Examination Details</Text>
//       <ScrollView horizontal>
//         <View>
//           {/* Table Header */}
//           <View style={[styles.tableRow, styles.tableHeaderRow]}>
//             <Text style={styles.tableHeader}>S.No</Text>
//             <Text style={styles.tableHeader}>Paper Selection</Text>
//             <Text style={styles.tableHeader}>Admission Fee Status</Text>
//             <Text style={styles.tableHeader}>Admission Fee List</Text>
//             <Text style={styles.tableHeader}>Elective Preference</Text>
//             <Text style={styles.tableHeader}>Academic Year</Text>
//             <Text style={styles.tableHeader}>Semester Name</Text>
//             <Text style={styles.status}>Yearly Status</Text>
//           </View>

//           {/* Table Data */}
//           {data[0].PTAdmList.map((row, index) => renderTableRow(row, index))}
//         </View>
//       </ScrollView>
//     </ScrollView>
//   );
// };

// export default ExaminationDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     paddingVertical: 12,
//     justifyContent: 'space-between',
//     borderRadius: 2,
//     borderColor: '#000',
//   },
//   tableHeaderRow: {
//     backgroundColor: '#e0e0e0',
//   },
//   tableHeader: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 6,
//     minWidth: '10%',
//   },
//   tableData: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//     textAlign: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 6,
//     minWidth: 140, // Match this width with header
//   },
//   status: {
//     flex: 3,
//     textAlign: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 6,
//     minWidth: 670, // Match this width with header
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   paid: {
//     color: 'green',
//   },
//   notPaid: {
//     color: 'red',
//   },
// });
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../ContextApi/AuthContext';
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
