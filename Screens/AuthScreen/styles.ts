import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', // Centers content vertically
      alignItems: 'center', // Centers content horizontally
    },
    image: {
      width: '100%',
      height: 400,
      resizeMode: 'cover', // Adjust image scaling
      position: 'absolute', // This positions the image behind the form
      top: 0,
      left: 0,
    },
    loginContainer: {
      width: '100%',
      height: '100%',
      paddingLeft: 35,
      paddingRight: 35,
      backgroundColor: isDarkMode ? '#000' : '#fff',
      borderRadius: 35,
      position: 'absolute', // This makes the form overlay the image
      top: '31%', // Adjust the form position on the screen
      paddingTop: 46,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDarkMode ? '#fff' : '#000',
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: isDarkMode ? '#fff' : '#000',
      borderWidth: 1,
      marginBottom: 27,
      paddingHorizontal: 10,
      borderRadius: 6,
      color: isDarkMode ? '#fff' : '#000',
    },
    loginButton: {
      width: '100%',
      height: 40,
      backgroundColor: '#5287D7', // Blue background color
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      marginBottom: 10,
    },
    loginButtonText: {
      color: isDarkMode ? '#fff' : '#fff',
      fontSize: 16,
    },
    universityText: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#7E7E7E',
    },
    termsText: {
      position: 'absolute',
      bottom: 10,
      width: '100%',
      textAlign: 'center',
      fontSize: 12,
      color: '#676767',
    },
  });

export default createStyles;
