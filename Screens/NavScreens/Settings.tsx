/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const Settings = () => {
  // State to manage theme (light or dark)
  const [isDarkMode, setIsDarkMode] = useState(false); // Default is light mode

  // Function to toggle theme
  const toggleTheme = mode => {
    setIsDarkMode(mode === 'dark');
  };

  const styles = createStyles(isDarkMode); // Create styles based on the theme

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
        <View style={styles.headerIcons}>
          {/* You can add icon components here if needed */}
        </View>
      </View>

      {/* Theme toggle options */}
      <View style={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.modeOption,
              {backgroundColor: !isDarkMode ? '#e7e7e7' : '#dddd'}, // Highlight selected mode
            ]}
            onPress={() => toggleTheme('light')}>
            <Image
              source={require('../../assets/images/sun.png')}
              style={styles.icon}
            />
            <Text style={styles.text}>Light Mode</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeOption,
              {backgroundColor: isDarkMode ? '#676767' : '#dddd'}, // Highlight selected mode
            ]}
            onPress={() => toggleTheme('dark')}>
            <Image
              source={require('../../assets/images/moon.png')}
              style={styles.icon}
            />
            <Text style={styles.text}>Dark Mode</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;

// Function to create styles based on dark mode
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
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around', // Space out the items
      alignItems: 'center',
      marginTop: 20,
    },
    modeOption: {
      flexDirection: 'column', // Icons and text in one column
      alignItems: 'center',
      padding: 20,
      borderRadius: 10,
    },
    icon: {
      width: 50,
      height: 50,
    },
    text: {
      marginTop: 10,
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
    },
  });
