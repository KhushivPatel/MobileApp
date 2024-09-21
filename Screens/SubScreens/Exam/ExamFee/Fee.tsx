/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
} from 'react-native';
import feeStyles from './feeStyles'; // Import the styles from the new file
import { useNavigation } from '@react-navigation/native';

const Fee: React.FC = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const styles = feeStyles(isDarkMode);

  const GotoRecipt = ()=>{
    navigation.navigate('FeeRecipt')
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fees</Text>
        <TouchableOpacity onPress={() => console.log('Image pressed')}>
          <Image
            source={require('../../../../assets/icons/whitereload.png')} // Replace with your image path
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Example of static content for fees */}
        <View style={styles.mainContent}>
          <View style={styles.textContainerRight}>
            <Text style={[styles.textRight, styles.boldText, styles.smallText]}>
              Application Id
            </Text>
            <Text style={styles.textRight}>123456789</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailContainer}>
            <View style={[styles.textRow, {backgroundColor: '#80FFA3'}]}>
              <Text style={styles.textLeft}>Status</Text>
              <Text style={styles.textRight}>Paid</Text>
            </View>

            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Transaction ID</Text>
              <Text style={styles.textRight}>TX123456789</Text>
            </View>

            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Programme Instance Part Term</Text>
              <Text style={styles.textRight}>Fine Arts - 2023</Text>
            </View>

            <View style={styles.textRow}>
              <Text style={styles.textLeft}>Installment No.</Text>
              <Text style={styles.textRight}>1</Text>
            </View>

            <View style={styles.textRow}>
              <Text style={styles.textLeft}>View Fees Receipt</Text>
              <TouchableOpacity style={styles.button} onPress={GotoRecipt}>
                <Text style={styles.textRight}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Fee;
