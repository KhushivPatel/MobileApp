// View_tt.tsx
import {View, Text, ScrollView, useColorScheme} from 'react-native';
import React from 'react';
import createStyles from './View_style'; // Import the styles

const View_timetable = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Time Table</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContent}>
          <View style={styles.textContainerRight}>
            <Text style={styles.textRight}>Programme Name</Text>
            <Text style={styles.textRight}>
              hi
            </Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.boldText}>hi</Text>
          </View>
        </View>
        {/* id card */}
        <View style={styles.gridview}>
          <Text style={styles.griditem}> Paper Name </Text>
          <Text style={styles.griditem}> Teaching Learning Method </Text>
          <Text style={styles.griditem}> Paper Date </Text>
          <Text style={styles.griditem}> Time Slot </Text>
        </View>
        <View style={styles.gridview2}>
          <Text style={styles.griditem2}>hi</Text>
          <Text style={styles.griditem2}>hi</Text>
          <Text style={styles.griditem2}>hi</Text>
          <Text style={styles.griditem2}>hi</Text>
        </View>
        <View style={styles.gridview2}>
          <Text style={styles.griditem2}>hi</Text>
          <Text style={styles.griditem2}>hi</Text>
          <Text style={styles.griditem2}>hi</Text>
          <Text style={styles.griditem2}>hi</Text>
        </View>
        <View style={styles.gridview2}>
          <Text style={styles.griditem2}>hi</Text>
          <Text style={styles.griditem2}>hi</Text>
          <Text style={styles.griditem2}>hi</Text>
          <Text style={styles.griditem2}>hi</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default View_timetable;
