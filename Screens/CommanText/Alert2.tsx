import {StyleSheet, Text, View} from 'react-native';
import React, {createContext} from 'react';

const Alert2 = () => {
  return (
    <View style={styles.certificateMainContainer}>
      <View style={styles.certificateTitleContainer}>
        <Text style={styles.certificateTitleText}>ACHARYA</Text>
      </View>
      <View style={styles.certificatemessage}>
        <Text style={styles.placeholderText}>Provisionally_Eligible</Text>
        <Text style={styles.remarksText}>
          Remarks: Dear student, your eligibility has been resolved
          provisionally, subject to submission of Original Migration Certificate
          to your building office. Your Eligibility would be marked Final after
          submission of Original Migration Certificate.
        </Text>
      </View>
    </View>
  );
};

export default Alert2;

const styles = StyleSheet.create({
  certificateMainContainer: {
    backgroundColor: '#FFC6C0',
    marginTop: 10,
    borderRadius: 10,
  },
  certificateTitleContainer: {
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    height: 38,
    justifyContent: 'center',
    color: '#fff',
  },
  certificateTitleText: {
    color: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  certificatemessage: {
    paddingTop: 10,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 13,
  },
  placeholderText: {
    color: '#E74C3C',
    fontWeight: 'bold',
    fontSize: 12,
  },
  remarksText: {
    color: '#000',
    fontSize: 12,
    paddingTop: 5,
  },
});
export const ExamContext = createContext();
