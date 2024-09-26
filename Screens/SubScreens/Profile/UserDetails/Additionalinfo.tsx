import {View, Text, Image, useColorScheme, ActivityIndicator} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../ContextApi/AuthContext';
import styles from './styles';

const Additionalinfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authToken, userDetails} = useContext(AuthContext);
  const isDarkMode = useColorScheme() === 'dark';
  const currentStyles = styles(isDarkMode);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/StudentProfileGet',
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
      <Text style={currentStyles.Header}>Additional Personal Details</Text>
      <View style={currentStyles.divider} />
      {data ? (
        <>
          <View style={currentStyles.infoContainer}>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Landline Number (Optional)
              </Text>
              <Text style={currentStyles.firstName}>
                {data.OptionalMobileNo || 'NA'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Aadhar Number</Text>
              <Text style={currentStyles.firstName}>{data.AadharNumber}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Name as per Aadhar Card{' '}
              </Text>
              <Text style={currentStyles.firstName}>{data.NameOnAadhar}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Upload Document (Aadhar Card){' '}
              </Text>
              <Text style={currentStyles.firstName}>------</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Passport Number</Text>
              <Text style={currentStyles.firstName}>
                {data.PassportNumber || 'NA'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Passport Date </Text>
              <Text style={currentStyles.firstName}>
                {data.PassportDate || 'NA'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Country of Citizenship
              </Text>
              <Text style={currentStyles.firstName}>{data.CitizenCountry}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Are you Non Resident Indian (NRI) ?
              </Text>
              <Text style={currentStyles.firstName}>
                {data.IsNRI === 'True' ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Caste </Text>
              <Text style={currentStyles.firstName}>{data.Caste || 'NA'}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Upload Document (Photo Id){' '}
              </Text>
              <Text style={currentStyles.firstName}>-------</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Height (in cms) </Text>
              <Text style={currentStyles.firstName}>{data.HeightInCms}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Weight (in kgs)</Text>
              <Text style={currentStyles.firstName}>{data.WeightInKgs}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Thalassemia Status</Text>
              <Text style={currentStyles.firstName}>
                {data.IsMajorThelesamiaStatus === 'True' ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Do you want to give SMS Permission ?
              </Text>
              <Text style={currentStyles.firstName}>
                {data.IsSmsPermissionGiven === 'True' ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Are you Employed or Self-Employed ?
              </Text>
              <Text style={currentStyles.firstName}>{data.IsEmp || 'No'}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Current Employer Name</Text>
              <Text style={currentStyles.firstName}>
                {data.CurrentEmployerName || 'NA'}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Place Of Birth</Text>
              <Text style={currentStyles.firstName}>
                {' '}
                {data.PlaceOfBirth || 'NA'}{' '}
              </Text>
            </View>
            {/* Social Reservation Details */}

            <Text style={currentStyles.Header}>Social Reservation Details</Text>
            <View style={currentStyles.divider} />
            <Text> Panding</Text>
            {/* Additional Parent's Details */}
            <Text style={currentStyles.Header}>
              Additional Parent's Details
            </Text>
            <View style={currentStyles.divider} />
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Father Occupation</Text>
              <Text style={currentStyles.firstName}>
                {data.CurrentCityVillage}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Current Pincode: </Text>
              <Text style={currentStyles.firstName}>{data.CurrentPincode}</Text>
            </View>
          </View>
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

export default Additionalinfo;
