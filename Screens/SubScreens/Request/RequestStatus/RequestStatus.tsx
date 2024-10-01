/* eslint-disable no-catch-shadow */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import createStyles from './styles';
import { AuthContext } from '../../../ContextApi/AuthContext';
import BackButton from '../../../CommanText/BackButton';

const RequestStatus: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  const {authToken, userDetails} = useContext(AuthContext);
  // State to hold API data
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentRequestStatus/StudentRequestStatusGet',
          {
            method: 'POST',
            headers: {
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          },
        );

        const result = await response.json();

        if (response.ok) {
          if (result.response_code === '200' && result.obj !== 'No Data') {
            setData(result.obj);
          } else {
            setData(null);
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton/>
        <Text style={styles.headerText}>Request Status</Text>
      </View>

      {/* Conditional rendering for loading, error, or data */}
      {loading ? (
        <View style={styles.containerloading}>
          <ActivityIndicator
            size="large"
            color={isDarkMode ? '#fff' : '#5287D7'}
            style={styles.spinner}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : data === null ? (
        <Text style={styles.noDataText}>No Request Found</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainContent}>
            <View style={styles.textContainerRight}>
              <Text
                style={[styles.textRight, styles.boldText, styles.smallText]}>
                Request Name
              </Text>
              <Text style={styles.textRight}>Father/ Mother/ Spouse Name</Text>
            </View>

            <View style={styles.divider} />

            {/* Displaying data dynamically */}
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Status</Text>
              <Text style={styles.textRight}>{data.status || 'N/A'}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Existing Record</Text>
              <Text style={styles.textRight}>
                {data.existingRecord || 'N/A'}
              </Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>New Record</Text>
              <Text style={styles.textRight}>{data.newRecord || 'N/A'}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Requested On</Text>
              <Text style={styles.textRight}>{data.requestedOn || 'N/A'}</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Remark By Faculty</Text>
              <Text style={styles.textRight}>
                {data.remarkByFaculty || 'N/A'}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      <Text style={styles.logotext}>
        The Maharaja Sayajirao University of Baroda
      </Text>
    </View>
  );
};

export default RequestStatus;
