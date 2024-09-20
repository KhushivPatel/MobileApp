import React from 'react';
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';

const TimetableList: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const currentStyles = styles(isDarkMode);

  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.header}>
        <Text style={currentStyles.headerText}>Examination Details</Text>
      </View>
      <ScrollView style={currentStyles.scrollView}>
        <View style={currentStyles.mainContent}>
          <View style={currentStyles.textContainerRight}>
            <Text
              style={[
                currentStyles.textRight,
                currentStyles.boldText,
                currentStyles.smallText,
              ]}>
              Faculty Name
            </Text>
            <Text style={currentStyles.textRight}>Faculty of Fine Arts</Text>
          </View>

          <View style={currentStyles.detailContainer}>
            <View style={currentStyles.textRow}>
              <Text style={currentStyles.textLeft}>Semester</Text>
              <Text style={currentStyles.textRight}>First Semester of</Text>
            </View>
            <View style={currentStyles.textRow}>
              <Text style={currentStyles.textLeft}>Seat Number</Text>
              <Text style={currentStyles.textRight}>128909</Text>
            </View>
            <View style={currentStyles.textRow}>
              <Text style={currentStyles.textLeft}>Exam Event</Text>
              <Text style={currentStyles.textRight}>November-2022</Text>
            </View>
            <View style={currentStyles.textRow}>
              <Text style={currentStyles.textLeft}>Appearance Type</Text>
              <Text style={currentStyles.textRight}>Fresher</Text>
            </View>
            <View style={currentStyles.textRow}>
              <Text style={currentStyles.textLeft}>Form No</Text>
              <Text style={currentStyles.textRight}>100058827</Text>
            </View>
            <TouchableOpacity
              style={currentStyles.button}
            >
              <Text style={currentStyles.buttonText}>View Exam Time Table</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TimetableList;
