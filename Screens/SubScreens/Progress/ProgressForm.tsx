import React, {useContext, useState} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { AuthContext } from '../../ContextApi/AuthContext';

const ProgressForm: React.FC = () => {
  const [careerProgression, setCareerProgression] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const {authToken} = useContext(AuthContext);
  const handleSubmit = async () => {
    // const authToken = 'your_auth_token'; // Replace with your actual auth token

    const data = {
      careerProgression: careerProgression,
    };

    try {
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionAdd',
        {
          method: 'POST',
          headers: {
            Referer: 'http://172.25.15.22/',
            Token: authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const result = await response.json();
      console.log('Success:', result);
      setMessage('Form submitted successfully!');
      Alert.alert('Success', 'Form submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error submitting form: ' + error.message);
      Alert.alert('Error', 'Error submitting form: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Career Progression Form</Text>
      <Text style={styles.label}>Career Progression:</Text>
      <Picker
        selectedValue={careerProgression}
        onValueChange={itemValue => setCareerProgression(itemValue)}
        style={styles.picker}
        mode="dropdown">
        <Picker.Item label="Select your option" value="" />
        <Picker.Item label="Employ" value="employ" />
        <Picker.Item label="Further Studies" value="further studies" />
        <Picker.Item label="Unemployed" value="unemployed" />
        <Picker.Item label="No Further Studies" value="no further studies" />
      </Picker>
      <Button title="Submit" onPress={handleSubmit} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: 'green',
  },
});

export default ProgressForm;
