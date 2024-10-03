import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import BackButton from '../../../CommanText/BackButton';
import axios from 'axios';
import {AuthContext} from '../../../ContextApi/AuthContext';

const ResultPrint = ({route}) => {
  const {authToken} = useContext(AuthContext);
  const {row} = route.params; // Removed actionType as it's not used
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentDashboard/GetExamFeeReceipt',
          {
            ApplicationId: row.ApplicationId,
            SpecialisationId: row.SpecialisationId,
            IndexPreExaminationId: row.IndexPreExaminationId,
            EvaluationId: row.EvaluationId,
            InstancePartTermName: row.InstancePartTermName,
            InstanceName: row.InstanceName,
            ReAssessmentBtn: row.ReAssessmentBtn,
            ReAssessmentRecieptBtn: row.ReAssessmentRecieptBtn,
            FormNo: row.FormNo,
            SeatNumber: row.SeatNumber,
            ResultStatus: row.ResultStatus,
            FacultyName: row.FacultyName,
            DisplayName: row.DisplayName,
            IsExamFeesPaid: row.IsExamFeesPaid,
            PRN: row.PRN,
            ExamEventId: row.ExamEventId,
            ProgInstPartTermId: row.ProgInstPartTermId,
            AppearanceType: row.AppearanceType,
            AppearanceTypeId: row.AppearanceTypeId,
            ProgrammePartTermId: row.ProgrammePartTermId,
            IsExemptedForExamFee: row.IsExemptedForExamFee,
            ExamFeeAmount: row.ExamFeeAmount,
            ExamFeeStartDateView: row.ExamFeeStartDateView,
            ExamFeeEndDateForStudentView: row.ExamFeeEndDateForStudentView,
            ExamFeeEndDateForFacultyView: row.ExamFeeEndDateForFacultyView,
            ExamFeeStartDate: row.ExamFeeStartDate,
            ExamFeeEndDateForStudent: row.ExamFeeEndDateForStudent,
            ExamFeeEndDateForFaculty: row.ExamFeeEndDateForFaculty,
            CourseScheduleMapId: row.CourseScheduleMapId,
            InwardMode: row.InwardMode,
            IncStudentAcademicInfoId: row.IncStudentAcademicInfoId,
            ExamFeeStartFlag: row.ExamFeeStartFlag,
            ExamVenueId: row.ExamVenueId,
            IsHallTicket: row.IsHallTicket,
            IsResult: row.IsResult,
            IsTimetable: row.IsTimetable,
            OrderId: row.OrderId,
            ProgrammeInstancePartTermId: row.ProgInstPartTermId,
          },
          {
            headers: {
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken,
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.data.response_code === '200') {
          setData(response.data.obj);
        } else {
          setError('Failed to fetch data.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [row]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!data) {
    return <Text>No data available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <BackButton />
      <View style={styles.receiptContainer}>
        <Text style={styles.heading}>Exam Fee Receipt</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{data.NameAsPerMarkSheet}</Text>

        <Text style={styles.label}>PRN:</Text>
        <Text style={styles.value}>{data.PRN}</Text>

        <Text style={styles.label}>Faculty:</Text>
        <Text style={styles.value}>{data.FacultyName}</Text>

        <Text style={styles.label}>Programme:</Text>
        <Text style={styles.value}>{data.InstanceName}</Text>

        <Text style={styles.label}>Branch:</Text>
        <Text style={styles.value}>{data.BranchName}</Text>

        <Text style={styles.label}>Order ID:</Text>
        <Text style={styles.value}>{data.OrderId}</Text>

        <Text style={styles.label}>Transaction Date:</Text>
        <Text style={styles.value}>{data.TransactionDateShow}</Text>

        <Text style={styles.label}>Exam Fee Amount:</Text>
        <Text style={styles.value}>₹ {data.ExamFeeAmount.toFixed(2)}</Text>

        <Text style={styles.label}>Instance Part Term:</Text>
        <Text style={styles.value}>{data.InstancePartTermName}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  receiptContainer: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2, // Adds shadow effect
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ResultPrint;
