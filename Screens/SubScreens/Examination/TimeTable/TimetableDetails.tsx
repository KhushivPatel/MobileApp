/* eslint-disable radix */
/* eslint-disable no-catch-shadow */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../ContextApi/AuthContext';
import { useExamContext } from '../../../ContextApi/ExamProvider';

interface ExamDetail {
  ApplicationId: number;
  InstancePartTermName: string;
  SeatNumber: string;
  DisplayName: string;
  AppearanceType: string;
  FormNo: number;
  ExamFeeAmount: number;
  ExamFeeStartDateView: string;
  ExamFeeEndDateForStudentView: string;
  ResultStatus: string;
  FacultyName: string;
  ProgInstPartTermId: number;
  examEventId: number;
}

const TimetableList: React.FC = () => {
  const {examDetails} = useExamContext();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const currentStyles = styles(isDarkMode);
  const {authToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {setExamDetails} = useExamContext(); // Get context function

  const fetchExamDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentDashboard/ApplicantPreExaminationDetails',
        {
          method: 'GET',
          headers: {
            referer: 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
            token: authToken,
          },
        },
      );

      const result = await response.json();
      if (response.ok && result.response_code === '200') {
          setExamDetails(result.obj);
      } else {
        setError('Failed to fetch exam details');
        console.error('Failed to fetch exam details', result);
      }
    } catch (error) {
      setError('Error fetching exam details');
      console.error('Error fetching exam details', error);
    } finally {
      setLoading(false);
    }
  };
  // const GotoTimetable = () => {
  //   navigation.navigate('View_timetable');
  // };
const GotoTimetable = (ProgInstPartTermId: number, examEventId: number) => {
  // console.warn('Navigating to View_timetable with:', {
  //   ProgInstPartTermId,
  //   examEventId,
  // }); // Log the values
  navigation.navigate('View_timetable', {
    ProgInstPartTermId,
    examEventId,
  });
};

  useEffect(() => {
    fetchExamDetails();
  }, [authToken]);

  // Sort exam details based on the year
  const sortedExamDetails = examDetails.sort((a, b) => {
    const currentYear = new Date().getFullYear();
    const aYear = parseInt(a.DisplayName.match(/\d{4}/)?.[0] || '0');
    const bYear = parseInt(b.DisplayName.match(/\d{4}/)?.[0] || '0');

    // Place current year exams first
    if (aYear === currentYear && bYear !== currentYear) return -1;
    if (bYear === currentYear && aYear !== currentYear) return 1;
    return aYear - bYear; // Sort by year
  });

  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.header}>
        <Text style={currentStyles.headerText}>Examination Details</Text>
      </View>
      {loading ? (
        <View style={{alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading exam details...</Text>
        </View>
      ) : error ? (
        <Text style={{color: 'red'}}>{error}</Text>
      ) : (
        <ScrollView style={currentStyles.scrollView}>
          <View style={currentStyles.mainContent}>
            {sortedExamDetails.map((detail, index) => (
              <View
                key={`${detail.ApplicationId}-${index}`}
                style={currentStyles.detailContainer}>
                <View style={currentStyles.textContainerRight}>
                  <Text
                    style={[currentStyles.textRight, currentStyles.boldText]}>
                    Faculty Name
                  </Text>
                  <Text style={currentStyles.textRight}>
                    {detail.FacultyName}
                  </Text>
                </View>
                <View style={currentStyles.textRow}>
                  <Text style={currentStyles.textLeft}>Semester</Text>
                  <Text style={currentStyles.textRight}>
                    {detail.InstancePartTermName}
                  </Text>
                </View>
                <View style={currentStyles.textRow}>
                  <Text style={currentStyles.textLeft}>Seat Number</Text>
                  <Text style={currentStyles.textRight}>
                    {detail.SeatNumber}
                  </Text>
                </View>
                <View style={currentStyles.textRow}>
                  <Text style={currentStyles.textLeft}>Exam Event</Text>
                  <Text style={currentStyles.textRight}>
                    {detail.DisplayName}
                  </Text>
                </View>
                <View style={currentStyles.textRow}>
                  <Text style={currentStyles.textLeft}>Appearance Type</Text>
                  <Text style={currentStyles.textRight}>
                    {detail.AppearanceType}
                  </Text>
                </View>
                <View style={currentStyles.textRow}>
                  <Text style={currentStyles.textLeft}>Form No</Text>
                  <Text style={currentStyles.textRight}>{detail.FormNo}</Text>
                </View>
                <View style={currentStyles.textRow}>
                  <Text style={currentStyles.textLeft}>Exam Fee Amount</Text>
                  <Text style={currentStyles.textRight}>
                    ₹{detail.ExamFeeAmount.toFixed(2)}
                  </Text>
                </View>
                <View style={currentStyles.textRow}>
                  <Text style={currentStyles.textLeft}>Fee Start Date</Text>
                  <Text style={currentStyles.textRight}>
                    {detail.ExamFeeStartDateView}
                  </Text>
                </View>
                <View style={currentStyles.textRow}>
                  <Text style={currentStyles.textLeft}>Fee End Date</Text>
                  <Text style={currentStyles.textRight}>
                    {detail.ExamFeeEndDateForStudentView}
                  </Text>
                </View>
                <View style={currentStyles.textRow}>
                  <Text style={currentStyles.textLeft}>Result Status</Text>
                  <Text style={currentStyles.textRight}>
                    {detail.ResultStatus}
                  </Text>
                </View>
                <TouchableOpacity
                  style={currentStyles.button}
                  onPress={() =>
                    GotoTimetable(detail.ProgInstPartTermId, detail.ExamEventId)
                  }>
                  <Text style={currentStyles.buttonText}>
                    View Exam Time Table
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default TimetableList;
