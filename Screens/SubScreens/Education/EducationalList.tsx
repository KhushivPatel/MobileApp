import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import createStyles from './EducationListStyles'; // Import the styles
import BackButton from '../../CommanText/BackButton';

const EducationalDetails: React.FC = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton/>
        <Text style={styles.headerText}>Educational List</Text>
      </View>

      {/* Main View Container with Border Radius */}
      <View style={styles.mainContainer}>
        {/* First View with Left Texts and Right Arrow Image */}
        <View style={styles.rowContainer}>
          <View style={styles.leftTextContainer}>
            <Text style={styles.mainText}>Degree</Text>
            <Text style={styles.subText}>SSC / 10th</Text>
          </View>
          <TouchableOpacity style={styles.arrowContainer}>
            <Image
              source={require('../../../assets/icons/arrow.png')}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>

        {/* Second View with only Text */}
        <View style={styles.textContainer}>
          <Text style={styles.additionalText}>
            Gujarat Secondary and Higher Secondary Education Board
          </Text>
        </View>
      </View>

      <View style={styles.mainContainer}>
        {/* First View with Left Texts and Right Arrow Image */}
        <View style={styles.rowContainer}>
          <View style={styles.leftTextContainer}>
            <Text style={styles.mainText}>Degree</Text>
            <Text style={styles.subText}>HSC / 12th / Intermediate</Text>
          </View>
          <TouchableOpacity style={styles.arrowContainer}>
            <Image
              source={require('../../../assets/icons/arrow.png')}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>

        {/* Second View with only Text */}
        <View style={styles.textContainer}>
          <Text style={styles.additionalText}>
            Gujarat Secondary and Higher Secondary Education Board
          </Text>
        </View>
      </View>

      <View style={styles.mainContainer}>
        {/* First View with Left Texts and Right Arrow Image */}
        <View style={styles.rowContainer}>
          <View style={styles.leftTextContainer}>
            <Text style={styles.mainText}>Degree</Text>
            <Text style={styles.subText}>Under Graduate Degree (UG)</Text>
          </View>
          <TouchableOpacity style={styles.arrowContainer}>
            <Image
              source={require('../../../assets/icons/arrow.png')}
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>

        {/* Second View with only Text */}
        <View style={styles.textContainer}>
          <Text style={styles.additionalText}>
            The Maharaja Sayajirao University of Baroda
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EducationalDetails;
