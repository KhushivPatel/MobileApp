import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native'; // Add StyleSheet here
import {RouteProp} from '@react-navigation/native';
import BackButton from '../../../CommanText/BackButton';

type PaperDetailsProps = {
  route: RouteProp<
    {
      params: {
        papers: any[];
        partTermName: string;
        eligibilityByFaculty: string;
        eligibilityByAcademics: string;
        createdOn: string;
      };
    },
    'params'
  >;
};

const PaperDetails: React.FC<PaperDetailsProps> = ({route}) => {
  const {
    papers,
    partTermName,
    eligibilityByFaculty,
    eligibilityByAcademics,
    createdOn,
  } = route.params;
  const isDarkMode = false; // You can set this dynamically based on user preference
  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton/>
        <Text style={styles.headerText}>Paper Details</Text>
        <View style={styles.headerIcons}>{/* Add icons if needed */}</View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* <Text style={styles.subHeaderText}>{partTermName}</Text> */}

        {/* Display Eligibility and CreatedOn Info */}
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Created On: </Text>
            {createdOn}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Eligibility By Faculty: </Text>
            {eligibilityByFaculty}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Eligibility By Academics: </Text>
            {eligibilityByAcademics}
          </Text>
        </View>

        {/* List of Papers */}
        {papers.map((paper, index) => (
          <View key={index} style={styles.textRow}>
            <Text style={styles.textLeft}>{paper.PaperName}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PaperDetails;

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#ffffff', // Dark/Light mode background
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginLeft:10,
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
      backgroundColor: isDarkMode ? '#22395C' : '#5287D7',
    },
    scrollView: {
      flex: 1,
      paddingTop: 10,
      padding: 10,
    },
    subHeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 16,
    },
    infoRow: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#DCEAFF', // Row background based on mode
      borderRadius: 8,
      marginBottom: 12,
    },
    infoText: {
      fontSize: 14,
      marginBottom: 8,
      color: isDarkMode ? '#ffffff' : '#000',
    },
    infoLabel: {
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000',
    },
    textRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#B9D5FF', // Row background based on mode
      borderRadius: 8,
      marginBottom: 12,
    },
    textLeft: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000', // Text color based on mode
    },
  });
