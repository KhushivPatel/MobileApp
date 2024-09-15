/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createStyles} from './styles'; // Import the styles

const HomePage: React.FC = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);
  const notificationCount = 3; // Example notification count

  return (
    <ScrollView style={styles.container}>
      {/* navbar part */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../../assets/icons/notification.png')}
              style={styles.notification}
            />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../../assets/icons/menu.png')}
              style={styles.notification}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* details and menu part */}
      <View style={styles.homestyle}>
        {/* profile part */}
        <View style={styles.mainContent}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.textItem,
                  {fontSize: 24, color: '#000', fontWeight: 'bold'},
                ]}>
                Hello 👋
              </Text>
              <Text
                style={[
                  styles.textItem,
                  {fontSize: 14, color: '#000', fontWeight: 'bold'},
                ]}>
                hi
              </Text>
              <Text
                style={[
                  styles.textItem,
                  {fontSize: 14, color: '#6B6B6B', fontWeight: 'bold'},
                ]}>
                hi
              </Text>
            </View>
            <TouchableOpacity style={styles.arrowButton}>
              <Image
                source={require('../../assets/icons/arrow.png')}
                style={styles.arrow}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.textItem,
              {fontSize: 14, color: '#000', fontWeight: 'bold'},
            ]}>
            Quick Links
          </Text>
          <View style={styles.linkContainer}>
            {/* Request Status Touchable */}
            <TouchableOpacity style={[styles.linkInputWrapper, {width: '40%'}]}>
              <Text style={styles.linkInput}>Request Status</Text>
            </TouchableOpacity>

            {/* Result Touchable */}
            <TouchableOpacity style={[styles.linkInputWrapper, {width: '25%'}]}>
              <Text style={styles.linkInput}>Result</Text>
            </TouchableOpacity>

            {/* Fees Touchable */}
            <TouchableOpacity style={[styles.linkInputWrapper, {width: '25%'}]}>
              <Text style={styles.linkInput}>Fees</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* alert1 */}
        <View style={styles.certificateMainContainer}>
          <View style={styles.certificateTitleContainer}>
            <Text style={styles.certificateTitleText}>
              Certificate Course in Temple Management
            </Text>
          </View>
          <View style={styles.certificatemessage}>
            <Text style={styles.placeholderText}>Provisionally_Eligible</Text>
            <Text style={styles.remarksText}>
              Remarks: Dear student, your eligibility has been resolved
              provisionally, subject to submission of Original Migration
              Certificate to your building office. Your Eligibility would be
              marked Final after submission of Original Migration Certificate.
            </Text>
          </View>
        </View>
        {/* alert2 */}
        <View style={styles.certificateMainContainer}>
          <View style={styles.certificateTitleContainer}>
            <Text style={styles.certificateTitleText}>ACHARYA</Text>
          </View>
          <View style={styles.certificatemessage}>
            <Text style={styles.placeholderText}>Provisionally_Eligible</Text>
            <Text style={styles.remarksText}>
              Remarks: Dear student, your eligibility has been resolved
              provisionally, subject to submission of Original Migration
              Certificate to your building office. Your Eligibility would be
              marked Final after submission of Original Migration Certificate.
            </Text>
          </View>
        </View>
        {/* education details */}
        <View style={styles.educationDetailsContainer}>
          <View style={styles.greetingTextContainer}>
            <Image
              source={require('../../assets/icons/book.png')}
              style={styles.bookIcon}
            />
            <Text style={styles.greetingText}>Educational Details</Text>
          </View>
          <TouchableOpacity style={styles.expandDetailsButton}>
            <Image
              source={require('../../assets/icons/arrow.png')}
              style={styles.expandArrowIcon}
            />
          </TouchableOpacity>
        </View>
        {/* examination details */}
        <View style={styles.ExaminationContainer}>
          <Text style={styles.greetingText}>Examination</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>Time Table</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>ID Card</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* exam fee and hall tickets */}
        <View style={styles.ExaminationContainer}>
          <Text style={styles.greetingText}>Exam - Fee & Hall Ticket</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>Exam Fees</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>Hall Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* academics details */}
        <View style={styles.ExaminationContainer}>
          <Text style={styles.greetingText}>Academics</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>ADM Fees Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>Result</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* paper details */}
        <View style={styles.ExaminationContainer}>
          <Text style={styles.greetingText}>Paper</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>Selected Paper</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>Paper Selection</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* request details */}
        <View style={styles.ExaminationContainer}>
          <Text style={styles.greetingText}>Request</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>Request Status</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>New Request</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* certificate details */}
        <View style={styles.ExaminationContainer}>
          <Text style={styles.greetingText}>Certificate</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>Download Certificate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.coloredBox}>
              <Text style={styles.boxText}>Request Certificate</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* msu text */}
        <Text style={styles.logotext}>
          The Maharaja Sayajirao University - Baroda
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomePage;
