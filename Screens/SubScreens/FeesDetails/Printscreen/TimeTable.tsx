import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import BackButton from '../../../CommanText/BackButton';
import axios from 'axios';
import {AuthContext} from '../../../ContextApi/AuthContext';

const TimeTable = ({route}) => {
  const {authToken} = useContext(AuthContext);
  const {row, actionType} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          // 'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentDashboard/ExamTimeTableGet',
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentDashboard/ExamTimeTableGet',
          {
            ExamEventId: row.ExamEventId,
            ProgrammeInstancePartTermId: row.ProgInstPartTermId,
          },
          {
            headers: {
              Referer:
                // 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
                'http://172.25.15.22/',
              Token: authToken,
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.data.response_code === '200') {
          setData(response.data.obj);
        } else {
          setError('Failed to fetch data.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [row, authToken]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!data || data.length === 0) {
    return <Text>No data available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <BackButton />
        <Text style={styles.headingText}>{actionType}</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.paperName}>{item.PaperName}</Text>
          <Text style={styles.paperDate}>Date: {item.PaperDate.trim()}</Text>
          <Text style={styles.timeSlot}>Time: {item.TimeSlot}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  paperName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paperDate: {
    fontSize: 16,
    color: '#555',
  },
  timeSlot: {
    fontSize: 16,
    color: '#555',
  },
});

export default TimeTable;
