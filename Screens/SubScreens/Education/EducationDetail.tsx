// EducationDetail.tsx

import React from 'react';
import {View, Text, StyleSheet, useColorScheme, ScrollView} from 'react-native';
import BackButton from '../../CommanText/BackButton';

const EducationDetail: React.FC<{route: any}> = ({route}) => {
  const {degree} = route.params; // Extract the degree data from route parameters
 const isDarkMode = useColorScheme() === 'dark';
 const styles = createStyles(isDarkMode);

  return (
    // <View
    //   style={[
    //     styles.container,
    //     isDarkMode ? styles.darkBackground : styles.lightBackground,
    //   ]}>
    //   <Text style={styles.title}>Degree Details</Text>
    //   <Text style={styles.detailText}>Degree: {degree.EligibleDegreeName}</Text>
    //   <Text style={styles.detailText}>
    //     Specialization: {degree.SpecializationName}
    //   </Text>
    //   <Text style={styles.detailText}>
    //     Institute: {degree.InstituteAttended}
    //   </Text>
    //   <Text style={styles.detailText}>
    //     Examination Body: {degree.ExaminationBodyName}
    //   </Text>
    //   <Text style={styles.detailText}>Pass Year: {degree.ExamPassYear}</Text>
    //   <Text style={styles.detailText}>Percentage: {degree.Percentage}</Text>
    //   {/* Add more details as necessary */}
    // </View>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerText}>Educational Details</Text>
      </View>

      {/* Main Content */}
      <ScrollView>
        <View style={styles.mainContent}>
          {/* Two Texts on the Right Side */}
          <View style={styles.textContainerRight}>
            <Text
              style={[styles.textRight, {fontWeight: 'bold', fontSize: 12}]}>
              Degree
            </Text>
            <Text style={styles.textRight}>{degree.EligibleDegreeName}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Texts on Left and Right Side */}
          <View style={styles.detailContainer}>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Specialization</Text>
              <Text style={styles.textRight}>{degree.SpecializationName}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Board / University</Text>
              <Text style={styles.textRight}>{degree.InstituteAttended}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Exam Certificate No.</Text>
              <Text style={styles.textRight}>
                {degree.ExamCertificateNumber}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Marks obtain / Marks out of</Text>
              <Text style={styles.textRight}>
                {degree.MarkObtained}/ {degree.MarkOutof}
              </Text>
            </View>
            <View style={styles.viewRow}>
              <View style={styles.equalView}>
                <Text style={styles.textLeft}>Grade</Text>
                <Text style={styles.textRight}>{degree.Grade || '-'}</Text>
              </View>
              <View style={[styles.equalView, styles.equalViewRight]}>
                <Text style={styles.textLeft}>Percentage</Text>
                <Text style={styles.textRight}>{degree.Percentage}</Text>
              </View>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>CGPA</Text>
              <Text style={styles.textRight}>{degree.CGPA || '-'}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Passing Class</Text>
              <Text style={styles.textRight}>{degree.ClassName}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Last Qualifying Exam?</Text>
              <Text style={styles.textRight}>
                {degree.IsLastQualifyingExam === 'True' ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>
                Are you pass with first trial?
              </Text>
              <Text style={styles.textRight}>
                {degree.IsFirstTrial === 'True' ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Passing Language</Text>
              <Text style={styles.textRight}>{degree.LanguageName || '-'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Text style={styles.logotext}>
        The Maharaja Sayajirao University of Baroda
      </Text>
    </View>
  );
};

const createStyles = isDarkMode =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
    },
    header: {
      height: 58,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#22395C' : '#5287D7',
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? 'transparent' : '#ddd',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    mainContent: {
      marginTop: 14,
      marginLeft: 9,
      marginRight: 9,
      marginBottom: 14,
      backgroundColor: isDarkMode ? '#565E69' : '#DCEAFF',
      borderRadius: 10,
      padding: 10,
    },
    textContainerRight: {
      padding: 10,
      alignItems: 'flex-start',
    },
    textRight: {
      flex: 2,
      fontSize: 14,
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 4,
      textAlign: 'right',
    },
    divider: {
      height: 2,
      backgroundColor: isDarkMode ? '#fff' : '#000',
      marginVertical: 10,
    },
    textRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#869BBA' : '#B9D5FF',
      padding: 12,
      borderRadius: 10,
      marginBottom: 10,
    },
    textLeft: {
      // flex: 1,
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
    },
    detailContainer: {
      padding: 10,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    equalView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: isDarkMode ? '#869BBA' : '#B9D5FF',
      padding: 12,
      borderRadius: 10,
    },
    equalViewRight: {
      marginLeft: 10,
    },
    logotext: {
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
    },
  });
export default EducationDetail;
