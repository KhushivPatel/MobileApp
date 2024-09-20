import {
  View,
  Text,
  Image,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import createStyles from '../styles';

const SimpleView = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  // State to store the API response data
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentIDCard1/GenerateID',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token:
                ':HyO73GfguxHlJx:HyO73Gf:2442358;4:HyO73Gf[5Kkqex:OrFVWU6TWXehMNGYI',
            },
            body: JSON.stringify({
              ProgrammeId: 1,
            }),
          },
        );

        const data = await response.json();

        if (data.response_code === '200') {
          setStudentData(data.obj);
        } else {
          console.error('Error fetching data:', data.ErrorMessage);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5287D7" />
      </View>
    );
  }

  if (!studentData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }
  return (
    <View style={styles.detailcontainer}>
      <View style={styles.titleview}>
        <Image
          source={require('../../../../../assets/images/msu_logo.png')}
          style={styles.logo}
        />
        <View style={styles.logotextcontainer}>
          <Text style={styles.logotext}>
            The Maharaja Sayajirao University, Baroda
          </Text>
          <Text style={styles.idtext}>STUDENT ID CARD</Text>
        </View>
      </View>
      <View style={styles.idcardcontainer}>
        <Image
          source={require('../../../../../assets/images/idcard.png')}
          style={styles.studentimg}
        />
        <View style={styles.iddetail1}>
          <View style={styles.iddetail}>
            <Text style={styles.idtext}>NAME</Text>
            <Text style={styles.idtextr}>{studentData.FirstName}</Text>
          </View>
          <View style={styles.iddetail}>
            <Text style={styles.idtext}>FACULTY</Text>
            <Text style={styles.idtextr}>{studentData.FacultyName}</Text>
          </View>
          <View style={styles.iddetail}>
            <Text style={styles.idtext}>BRANCH/SPEC.</Text>
            <Text style={styles.idtextr}>{studentData.BranchName}</Text>
          </View>
          <View style={styles.iddetail}>
            <Text style={styles.idtext}>PRN</Text>
            <Text style={styles.idtextr}>{studentData.PRN}</Text>
          </View>
          <View style={styles.iddetail}>
            <Text style={styles.idtext}>CLASS</Text>
            <Text style={styles.idtextr}> {studentData.PartShortName}</Text>
          </View>
          <View style={styles.iddetail}>
            <Text style={styles.idtext}>VALIDITY PERIOD</Text>
            <Text style={styles.idtextr}>
              {' '}
              {studentData.IssueDate} To {studentData.ValidDate}
            </Text>
          </View>
          <View style={styles.iddetail}>
            <Text style={styles.idtext}>DOB</Text>
            <Text style={styles.idtextr}>{studentData.DOB}</Text>
          </View>
          <View style={styles.iddetail}>
            <Text style={styles.idtext}>BLOOD GROUP</Text>
            <Text style={styles.idtextr}>{studentData.BloodGroupName}</Text>
          </View>
          <View style={styles.iddetail}>
            <Text style={styles.idtext}>CONTACT NO.</Text>
            <Text style={styles.idtextr}>{studentData.MobileNo}</Text>
          </View>
          <View style={styles.iddetail}>
            <Text style={styles.idtext}>ADDRESS</Text>
            <Text style={styles.idtextr}>{studentData.PermanentAddress}</Text>
          </View>
          <View style={styles.signaturecontainer}>
            <Image
              source={require('../../../../../assets/images/signature.png')}
              style={styles.signature}
            />
            <Text style={styles.idtext}>
              {' '}
              <Text style={styles.idtext}> {studentData.AuthorityType}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SimpleView;
