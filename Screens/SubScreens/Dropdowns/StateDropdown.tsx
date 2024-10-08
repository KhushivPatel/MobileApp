import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AuthContext} from '../../ContextApi/AuthContext'; // Adjust the import path
import {useStudentDetails} from '../../ContextApi/StudentProfileContext'; // Ensure this is correct

const StateDropdown = () => {
  const [states, setStates] = useState([]); // State to hold the fetched state data
  const [selectedState, setSelectedState] = useState(); // State to hold the selected state
  const {authToken} = useContext(AuthContext);
  const {studentProfile, fetchStudentProfile} = useStudentDetails();

  // Fetch states from the API
  const fetchStates = async () => {
    try {
      // Fetch student profile to get the CountryIdOfCitizenship
      await fetchStudentProfile();

      if (studentProfile && studentProfile.CountryIdOfCitizenship) {
        const countryId = studentProfile.CountryIdOfCitizenship; // Dynamically get the CountryId

        const response = await fetch(
          // 'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/StateMasterGet',
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/StateMasterGet',
          {
            method: 'POST', // Use POST method as specified
            headers: {
              'Content-Type': 'application/json', // Ensure to specify the content type
              referer:
                // 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
                'http://172.25.15.22/',
              token: authToken, // Include the token from context
            },
            body: JSON.stringify({Id: countryId}), // Dynamically set the Id
          },
        );

        const result = await response.json();

        // Check if the response is successful
        if (response.ok && result.response_code === '200') {
          setStates(result.obj); // Set the states array from the response
        } else {
          console.error('Failed to fetch states', result);
        }
      }
    } catch (error) {
      console.error('Error fetching states', error);
    }
  };

  // Use effect to fetch states when the component mounts or when studentProfile changes
  useEffect(() => {
    fetchStates();
  }, [studentProfile]); // Fetch states whenever studentProfile updates

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select State:</Text>
      <Picker
        selectedValue={selectedState}
        style={styles.picker}
        onValueChange={itemValue => setSelectedState(itemValue)}>
        {states.map(state => (
          <Picker.Item
            key={state.Id}
            label={state.StateName}
            value={state.Id}
          />
        ))}
      </Picker>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default StateDropdown;
