import {View, Text, Image, ActivityIndicator, useColorScheme} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './styles';
import { AuthContext } from '../../../ContextApi/AuthContext';

const Educationinfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authToken} = useContext(AuthContext);
  const isDarkMode = useColorScheme() === 'dark';
  const currentStyles = styles(isDarkMode);
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
        setData(result.obj[0]); // Access the first object directly
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
    <View style={currentStyles.container}>
      <Text style={currentStyles.Header}>
        Education Details - [HSC / 12th / Intermediate]
      </Text>
      <View style={currentStyles.divider} />
      {data ? (
        <>
          <View style={currentStyles.infoContainer}>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Eligible Degree</Text>
              <Text style={currentStyles.firstName}>
                {data.EligibleDegreeName}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Specialization</Text>
              <Text style={currentStyles.firstName}>
                {data.SpecializationName}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Board/University</Text>
              <Text style={currentStyles.firstName}>
                {data.ExaminationBodyName}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Faculty/School/College Name
              </Text>
              <Text style={currentStyles.firstName}>
                {data.InstituteAttended}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>School No</Text>
              <Text style={currentStyles.firstName}>
                {data.SchoolNo || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Institute City</Text>
              <Text style={currentStyles.firstName}>{data.CityName}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Other Institute Name</Text>
              <Text style={currentStyles.firstName}>
                {data.OtherCity || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Exam Pass Location</Text>
              <Text style={currentStyles.firstName}>{data.ExamPassCity}</Text>
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Result Status</Text>
              <Text style={currentStyles.firstName}>{data.ResultStatus}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Declaration of Marksheet
              </Text>
              <Text style={currentStyles.firstName}>
                {data.IsDeclared === 'True' ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Exam Pass month</Text>
              <Text style={currentStyles.firstName}>
                {data.ExamPassMonth || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Exam Pass Year</Text>
              <Text style={currentStyles.firstName}>
                {data.ExamPassYear || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Exam Seat Number</Text>
              <Text style={currentStyles.firstName}>
                {data.ExamSeatNumber || '-'}
              </Text>
            </View>

            {/*  */}
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Mark Obtained</Text>
              <Text style={currentStyles.firstName}>
                {data.MarkObtained || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Mark Out of</Text>
              <Text style={currentStyles.firstName}>
                {data.MarkOutof || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Grade</Text>
              <Text style={currentStyles.firstName}>{data.Grade || '-'}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Percentage Equivalence CGPA
              </Text>
              <Text style={currentStyles.firstName}>
                {data.PercentageEquivalenceCGPA || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Percentage</Text>
              <Text style={currentStyles.firstName}>
                {data.Percentage || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Class Name</Text>
              <Text style={currentStyles.firstName}>
                {data.ClassName || '-'}
              </Text>
            </View>
            {/*  */}
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Is First Trial?</Text>
              <Text style={currentStyles.firstName}>
                {data.IsFirstTrial === '' ? 'No' : 'Yes'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Is Last Qualifying Exam?
              </Text>
              <Text style={currentStyles.firstName}>
                {data.IsLastQualifyingExam === '' ? 'No' : 'Yes'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Teaching Language</Text>
              <Text style={currentStyles.firstName}>
                {data.LanguageName || '-'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Attach Document</Text>
              <Text style={currentStyles.firstName}>----</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Exam Certificate Number
              </Text>
              <Text style={currentStyles.firstName}>
                {data.ExamCertificateNumber || '-'}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};
export default Educationinfo;
