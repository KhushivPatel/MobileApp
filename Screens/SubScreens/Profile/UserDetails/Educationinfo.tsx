import {
  View,
  Text,
  ActivityIndicator,
  useColorScheme,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import styles from './styles';
import {AuthContext} from '../../../ContextApi/AuthContext';
import AcademicYearDropdown from '../../Dropdowns/AcademicYearDropdown';

const Educationinfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authToken} = useContext(AuthContext);
  const isDarkMode = useColorScheme() === 'dark';
  const currentStyles = styles(isDarkMode);
  const [documentsData, setDocumentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/StudentProfileGetEducationDetails',
          {
            method: 'GET',
            headers: {
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.obj); // Expecting a list here
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={currentStyles.containerloading}>
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#fff' : '#5287D7'}
          style={currentStyles.spinner}
        />
        <Text style={currentStyles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={currentStyles.errorText}>Error: {error}</Text>;
  }

  return (
    <ScrollView style={currentStyles.container}>
      {data.length > 0 ? (
        data.map((education, index) => (
          <View key={index} style={currentStyles.infoContainer}>
            {/* Dynamic list rendering */}
            <Text style={currentStyles.Header}>
              Education Details : {education.EligibleDegreeName || '-'}
            </Text>
            <View style={currentStyles.divider} />
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Eligible Degree</Text>
              <Text style={currentStyles.firstName}>
                {education.EligibleDegreeName || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Specialization</Text>
              <Text style={currentStyles.firstName}>
                {education.SpecializationName || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Board/University</Text>
              <Text style={currentStyles.firstName}>
                {education.ExaminationBodyName || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Faculty/School/College Name
              </Text>
              <Text style={currentStyles.firstName}>
                {education.InstituteAttended || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>School No</Text>
              <Text style={currentStyles.firstName}>
                {education.SchoolNo || '-'}
              </Text>
            </View>
            {/* Add more fields dynamically as per available data */}
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Institute City</Text>
              <Text style={currentStyles.firstName}>
                {education.CityName || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Other Institute Name</Text>
              <Text style={currentStyles.firstName}>
                {education.OtherCity || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Exam Pass Location</Text>
              <Text style={currentStyles.firstName}>
                {education.ExamPassCity || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Result Status</Text>
              <Text style={currentStyles.firstName}>
                {education.ResultStatus || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Declaration of Marksheet
              </Text>
              <Text style={currentStyles.firstName}>
                {education.IsDeclared === 'True' ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Exam Pass month</Text>
              <Text style={currentStyles.firstName}>
                {education.ExamPassMonth || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Exam Pass Year</Text>
              <Text style={currentStyles.firstName}>
                {education.ExamPassYear || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Exam Seat Number</Text>
              <Text style={currentStyles.firstName}>
                {education.ExamSeatNumber || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Mark Obtained</Text>
              <Text style={currentStyles.firstName}>
                {education.MarkObtained || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Mark Out of</Text>
              <Text style={currentStyles.firstName}>
                {education.MarkOutof || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Grade</Text>
              <Text style={currentStyles.firstName}>
                {education.Grade || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                {' '}
                Percentage Equivalence CGPA
              </Text>
              <Text style={currentStyles.firstName}>
                {education.PercentageEquivalenceCGPA || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Percentage</Text>
              <Text style={currentStyles.firstName}>
                {education.Percentage || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Class Name</Text>
              <Text style={currentStyles.firstName}>
                {education.ClassName || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Is First Trial?</Text>
              <Text style={currentStyles.firstName}>
                {education.IsFirstTrial === '' ? 'No' : 'Yes'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Is Last Qualifying Exam?
              </Text>
              <Text style={currentStyles.firstName}>
                {education.IsLastQualifyingExam === '' ? 'No' : 'Yes'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Teaching Language</Text>
              <Text style={currentStyles.firstName}>
                {education.LanguageName || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Attach Document</Text>
              <Text style={currentStyles.firstName}>-----</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                {' '}
                Exam Certificate Number
              </Text>
              <Text style={currentStyles.firstName}>
                {education.ExamCertificateNumber || '-'}
              </Text>
            </View>
            {/* Continue rendering based on available fields */}
          </View>
        ))
      ) : (
        <Text>No education data available</Text>
      )}
    </ScrollView>
  );
};

export default Educationinfo;
