import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import createStyles from './EducationListStyles'; // Import the styles
import BackButton from '../../CommanText/BackButton';
import { AuthContext } from '../../ContextApi/AuthContext';

const EducationalList: React.FC = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);
  const [educationDetails, setEducationDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchEducationDetails = async () => {
      try {
        const response = await axios.get(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/StudentProfileGetEducationDetails',
          {
            headers: {
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken,
            },
          },
        );

        if (response.data.response_code === '200') {
          setEducationDetails(response.data.obj);
        }
      } catch (error) {
        console.error('Error fetching education details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationDetails();
  }, [authToken]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerText}>Educational List</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <View style={styles.mainContainer}>
          {educationDetails.map((edu, index) => (
            <View key={index} style={styles.mainContainer}>
              <View style={styles.rowContainer}>
                <View style={styles.leftTextContainer}>
                  <Text style={styles.mainText}>Degree</Text>
                  <Text style={styles.subText}>{edu.EligibleDegreeName}</Text>
                </View>
                <TouchableOpacity
                  style={styles.arrowContainer}
                  onPress={() =>
                    navigation.navigate('EducationDetail', {degree: edu})
                  } // Pass the degree object
                >
                  <Image
                    source={require('../../../assets/icons/arrow.png')}
                    style={styles.arrowImage}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.additionalText}>
                  {edu.ExaminationBodyName}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default EducationalList;
