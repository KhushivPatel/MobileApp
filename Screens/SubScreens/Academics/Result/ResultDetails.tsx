import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import createStyles from './DetailR'; // Import the styles from the new file

const ResultDetails: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Result</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContent}>
          <View style={styles.textContainerRight}>
            <Text style={[styles.textRight, styles.boldText, styles.smallText]}>
              Faculty Name
            </Text>
            <Text style={styles.textRight}>hi</Text>
          </View>

          <View style={styles.detailContainer}>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Semester</Text>
              <Text style={styles.textRightRow}>hi</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Exam Event</Text>
              <Text style={styles.textRightRow}>hi</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Result Status</Text>
              <Text style={styles.textRightRow}>hi</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Result</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResultDetails;
