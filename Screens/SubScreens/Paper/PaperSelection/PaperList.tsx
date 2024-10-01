import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {createStyles} from './styles'; // Import the createStyles function
import {useNavigation} from '@react-navigation/native'; // Assuming you're using React Navigation
import { AuthContext } from '../../../ContextApi/AuthContext';
import BackButton from '../../../CommanText/BackButton';

const PaperList: React.FC = () => {
  const isDarkMode = false; // You can set this dynamically based on user preference
  const styles = createStyles(isDarkMode); // Generate styles using the createStyles function

  const {authToken, userDetails} = useContext(AuthContext);
  const [programmeData, setProgrammeData] = useState<any>(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const navigation = useNavigation(); // React Navigation hook

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentDashboard/PaperListGet',
          {
            headers: {
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken,
            },
          },
        );

        if (response.data.response_code === '200') {
          setProgrammeData(response.data.obj[0]); // Assuming obj[0] is the program you need
        } else {
          console.error('Failed to fetch data: ', response.data);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData();
  }, []);

  // Function to handle navigation when clicking on InstancePartTermName
  const handleInstancePress = (instance: any) => {
    // Navigate to the PaperDetails screen and pass the selected instance data
   navigation.navigate('PaperDetails', {
     papers: instance.PaperList,
     partTermName: instance.InstancePartTermName.trim(),
     eligibilityByFaculty: instance.EligibilityByFaculty,
     eligibilityByAcademics: instance.EligibilityByAcademics,
     createdOn: instance.CreatedOn.trim(),
   });
  };

  if (loading) {
    return (
      <View style={styles.containerloading}>
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#fff' : '#5287D7'}
          style={styles.spinner}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton/>
        <Text style={styles.headerText}>Paper List</Text>
        <View style={styles.headerIcons}>{/* Add icons if needed */}</View>
      </View>

      <ScrollView style={styles.scrollView}>
        {programmeData ? (
          <View style={styles.mainContent}>
            {/* Display Programme Name */}
            <View style={styles.programNameContainer}>
              <Text>Programme Name</Text>
              <Text style={styles.programNameText}>
                {programmeData.ProgrammeName}
              </Text>
            </View>

            {/* Loop through PTList and display InstancePartTermName */}
            {programmeData.PTList.map((instance: any) => (
              <View key={instance.Id} style={styles.detailContainer}>
                <TouchableOpacity
                  style={styles.textRow}
                  onPress={() => handleInstancePress(instance)}>
                  <Text style={styles.textLeft}>
                    {instance.InstancePartTermName.trim()}
                  </Text>
                  <Image
                    source={require('../../../../assets/icons/arrow.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text>No data available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default PaperList;
