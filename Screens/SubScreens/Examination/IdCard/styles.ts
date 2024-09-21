import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
    } as ViewStyle,
    header: {
      height: 58,
      backgroundColor: isDarkMode ? '#22395C' : '#5287D7',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    } as ViewStyle,
    headerText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
    } as TextStyle,
    scrollView: {
      flexGrow: 1,
    } as ViewStyle,
    mainContent: {
      marginVertical: 10,
      marginHorizontal: 10,
    } as ViewStyle,
    selectcontainer: {
       marginHorizontal: 10,
      marginTop:20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: isDarkMode ? '#22395C' : '#5287D7',
      padding: 20,
      width: 185,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    text: {
      color: '#fff',
      fontSize: 14,
    },
    // id
    detailcontainer: {
      margin: 10,
      borderColor: '#000',
      borderWidth: 1,
    },
    titleview: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      borderColor: '#000',
      borderBottomWidth: 1,
      padding: 10,
      justifyContent: 'space-between',
    },
    logo: {
      height: 50,
      width: 50,
    },
    logotextcontainer: {
      alignItems: 'center',
    },
    logotext: {
      color: '#000',
    },
    idcardcontainer: {
      flexDirection: 'row',
      flex: 1,
      padding: 10,
      alignItems: 'center', // Align items vertically centered
    },
    studentimg: {
      height: 97,
      width: 97,
      justifyContent: 'center',
      alignItems: 'center',
        resizeMode: 'contain',
      marginRight: 10, // Space between image and text
    },
    iddetail1: {
      flex: 1,
      paddingLeft: 10, // Add space between image and text container
    },
    iddetail: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10, // Space between rows
    },
    idtext: {
      flex: 1,
      color: '#000',
      fontWeight: 'bold',
      fontSize: 12,
    },
    idtextr: {
      fontSize: 11,
      flex: 2,
      color: '#000',
    },
    signature: {
      height: 90,
      width: 90,
      resizeMode: 'contain',
    },
    signaturecontainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default createStyles;
