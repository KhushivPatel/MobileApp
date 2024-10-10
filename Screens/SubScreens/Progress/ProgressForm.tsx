import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker'; // For file uploads
import { AuthContext } from '../../ContextApi/AuthContext';
import {Picker} from '@react-native-picker/picker';

const ProgressForm = () => {
   const {authToken} = useContext(AuthContext);
  const [progressionType, setProgressionType] = useState<string | number>(''); // Dropdown for Progression Type
  const [formData, setFormData] = useState<any>({
    ProgressionType: '',
    ProgressionStatus: '',
    CompanyOrUniversity: '',
    Location: '',
    State: '',
    City: '',
    PositionOrCourse: '',
    TentativeJoiningDate: '',
    progressionUploadPdf: null,
    CTC: '',
    Note: '',
    OfferLetterOrAdmissionLetter: null,
    Resume: null,
    Reason: '',
  });

const handleFileUpload = async (field: string) => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    // Update formData with the selected file
    setFormData(prevState => ({
      ...prevState,
      [field]: res[0] || null, // Ensure you're selecting the first file
    }));
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('User cancelled the picker');
    } else {
      console.error('Error picking file:', err);
    }
  }
};

const handleSubmit = async () => {
    // Create an object to hold the form data based on the selected progression type
    let formDataToSend;

    // Check the selected progression type and create the appropriate object
    if (progressionType === '1') { // Employment
        formDataToSend = {
            ProgressionType: progressionType,
            ProgressionStatus: formData.ProgressionStatus,
            CompanyOrUniversity: formData.CompanyOrUniversity,
            Location: formData.Location,
            State: formData.State,
            City: formData.City,
            PositionOrCourse: formData.PositionOrCourse,
            TentativeJoiningDate: formData.TentativeJoiningDate,
            CTC: formData.CTC,
        };

        // Append files if needed
        if (formData.OfferLetterOrAdmissionLetter) {
            formDataToSend.OfferLetterOrAdmissionLetter = formData.OfferLetterOrAdmissionLetter; // handle file if required
        }

        if (formData.Resume) {
            formDataToSend.Resume = formData.Resume; // handle file if required
        }
        
    } else if (progressionType === '2') { // Further Studies
        formDataToSend = {
            ProgressionType: progressionType,
            CompanyOrUniversity: formData.CompanyOrUniversity,
            Location: formData.Location,
            State: formData.State,
            City: formData.City,
            PositionOrCourse: formData.PositionOrCourse,
            TentativeJoiningDate: formData.TentativeJoiningDate,
        };

        // Append files if needed
        if (formData.OfferLetterOrAdmissionLetter) {
            formDataToSend.OfferLetterOrAdmissionLetter = formData.OfferLetterOrAdmissionLetter; // handle file if required
        }

    } else if (progressionType === '3') { // Unemployment / No Further Studies
        formDataToSend = {
            ProgressionType: progressionType,
            Note: formData.Note,
            Reason: formData.Reason // include reason if needed
        };
    }

    try {
        const response = await fetch(
            'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionAdd',
            {
                method: 'POST',
                headers: {
                    Referer: 'http://172.25.15.22/',
                    Token: authToken,
                    'Content-Type': 'application/json', // Set to application/json for this example
                },
                body: JSON.stringify(formDataToSend), // Send the constructed object
            }
        );

        if (!response.ok) {
            // Log response details for debugging
            const errorData = await response.json();
            console.error('Error Response:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.response_code === '200') {
            alert(result.obj);
        } else {
            alert('Failed to submit data: ' + result.message);
        }
    } catch (error) {
        console.error('Error submitting data:', error.message);
        alert('An error occurred while submitting data: ' + error.message);
    }
};

//   try {
//     console.warn('Form data being sent:', formDataToSend); // Debugging log
//     const response = await fetch(
//       'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionAdd',
//       {
//         method: 'POST',
//         headers: {
//           Referer: 'http://172.25.15.22/',
//           Token: authToken,
//         },
//         body: formDataToSend,
//       },
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Error Response:', errorData); // Log detailed error
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     alert(result.obj); // assuming the response contains an 'obj' field
//   } catch (error) {
//     console.error('Error submitting data:', error.message);
//     alert('An error occurred while submitting data: ' + error.message);
//   }
// };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Career Progression</Text>

      {/* Progression Type */}
      <Text style={styles.label}>Select Career Progression Type</Text>
      <Picker
        selectedValue={progressionType}
        onValueChange={itemValue => setProgressionType(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Select Option" value="" />
        <Picker.Item label="Employment" value="1" />
        <Picker.Item label="Further Studies" value="2" />
        <Picker.Item label="Unemployment / No Further Studies" value="3" />
      </Picker>

      {/* If Employment is selected */}
      {progressionType === '1' && (
        <>
          <Text style={styles.label}>Career Status</Text>
          <Picker
            selectedValue={formData.ProgressionStatus}
            onValueChange={value =>
              setFormData({...formData, ProgressionStatus: value})
            }
            style={styles.picker}>
            <Picker.Item label="Select Status" value="" />
            <Picker.Item label="Internship" value="1" />
            <Picker.Item label="Employed - On Campus" value="2" />
            <Picker.Item label="Employed - Off Campus" value="3" />
            <Picker.Item label="Startup" value="4" />
            <Picker.Item label="Freelancing" value="5" />
          </Picker>

          <Text style={styles.label}>Company Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter company name"
            onChangeText={text =>
              setFormData({...formData, CompanyOrUniversity: text})
            }
          />

          <Text style={styles.label}>Job Location Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter job location country"
            onChangeText={text => setFormData({...formData, Location: text})}
          />

          <Text style={styles.label}>Job Location State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter job location state"
            onChangeText={text => setFormData({...formData, State: text})}
          />

          <Text style={styles.label}>Job Location City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter job location city"
            onChangeText={text => setFormData({...formData, City: text})}
          />

          <Text style={styles.label}>Position</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter job position"
            onChangeText={text =>
              setFormData({...formData, PositionOrCourse: text})
            }
          />

          <Text style={styles.label}>Joining Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter joining date"
            onChangeText={text =>
              setFormData({...formData, TentativeJoiningDate: text})
            }
          />

          <Text style={styles.label}>Appointment Letter</Text>
          <Button
            title="Upload File"
            onPress={() => handleFileUpload('OfferLetterOrAdmissionLetter')}
          />

          <Text style={styles.label}>Annual Income</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter annual income"
            keyboardType="numeric"
            onChangeText={text => setFormData({...formData, CTC: text})}
          />

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter any notes"
            onChangeText={text => setFormData({...formData, Note: text})}
          />
        </>
      )}

      {/* If Further Studies is selected */}
      {progressionType === '2' && (
        <>
          <Text style={styles.label}>University Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter university name"
            onChangeText={text =>
              setFormData({...formData, CompanyOrUniversity: text})
            }
          />

          <Text style={styles.label}>University Location Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter university location country"
            onChangeText={text => setFormData({...formData, Location: text})}
          />

          <Text style={styles.label}>University Location State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter university location state"
            onChangeText={text => setFormData({...formData, State: text})}
          />

          <Text style={styles.label}>University Location City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter university location city"
            onChangeText={text => setFormData({...formData, City: text})}
          />

          <Text style={styles.label}>Course Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter course name"
            onChangeText={text =>
              setFormData({...formData, PositionOrCourse: text})
            }
          />

          <Text style={styles.label}>Joining Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter joining date"
            onChangeText={text =>
              setFormData({...formData, TentativeJoiningDate: text})
            }
          />

          <Text style={styles.label}>
            Admission Letter / Fee Receipt / ID Card
          </Text>
          <Button
            title="Upload File"
            onPress={() => handleFileUpload('OfferLetterOrAdmissionLetter')}
          />

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter any notes"
            onChangeText={text => setFormData({...formData, Note: text})}
          />
        </>
      )}

      {/* If Unemployment / No Further Studies is selected */}
      {progressionType === '3' && (
        <>
          <Text style={styles.label}>Latest Resume</Text>
          <Button
            title="Upload File"
            onPress={() => handleFileUpload('Resume')}
          />

          <Text style={styles.label}>
            Reason for Unemployment (Min. 50 Characters)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter reason for unemployment"
            multiline
            onChangeText={text => setFormData({...formData, Reason: text})}
          />
        </>
      )}
<View>

      <Button title="Submit" onPress={handleSubmit} />
</View>
    </ScrollView>
  );
};

export default ProgressForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin:10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});
