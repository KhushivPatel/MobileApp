/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
} from 'react-native';
import ResultTable from '../ResultTable';

const ContactUs = () => {
  const isDarkMode = false; // Replace this with your dark mode logic
  const styles = createStyles(isDarkMode);

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Contact Us</Text>
        <View style={styles.headerIcons}>{/* Add icons if needed */}</View>
      </View>

      <View style={styles.content}>
        {/* Heading */}
        <Text style={styles.title}>Get In Touch</Text>
        <Text style={styles.subtitle}>
          The Maharaja Sayajirao University of Baroda
        </Text>
        <Text style={styles.text}>MSUB - Vidhyarthi</Text>

        {/* Contact Section */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactText}>02652795518</Text>
          <TouchableOpacity onPress={() => handleCall('02652795518')}>
            <Image
              source={require('../../assets/images/call.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactText}>info@msubaroda.ac.in</Text>
          <TouchableOpacity onPress={() => handleEmail('info@msubaroda.ac.in')}>
            <Image
              source={require('../../assets/images/mail.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Full-width divider with "OR" in the center */}
        <View style={styles.dividerView}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>

        {/* Query Form */}
        <View style={styles.queryContainer}>
          <Text style={styles.queryTitle}>Query Form</Text>
          <Text>
            Let us know if you are facing any issues. We will get back to you
            shortly.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="PRN"
            placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
          />
          <TextInput
            style={[styles.input, {height: 200}]}
            placeholder="Write your query"
            multiline
            textAlignVertical="top"
            placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ContactUs;

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f8f8f8',
    },
    header: {
      height: 58,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? '#22395C' : '#5287D7',
    },
    dividerView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      // marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: isDarkMode ? '#ddd' : '#000',
      fontWeight: 'bold',
      // marginBottom: 16,
    },
    text: {
      color: '#000',
      marginTop: 5,
    },
    contactContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#ddd',
      borderRadius: 21,
      paddingHorizontal: 16,
      paddingVertical: 12,
      // marginBottom: 16,
      marginTop: 16,
    },
    contactText: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: '#5287D7',
    },
    orText: {
      marginBottom: 16,
      marginTop: 16,
      fontSize: 16,
      textAlign: 'center',
      color: isDarkMode ? '#fff' : '#000',
      marginHorizontal: 8,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: '#000',
    },
    queryContainer: {
      backgroundColor: isDarkMode ? '#333' : '#e7e7e7',
      padding: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    queryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      // marginBottom: 12,
    },
    input: {
      backgroundColor: isDarkMode ? '#555' : '#d9d9d9',
      borderRadius: 8,
      padding: 12,
      marginTop: 16,
      color: isDarkMode ? '#fff' : '#000',
    },
    sendButton: {
      backgroundColor: '#5287D7',
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 10,
      alignItems: 'center',
    },
    sendButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
