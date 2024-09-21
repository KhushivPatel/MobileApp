import {View, Text, Image, useColorScheme, ScrollView} from 'react-native';
import React from 'react';
import createStyles from './printr'; // Import the styles

const ResultPrint: React.FC<ResultPrintProps> = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.result}>
      {/* MSU Logo and Title */}
      <View style={styles.msutitle}>
        <Image
          source={require('../../assets/images/msu_logo.png')}
          style={styles.logo}
        />
        <View style={styles.msutext}>
          <Text style={styles.text}>
            The Maharaja Sayajirao University, Baroda
          </Text>
          <Text style={styles.subtext}>
            Fatehgunj, Vadodara-390002, Gujarat (India)
          </Text>
        </View>
      </View>

      {/* Exam Date Text */}
      <View style={styles.examdatetext}>
        <Text style={{fontSize: 13, color: 'black', textAlign: 'center'}}>
          Statement of Grade for First Semester of MVA-I [Master of Visual Arts]
          Examination: November-2021
        </Text>
      </View>

      {/* Result Marks */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollView}>
        <View style={styles.horizontalContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.headerText}>Course Code</Text>
            <Text style={styles.headerText}>Course Name</Text>
            <Text style={styles.headerText}>AM</Text>

            {/* UA Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.mainText}>UA</Text>
              <View style={styles.subTextContainer}>
                <Text style={styles.subText}>Max</Text>
                <Text style={styles.subText}>Min</Text>
                <Text style={styles.subText}>Obt</Text>
              </View>
            </View>

            {/* IA Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.mainText}>IA</Text>
              <View style={styles.subTextContainer}>
                <Text style={styles.subText}>Max</Text>
                <Text style={styles.subText}>Min</Text>
                <Text style={styles.subText}>Obt</Text>
              </View>
            </View>

            {/* Another UA Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.mainText}>UA</Text>
              <View style={styles.subTextContainer}>
                <Text style={styles.subText}>Max</Text>
                <Text style={styles.subText}>Min</Text>
                <Text style={styles.subText}>Obt</Text>
              </View>
            </View>

            <Text style={styles.headerText}>Sts</Text>
            <Text style={styles.headerText}>Rmk</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResultPrint;
