import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  Image,
  TouchableOpacity,
} from 'react-native';
import createStyles from './styles'; // Import styles from the correct path

interface Notification {
  Id: number;
  message: string;
  ProgramInstancePartTermID: string;
}

const NotificationScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/Notifications/GetNotification',
          {
            method: 'POST',
            headers: {
              Token:
                'HnpZxFe8H3|ZgVZHnpZxFe8:2442358;4HnpZxFe8\\5KkO;7{\\jkDwUNDo|:cf52pz',
              origin: 'https://admission.msubaroda.ac.in',
              referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          const errorText = await response.text(); // Retrieve the response text for better error details
          throw new Error(
            `Network response was not ok. Status: ${response.status}. Error: ${errorText}`,
          );
        }

        const data = await response.json();
        setNotifications(data.obj || []); // Use `data.obj` to set notifications
        // eslint-disable-next-line no-catch-shadow
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

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

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notification</Text>
      </View>
      <View style={styles.constantmessage}>
        <Image
          source={require('../../assets/images/msunoti.png')}
          style={styles.notificationImage}
        />
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>
            Orientation for academic year 2024 on 24/12/2023{' '}
          </Text>
          <Text style={styles.notificationDescription}>
            Orientation for academic year 2024 on 24/12/2023 Orientation for
            academic year 2024 on 24/12/2023 Orientation for academic year 2024
            on 24/12/2023 Orientation for{' '}
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {notifications.length === 0 ? (
          <Text style={styles.noNotificationsText}>
            No notifications available
          </Text>
        ) : (
          notifications.map(notification => (
            <View key={notification.Id} style={styles.notificationContainer}>
              <View style={styles.textRow}>
                <View style={styles.notificationTextContainer}>
                  <View style={styles.padding}>
                    <Text style={styles.notificationTitle}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationDescription}>
                      {notification.ProgramInstancePartTermID}
                    </Text>
                  </View>
                  <View style={styles.datecontainer}>
                    <Text style={styles.datetext}>
                      {' '}
                      {notification.ProgramInstancePartTermID}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
        <TouchableOpacity>
          <Text style={styles.markAsRead}>Mark all as read</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
