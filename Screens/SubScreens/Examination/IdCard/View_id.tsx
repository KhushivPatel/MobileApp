/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import createStyles from './styles';
import { AuthContext } from '../../../ContextApi/AuthContext';

const View_id = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  const {authToken, userDetails} = useContext(AuthContext);
  // State to store the API response data
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // State to toggle between Simple View and ID Card View
  const [isIDCardView, setIsIDCardView] = useState(false); // False = Simple View, True = ID Card View

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
              Token: authToken,
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

  // Display a loading spinner while fetching data
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#5287D7" />
      </View>
    );
  }

  // If no data is available, show a message
  if (!studentData) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Generate ID Card</Text>
      </View>

      {/* Buttons to switch between Simple View and ID Card View */}
      <View style={styles.selectcontainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsIDCardView(false)} // Switch to Simple View
        >
          <Text style={styles.text}>Simple View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsIDCardView(true)} // Switch to ID Card View
        >
          <Text style={styles.text}>ID Card View</Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally render based on isIDCardView state */}
      {isIDCardView ? (
        <ScrollView style={styles.scrollView}>
          {/* ID Card View */}
          <View style={styles.mainContent}>
            {/* id card */}
            <View style={styles.detailcontainer}>
              <View style={styles.titleview}>
                <Image
                  source={require('../../../../assets/images/msu_logo.png')}
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
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  {/* First Image */}
                  <Image
                    source={require('../../../../assets/images/idcard.png')}
                    style={styles.studentimg} // Adjust size here
                  />
                  {/* Second Image (below the first one) */}
                  <Image
                    source={require('../../../../assets/images/signature.png')}
                    style={styles.studentimg} // Adjust size here
                  />
                  {/* Text below the second image */}
                  <Text style={styles.idtext}>
                    {' '}
                    {studentData.AuthorityType}
                  </Text>
                </View>
                <View style={styles.iddetail1}>
                  <View style={styles.iddetail}>
                    <Text style={styles.idtext}>NAME</Text>
                    <Text style={styles.idtextr}>{studentData.FirstName}</Text>
                  </View>
                  <View style={styles.iddetail}>
                    <Text style={styles.idtext}>FACULTY</Text>
                    <Text style={styles.idtextr}>
                      {studentData.FacultyName}
                    </Text>
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
                    <Text style={styles.idtextr}>
                      {' '}
                      {studentData.PartShortName}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.detailcontainer}>
              <View style={styles.titleview}>
                <Image
                  source={require('../../../../assets/images/msu_logo.png')}
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
                  source={{
                    uri: 'https://i.pinimg.com/564x/d8/11/10/d81110f74b45542aa26eddc290592ed8.jpg',
                  }}
                  style={styles.studentimg}
                />
                <View style={styles.iddetail1}>
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
                    <Text style={styles.idtextr}>
                      {studentData.BloodGroupName}
                    </Text>
                  </View>
                  <View style={styles.iddetail}>
                    <Text style={styles.idtext}>CONTACT NO.</Text>
                    <Text style={styles.idtextr}>{studentData.MobileNo}</Text>
                  </View>
                  <View style={styles.iddetail}>
                    <Text style={styles.idtext}>ADDRESS</Text>
                    <Text style={styles.idtextr}>
                      {studentData.PermanentAddress}
                    </Text>
                  </View>
                  {/* new */}
                </View>
              </View>
            </View>
            {/*  */}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* Simple View */}
          <View style={styles.mainContent}>
            <View style={styles.detailcontainer}>
              <View style={styles.titleview}>
                <Image
                  source={require('../../../../assets/images/msu_logo.png')}
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
                  source={require('../../../../assets/images/idcard.png')}
                  style={styles.studentimg}
                />
                <View style={styles.iddetail1}>
                  <View style={styles.iddetail}>
                    <Text style={styles.idtext}>NAME</Text>
                    <Text style={styles.idtextr}>{studentData.FirstName}</Text>
                  </View>
                  <View style={styles.iddetail}>
                    <Text style={styles.idtext}>FACULTY</Text>
                    <Text style={styles.idtextr}>
                      {studentData.FacultyName}
                    </Text>
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
                    <Text style={styles.idtextr}>
                      {' '}
                      {studentData.PartShortName}
                    </Text>
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
                    <Text style={styles.idtextr}>
                      {studentData.BloodGroupName}
                    </Text>
                  </View>
                  <View style={styles.iddetail}>
                    <Text style={styles.idtext}>CONTACT NO.</Text>
                    <Text style={styles.idtextr}>{studentData.MobileNo}</Text>
                  </View>
                  <View style={styles.iddetail}>
                    <Text style={styles.idtext}>ADDRESS</Text>
                    <Text style={styles.idtextr}>
                      {studentData.PermanentAddress}
                    </Text>
                  </View>
                  <View style={styles.signaturecontainer}>
                    <Image
                      source={require('../../../../assets/images/signature.png')}
                      style={styles.signature}
                    />
                    <Text style={styles.idtext}>
                      {' '}
                      <Text style={styles.idtext}>
                        {' '}
                        {studentData.AuthorityType}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default View_id;
