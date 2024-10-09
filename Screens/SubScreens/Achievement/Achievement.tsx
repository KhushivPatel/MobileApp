import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {AuthContext} from '../../ContextApi/AuthContext';
import {useNavigation} from '@react-navigation/native';
import AchievementForm from './AchievementForm';

// Define the type for a single achievement item
interface Achievement {
  Id: number;
  StudentPRN: number;
  UpdatedByUserId: number | null;
  AchievementTitle: string;
  Description: string;
  ProofFile: string;
  Level: number;
  DateofAchievement: string;
  IsDeleted: boolean;
  ModifiedOn: string | null;
}

// Main Achievements Component
const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const {authToken} = useContext(AuthContext);
  const navigation = useNavigation(); // Hook for navigation
  // Function to fetch achievements data from the API
  const fetchAchievements = async () => {
    try {
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentAchievements/StudentAchievementsListGet',
        {
          method: 'POST',
          headers: {
            Referer: 'http://172.25.15.22/',
            Token: authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        },
      );

      const data = await response.json();
      if (data.response_code === '200') {
        setAchievements(data.obj);
      } else {
        console.log('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch the achievements data when the component is mounted
  useEffect(() => {
    fetchAchievements();
  }, []);

  // Render each achievement item
  const renderAchievementItem = ({item}: {item: Achievement}) => (
    <View style={styles.achievementItem}>
      <Text style={styles.title}>Title: {item.AchievementTitle}</Text>
      <Text>Description: {item.Description}</Text>
      <Text>Level: {item.Level}</Text>
      <Text>Date: {item.DateofAchievement}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Achievements</Text>
      <FlatList
        data={achievements}
        renderItem={renderAchievementItem}
        keyExtractor={item => item.Id.toString()}
      />
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
  achievementItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});

export default Achievements;
