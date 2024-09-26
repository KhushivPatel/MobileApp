/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, ScrollView, useColorScheme,Image} from 'react-native';

const AboutUs = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode); // Create styles based on the theme

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About Us</Text>
        <View style={styles.headerIcons}>
          {/* You can add icon components here if needed */}
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Visionary Maharaja of Baroda</Text>
        <Text style={styles.subtext}>
          Biography of Shrimant Gopalrao Gaekwad
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Image
            source={require('../../assets/images/maharajaimg.png')}
            style={{
              width: 332,
              height: 379,
            }}
          />
        </View>
        {/*  */}
        <Text style={styles.text}>
          Sayajirao was born at Kavlana on 10th March 1863 as Shrimant Gopalrao
          Gaekwad, second son of Meherban Shrimant Kashirao Bhikajirao Dada
          Sahib Gaekwad and Ummabai. He was selected by the British Government
          as successor to Maharaja Malharrao Gaekwad and was accordingly adopted
          by Maharani Jamnabai on 27th May 1875. He ascended the gadi (throne)
          at Baroda on 16th June 1875, but being a minor, reigned under a
          Council of Regency until he came of age and was invested with full
          ruling powers on 28th December 1881. During his minority he was
          extensively tutored in administrative skills by Raja Sir T. Madhava
          Rao who groomed his young protege into being a ruler with foresight
          and with a will to provide welfare to his people. In this period Sir
          T. Madhava Rao restored the State to its normal conditions from the
          chaos in which it was left by the predecessor of Sayajirao. Not a
          little credit for what the Maharaja achieved during his life in every
          sphere of human activity must be given to F. A. H. Elliot. The
          learning which Sayajirao acquired under Mr. Eliot's able guidance made
          him a great statesman, educator, and ruler. It is acknowledged that
          the Maharaja Sayajirao was a prince among the educators and an
          educator among the princes. He had to undergo such a heavy course of
          studies that it would have made many a student hate them. But it made
          him realize his shortcomings and strengthened his determination to
          acquire more knowledge.
        </Text>

        <Text style={styles.subtext}>The Rules and Regulations</Text>
        <Text style={styles.text}>
          On assuming the reins of Government, some of his first tasks included
          education of his subjects, uplifting of the downtrodden, judicial,
          agricultural, and social reforms, building a network of railways to
          connect areas of his dispersed territories. He played a key role in
          the development of Barode industry. His educational and social reforms
          included, along with others, ban on child marriage, legislation of
          divorce, removal of untouchability, spread of education, development
          of Sanskrit and ideological studies, religious education,
          encouragement of fine arts. Fully aware of the fact that he was a
          Maratha ruler of Gujarat, he identified himself with the people and
          developed their cosmopolitan attitude and progressive, reformist zeal.
          His rich library became the nucleus of today's Central Library of
          Baroda with a network of libraries in all the towns and villages in
          his state. He was the first Indian Ruler to introduce, in 1906,
          compulsory and free primary education in his State, placing his
          territory far in advance of contemporary British India.
        </Text>
        <Text style={styles.subtext}>Heritage and Views</Text>
        <Text style={styles.text}>
          Though a prince of a native state, an admirer of the English people
          and in many respects of the English rule in India, he jealously
          guarded his rights and status even at the cost of annoyance to the
          British Indian Government. He was granted the title of
          Farzand-I-Khas-I-Daulat-i-Inglishia on 29th December 1876. He attended
          the Delhi Durbars of 1877, 1903, 1911. It was at the 1911 Delhi Durbar
          that Sir Sayajirao did not bow to the King Emperor and this was
          considered disrespect to the throne by the British who almost
          derecognized him, and he almost lost his throne. Sayajirao was often
          in conflict with the British on matters of principle and governance,
          having continuous and longstanding verbal and written disputes with
          the British Residents.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutUs;

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
    contentText: {
      fontSize: 32,
      fontWeight: 'bold', // Making the text bold
      color: isDarkMode ? '#fff' : '#000', // Change color based on the mode
    },
    subtext: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDarkMode ? '#ddd' : '#000',
      marginTop: 10,
    },
    text: {
      fontSize: 10,
      fontWeight: 'bold',
      color: isDarkMode ? '#ddd' : '#000',
      marginTop: 10,
      alignItems: 'center',
      justifyContent:'center',
      // textAlign:'center',
    },
  });
