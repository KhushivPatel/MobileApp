import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../ContextApi/AuthContext';
import styles from './styles';

const PersonalInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Add edit mode state
  const [fatherName, setFatherName] = useState('');
  const [sponsorName, setSponsorName] = useState('');

  const {authToken, userDetails} = useContext(AuthContext);
  const isDarkMode = useColorScheme() === 'dark';
  const currentStyles = styles(isDarkMode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/StudentProfileGet',
          {
            method: 'GET',
            headers: {
              Referer:
                'http://172.25.15.22/',
              Token: authToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const profileData = result.obj[0];
        setData(profileData); // Access the first object directly
        setFatherName(profileData.NameOfFather); // Set initial father name
        setSponsorName(profileData.SponsorName); // Set initial sponsor name
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    // Perform API call to save the updated data if needed
    setData({...data, NameOfFather: fatherName, SponsorName: sponsorName});
    setIsEditMode(false);
  };

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
      <Text style={currentStyles.Header}>Personal Details</Text>
      <View style={currentStyles.divider} />

      {data ? (
        <>
          <View style={currentStyles.infoContainer}>
            {/* Father Name - Editable */}
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Father Name: </Text>
              {isEditMode ? (
                <TextInput
                  style={currentStyles.input}
                  value={fatherName}
                  onChangeText={setFatherName}
                />
              ) : (
                <Text style={currentStyles.firstName}>{data.NameOfFather}</Text>
              )}
            </View>

            {/* Sponsor Name - Editable */}
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Sponsor Name: </Text>
              {isEditMode ? (
                <TextInput
                  style={currentStyles.input}
                  value={sponsorName}
                  onChangeText={setSponsorName}
                />
              ) : (
                <Text style={currentStyles.firstName}>
                  {data.SponsorName || 'N/A'}
                </Text>
              )}
            </View>

            {/* Other personal information (non-editable in this example) */}
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Gender: </Text>
              <Text style={currentStyles.firstName}>{data.Gender}</Text>
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Email: </Text>
              <Text style={currentStyles.firstName}>{data.EmailId}</Text>
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Mobile No: </Text>
              <Text style={currentStyles.firstName}>{data.MobileNo}</Text>
            </View>

            {/* Add more fields as needed */}

            {/* Edit and Save Button */}
            <View style={currentStyles.buttonContainer}>
              {isEditMode ? (
                <Button title="Save" onPress={handleSave} />
              ) : (
                <Button title="Edit" onPress={handleEdit} />
              )}
            </View>
          </View>
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

export default PersonalInfo;
