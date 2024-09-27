import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';

// Example of the data structure (replace this with your API data)
const courseData = [
  {
    courseCode: 'AHA2216',
    courseName: 'Philosophy of Art-II',
    credits: 2,
    gradeObtained: 'D',
    gradePoints: 6.0,
    earnedGradePoints: 6.0,
    remarks: 'E, C',
  },
  {
    courseCode: 'AHA2217',
    courseName: 'Philosophy of Art-III',
    credits: 2,
    gradeObtained: 'C',
    gradePoints: 7.0,
    earnedGradePoints: 7.0,
    remarks: 'A, B',
  },
  // Add more courses as needed...
];

const ResultTable = () => {
  return (
    <ScrollView horizontal={true} style={styles.container}>
      {/* Main header for the table */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Course Code</Text>
        <Text style={styles.headerCell}>Course Name</Text>
        <Text style={styles.headerCell}>Credits</Text>
        <Text style={styles.headerCell}>Grade Obtained</Text>
        <Text style={styles.headerCell}>Grade Points</Text>
        <Text style={styles.headerCell}>Earned Gr. Points</Text>
        <Text style={styles.headerCell}>Remarks</Text>
      </View>

      {/* FlatList to dynamically render rows based on the course data */}
      <FlatList
        data={courseData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.courseCode}</Text>
            <Text style={styles.cell}>{item.courseName}</Text>
            <Text style={styles.cell}>{item.credits}</Text>
            <Text style={styles.cell}>{item.gradeObtained}</Text>
            <Text style={styles.cell}>{item.gradePoints}</Text>
            <Text style={styles.cell}>{item.earnedGradePoints}</Text>
            <Text style={styles.cell}>{item.remarks}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default ResultTable;

// Styles for the table and components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#5287D7',
    paddingVertical: 10,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 10,
    minWidth: 120, // Adjust for the column width
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    fontSize: 14,
    paddingHorizontal: 10,
    minWidth: 120, // Adjust for the column width
    textAlign: 'center',
  },
});
