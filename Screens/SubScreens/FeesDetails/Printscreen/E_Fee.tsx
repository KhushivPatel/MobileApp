import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../../../CommanText/BackButton';
import axios from 'axios';
import {AuthContext} from '../../../ContextApi/AuthContext';

const E_Fee = ({route}) => {
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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <Text>No data available.</Text>
      </View>
    );
  }

  const {ObjStudConsolidatedResult, ObjLstPaperResultModel} = data;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <BackButton />
        <Text style={styles.headingText}>{actionType}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.maincontainer}>
          {/* Student Information */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailtextbold}>
              PRN: {ObjStudConsolidatedResult.StudentPRN}
            </Text>
            <Text style={styles.detailtextbold}>
              Seat Number: {ObjStudConsolidatedResult.SeatNumber}
            </Text>
            <Text style={styles.detailtextbold}>
              Name: {ObjStudConsolidatedResult.StudentName}
            </Text>
            <Text style={styles.detailtextbold}>
              Mother Name: {ObjStudConsolidatedResult.MotherName}
            </Text>
            <Text style={styles.detailtextbold}>
              Faculty: {ObjStudConsolidatedResult.FacultyName}
            </Text>
            <Text style={styles.detailtextbold}>
              Programme: {ObjStudConsolidatedResult.ProgrammeName}
            </Text>
            <Text style={styles.detailtextbold}>
              Specialization: {ObjStudConsolidatedResult.SpecialisationName}
            </Text>
          </View>

          {/* Marks and Grades */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailtext}>
              Marks Obtained: {ObjStudConsolidatedResult.MarksObtained} /{' '}
              {ObjStudConsolidatedResult.MarksObtainedOutof}
            </Text>
            <Text style={styles.detailtext}>
              Percentage: {ObjStudConsolidatedResult.Percentage}%
            </Text>
            <Text style={styles.detailtext}>
              Grade: {ObjStudConsolidatedResult.Grade}
            </Text>
            <Text style={styles.detailtext}>
              SGPA: {ObjStudConsolidatedResult.SGPA}
            </Text>
            <Text style={styles.detailtext}>
              CGPA: {ObjStudConsolidatedResult.CGPA}
            </Text>
            <Text style={styles.detailtext}>
              Result Status: {ObjStudConsolidatedResult.ResultStatus}
            </Text>
            <Text style={styles.detailtext}>
              Exam Event: {ObjStudConsolidatedResult.ExamEventName}
            </Text>
            <Text style={styles.detailtext}>
              Total Credits: {ObjStudConsolidatedResult.TotalCredit}
            </Text>
          </View>

          {/* Paper Results */}
          <Text style={styles.subHeading}>Paper Results:</Text>
          {ObjLstPaperResultModel.map((paper, index) => (
            <View key={index} style={styles.feeTotalsContainer}>
              <View style={styles.feeHeader}>
                <Text style={styles.feeHeaderTextBold}>
                  Paper: {paper.PaperName}
                </Text>
              </View>
              <View style={styles.feeItem}>
                <Text style={styles.feeHeaderTextBold}>
                  Final Marks: {paper.FinalMarks}
                </Text>
              </View>
              <View style={styles.feeItem1}>
                <Text style={styles.feeHeaderTextBold}>
                  Final Grade: {paper.FinalGrade}
                </Text>
              </View>
              <View style={styles.feeItem1}>
                <Text style={styles.feeHeaderTextBold}>
                  Credits: {paper.Credit}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default E_Fee;

// Updated Styles (same as in the first page)

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  detailsContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  detailtextbold: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  detailtext: {
    fontSize: 14,
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  feeTotalsContainer: {
    marginBottom: 10,
  },
  feeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeHeaderTextBold: {
    fontWeight: 'bold',
  },
  feeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeItem1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  scrollContainer: {
    padding: 16,
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
