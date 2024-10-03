import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import BackButton from '../../CommanText/BackButton';
import axios from 'axios';
import { AuthContext } from '../../ContextApi/AuthContext';

const DetailsScreen = ({route}) => {
    
  const {authToken} = useContext(AuthContext);
  const {row, actionType} = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/ProvisionalResult/GenerateProvisionalResult',
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
              Referer: 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken,
              'Content-Type': 'application/json',
            },
        }
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
    return <Text>Error: {error}</Text>;
  }

  if (!data) {
    return <Text>No data available.</Text>;
  }

  const {ObjStudConsolidatedResult} = data;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <BackButton />
        <Text style={styles.headingText}>{actionType}</Text>
      </View>
      <Text style={styles.detailText}>
        PRN: {ObjStudConsolidatedResult.StudentPRN}
      </Text>
      <Text style={styles.detailText}>
        Seat Number: {ObjStudConsolidatedResult.SeatNumber}
      </Text>
      <Text style={styles.detailText}>
        Student Name: {ObjStudConsolidatedResult.StudentName}
      </Text>
      <Text style={styles.detailText}>
        Mother Name: {ObjStudConsolidatedResult.MotherName}
      </Text>
      <Text style={styles.detailText}>
        Faculty: {ObjStudConsolidatedResult.FacultyName}
      </Text>
      <Text style={styles.detailText}>
        Programme: {ObjStudConsolidatedResult.ProgrammeName}
      </Text>
      <Text style={styles.detailText}>
        Specialization: {ObjStudConsolidatedResult.SpecialisationName}
      </Text>
      <Text style={styles.detailText}>
        Marks Obtained: {ObjStudConsolidatedResult.MarksObtained} /{' '}
        {ObjStudConsolidatedResult.MarksObtainedOutof}
      </Text>
      <Text style={styles.detailText}>
        Percentage: {ObjStudConsolidatedResult.Percentage}%
      </Text>
      <Text style={styles.detailText}>
        Grade: {ObjStudConsolidatedResult.Grade}
      </Text>
      <Text style={styles.detailText}>
        SGPA: {ObjStudConsolidatedResult.SGPA}
      </Text>
      <Text style={styles.detailText}>
        CGPA: {ObjStudConsolidatedResult.CGPA}
      </Text>
      <Text style={styles.detailText}>
        Result Status: {ObjStudConsolidatedResult.ResultStatus}
      </Text>
      <Text style={styles.detailText}>
        Exam Event: {ObjStudConsolidatedResult.ExamEventName}
      </Text>
      <Text style={styles.detailText}>
        Total Credits: {ObjStudConsolidatedResult.TotalCredit}
      </Text>

      {/* Display Paper Results */}
      <Text style={styles.subHeading}>Paper Results:</Text>
      {data.ObjLstPaperResultModel.map((paper, index) => (
        <View key={index} style={styles.paperResult}>
          <Text style={styles.detailText}>Paper Name: {paper.PaperName}</Text>
          <Text style={styles.detailText}>Final Marks: {paper.FinalMarks}</Text>
          <Text style={styles.detailText}>Final Grade: {paper.FinalGrade}</Text>
          <Text style={styles.detailText}>Credits: {paper.Credit}</Text>
          <Text style={styles.detailText}>
            Grade Points: {paper.GradePoints}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default DetailsScreen;
