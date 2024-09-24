import {View, Text, ActivityIndicator, Image, StyleSheet, useColorScheme} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../../ContextApi/AuthContext';
import styles from './styles';
const PersonalInfo = () => {
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
      <ActivityIndicator
        size="large"
        color="#5287D7"
        style={currentStyles.spinner}
      />
    );
  }

  if (error) {
    return <Text style={currentStyles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={currentStyles.container}>
      <Text style={currentStyles.Header}>Personal Details</Text>
      <View style={currentStyles.divider} />
      {data ? (
        <>
          <View style={currentStyles.infoContainer}>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Name: </Text>
              <Text style={currentStyles.firstName}>
                {data.FirstName} {data.LastName}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Gender: </Text>
              <Text style={currentStyles.firstName}>{data.Gender}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Mother Name: </Text>
              <Text style={currentStyles.firstName}>{data.MotherName}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Father Name: </Text>
              <Text style={currentStyles.firstName}>{data.NameOfFather}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Email: </Text>
              <Text style={currentStyles.firstName}>{data.EmailId}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Mobile No: </Text>
              <Text style={currentStyles.firstName}>{data.MobileNo}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>PRN: </Text>
              <Text style={currentStyles.firstName}>{data.PRN}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>DOB: </Text>
              <Text style={currentStyles.firstName}>{data.DOB}</Text>
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Marital Status: </Text>
              <Text style={currentStyles.firstName}>{data.MaritalStatus}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Religion: </Text>
              <Text style={currentStyles.firstName}>{data.ReligionName}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Mother Tongue: </Text>
              <Text style={currentStyles.firstName}>
                {data.MotherTongueName}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Do you belong to Vadodara(District) ?:{' '}
              </Text>
              <Text style={currentStyles.firstName}>
                {data.IsLocalToVadodara}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Have your Communication Address (Present Address) same as
                Permanent Residential Address ?:{' '}
              </Text>
              <Text style={currentStyles.firstName}>
                {data.IsCurrentAsPermanent}
              </Text>
            </View>

            {/*  */}
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Permanent Address: </Text>
              <Text style={currentStyles.firstName}>
                {data.PermanentAddress}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Permanent Country: </Text>
              <Text style={currentStyles.firstName}>
                {data.PermanentCountry}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Permanent State: </Text>
              <Text style={currentStyles.firstName}>{data.PermanentState}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Permanent District: </Text>
              <Text style={currentStyles.firstName}>
                {data.PermanentDistrict}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Permanent City/ Village:{' '}
              </Text>
              <Text style={currentStyles.firstName}>
                {data.PermanentCityVillage}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Permanent Pincode: </Text>
              <Text style={currentStyles.firstName}>
                {data.PermanentPincode}
              </Text>
            </View>
            {/*  */}
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Current Address: </Text>
              <Text style={currentStyles.firstName}>{data.CurrentAddress}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Current Country: </Text>
              <Text style={currentStyles.firstName}>{data.CurrentCountry}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Current State: </Text>
              <Text style={currentStyles.firstName}>{data.CurrentState}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Current District: </Text>
              <Text style={currentStyles.firstName}>
                {data.CurrentDistrict}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>
                Current City/Village:{' '}
              </Text>
              <Text style={currentStyles.firstName}>
                {data.CurrentCityVillage}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Current Pincode: </Text>
              <Text style={currentStyles.firstName}>{data.CurrentPincode}</Text>
            </View>
          </View>
          {data.StudentSignature && (
            <Image
              source={{
                uri: `https://admission.msubaroda.ac.in/Vidhyarthi_API/Signature/${data.StudentSignature}`,
              }}
              style={currentStyles.signatureImage}
              resizeMode="contain"
            />
          )}
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

export default PersonalInfo;
