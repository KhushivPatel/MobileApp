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
import {AuthContext} from '../../../ContextApi/AuthContext';
import BackButton from '../../../CommanText/BackButton';

const RequestStatus: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  const {authToken, userDetails} = useContext(AuthContext);
  const [data, setData] = useState<any[]>([]); // State to hold API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentRequestStatus/StudentRequestStatusGet',
          {
            method: 'POST',
            headers: {
              Referer:
                'http://172.25.15.22/',
              Token: authToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          },
        );

        const result = await response.json();

        if (response.ok) {
          if (result.response_code === '200' && result.obj !== 'No Data') {
            setData(result.obj); // Store array data
          } else {
            setData([]);
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
  }, [authToken]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
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
      ) : data.length === 0 ? (
        <Text style={styles.noDataText}>No Request Found</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainContent}>
            {/* Loop through data array */}
            {data.map((item, index) => (
              <View key={index}>
                <View style={styles.textContainerRight}>
                  <Text
                    style={[
                      styles.textRight,
                      styles.boldText,
                      styles.smallText,
                    ]}>
                    Request: {item.Request}
                  </Text>
                  <Text style={styles.textRight}>Status: {item.Status}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.textRow}>
                  <Text style={styles.textLeft}>Existing Record</Text>
                  <Image
                    source={{uri: item.ExistingRecord}}
                    style={styles.image} // Styles for the image
                  />
                </View>
                <View style={styles.textRow}>
                  <Text style={styles.textLeft}>Change Record</Text>
                  <Image
                    source={{uri: item.ChangeRecord}}
                    style={styles.image} // Styles for the image
                  />
                </View>
                <View style={styles.textRow}>
                  <Text style={styles.textLeft}>Requested On</Text>
                  <Text style={styles.textRight}>
                    {item.RequestedOnView || 'N/A'}
                  </Text>
                </View>
                <View style={styles.textRow}>
                  <Text style={styles.textLeft}>Remark By Faculty</Text>
                  <Text style={styles.textRight}>
                    {item.RemarksByFaculty || 'N/A'}
                  </Text>
                </View>
                <View style={styles.textRow}>
                  <Text style={styles.textLeft}>Remark By Academic</Text>
                  <Text style={styles.textRight}>
                    {item.RemarksByAcademic || 'N/A'}
                  </Text>
                </View>
              </View>
            ))}
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
