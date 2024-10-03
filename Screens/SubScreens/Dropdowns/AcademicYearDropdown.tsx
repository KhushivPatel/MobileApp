import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Import the Picker component
import {AuthContext} from '../../ContextApi/AuthContext'; // Assuming you are using an AuthContext for the token

const AcademicYearDropdown = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null); // State to manage selected year
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authToken} = useContext(AuthContext); // Fetch the auth token from the context

  // Fetch Academic Year Data
  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await fetch(
          'https://admission.msubaroda.ac.in/MSUIS_AdminAPI/api/MstProgramInstance/AcademicYearGet',
          {
            method: 'POST', // Ensure POST is correct based on the API documentation
            headers: {
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken, // Add the auth token in the headers
              'Content-Type': 'application/json', // Added content type
            },
            body: JSON.stringify({}), // Optional: Add a request body if required by the API
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch academic years');
        }

        const result = await response.json();

        if (result.response_code === '200') {
          setAcademicYears(result.obj); // Store the academic year data
        } else {
          throw new Error('Failed to load academic years');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicYears();
  }, [authToken]);

  // Loading state
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  // On change handler for dropdown
  const handleChange = year => {
    setSelectedYear(year);
    Alert.alert('Selected Academic Year', year); // Optionally display an alert with the selected year
  };

  return (
    <View style={{padding: 20}}>
      <Text>Select Academic Year:</Text>

      <Picker
        selectedValue={selectedYear}
        onValueChange={handleChange}
        style={{height: 50, width: 250}}>
        <Picker.Item label="Select an academic year" value={null} />
        {academicYears.map(year => (
          <Picker.Item
            key={year.Id}
            label={year.AcademicYearCode}
            value={year.AcademicYearCode}
          />
        ))}
      </Picker>

      {selectedYear && (
        <Text style={{marginTop: 20}}>Selected Year: {selectedYear}</Text>
      )}
    </View>
  );
};

export default AcademicYearDropdown;
