import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import createStyles from './View_style'; // Import the styles
import {AuthContext} from '../../../ContextApi/AuthContext';
import {useExamContext} from '../../../ContextApi/ExamProvider';
import {useRoute} from '@react-navigation/native'; // Import useRoute

const View_timetable = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);
  const {authToken} = useContext(AuthContext);
  const route = useRoute(); // Get the route object
  const {ProgInstPartTermId, examEventId} = route.params; // Retrieve parameters
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTimetable = async () => {
    try {
      const response = await fetch(
        'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentDashboard/ExamTimeTableGet',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            referer: 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
            token: authToken,
          },
          body: JSON.stringify({
            ProgrammeInstancePartTermId: ProgInstPartTermId,
            ExamEventId: examEventId,
          }),
        },
      );

      const result = await response.json();
      if (response.ok && result.response_code === '200') {
        setTimetable(result.obj);
      } else {
        setError('Failed to fetch timetable');
        console.error('Failed to fetch timetable', result);
      }
    } catch (error) {
      setError('Error fetching timetable');
      console.error('Error fetching timetable', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, [ProgInstPartTermId, examEventId]); // Fetch when parameters change

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Time Table</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{color: 'red'}}>{error}</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainContent}>
                 <View style={styles.gridview}>
          <Text style={styles.griditem}> Paper Name </Text>
          <Text style={styles.griditem}> Teaching Learning Method </Text>
          <Text style={styles.griditem}> Paper Date </Text>
          <Text style={styles.griditem}> Time Slot </Text>
        </View>
            {timetable.length > 0 ? (
              timetable.map(item => (
                <View key={item.PaperId} style={styles.gridview}>
                  <Text style={styles.griditem}>{item.PaperName}</Text>
                  <Text style={styles.griditem}>{item.TLMAMAT}</Text>
                  <Text style={styles.griditem}>{item.PaperDate}</Text>
                  <Text style={styles.griditem}>{item.TimeSlot}</Text>
                </View>
              ))
            ) : (
              <Text>No timetable data available.</Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default View_timetable;
