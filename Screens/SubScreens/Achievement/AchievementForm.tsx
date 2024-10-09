import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AuthContext} from '../../ContextApi/AuthContext';

// Define the levels with corresponding IDs
const achievementLevels = [
  {id: 1, label: 'Institute'},
  {id: 2, label: 'University'},
  {id: 3, label: 'City'},
  {id: 4, label: 'District'},
  {id: 5, label: 'State'},
  {id: 6, label: 'National'},
  {id: 7, label: 'International'},
];

// Main Achievements Form Component
const AchievementForm = () => {
  // Form state
  const [selectedLevel, setSelectedLevel] = useState<number>(1); // Default to 1 (Institute)
  const [achievementTitle, setAchievementTitle] = useState<string>('');
  const [achievementDate, setAchievementDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');
  const [proofFile, setProofFile] = useState<any>(null); // For file attachment
  const {authToken} = useContext(AuthContext);

  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle PDF file selection
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setProofFile(res[0]); // Select the first file from the result
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error: ', err);
      }
    }
  };

  // Function to submit form data
  const submitForm = async () => {
    if (!proofFile) {
      Alert.alert('Error', 'Please attach a PDF file');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('Level', selectedLevel);
    formData.append('AchievementTitle', achievementTitle);
    formData.append(
      'DateofAchievement',
      achievementDate.toLocaleDateString('en-GB'),
    );
    formData.append('Description', description);
    formData.append('ProofFile', {
      uri: proofFile.uri,
      name: proofFile.name,
      type: proofFile.type,
    });

    try {
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentAchievements/StudentAchievementsAdd',
        {
          method: 'POST',
          headers: {
            Referer: 'http://172.25.15.22/',
            'Content-Type': 'multipart/form-data',
            Token: authToken,
          },
          body: formData,
        },
      );

      const result = await response.json();
      if (result.response_code === '200') {
        Alert.alert('Success', result.obj);
      } else {
        Alert.alert('Error', 'Failed to add achievement');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  // Date picker handler
  const onDateChange = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    setAchievementDate(selectedDate || new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Achievement</Text>
      <Picker
        selectedValue={selectedLevel}
        onValueChange={itemValue => setSelectedLevel(itemValue)}>
        {achievementLevels.map(level => (
          <Picker.Item key={level.id} label={level.label} value={level.id} />
        ))}
      </Picker>

      <TextInput
        placeholder="Achievement Title"
        value={achievementTitle}
        onChangeText={setAchievementTitle}
        style={styles.input}
      />

      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={achievementDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Text style={styles.dateText}>
        Selected Date: {achievementDate.toLocaleDateString('en-GB')}
      </Text>

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Button title="Attach PDF Proof" onPress={pickDocument} />
      {proofFile && <Text>Selected File: {proofFile.name}</Text>}

      <Button title="Submit" onPress={submitForm} />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  dateText: {
    marginVertical: 10,
    fontSize: 16,
  },
});

export default AchievementForm;
