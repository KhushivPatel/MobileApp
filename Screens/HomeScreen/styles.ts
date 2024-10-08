import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:isDarkMode ?  '#1E1E1E' : '#f8f8f8',
    },
    homestyle: {
      margin: 12,
    },
    header: {
      height: 58,
      flexDirection: 'row',

      // justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ?  '#22395C' : '#5287D7',
    },
    headerText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  icon: {
    width: 45,
    height: 45,
    marginRight:10,
    tintColor: '#fff', // Optional: Tint the image color if needed
  },
   gifStyle: {
    width: 150, // Set width of the GIF
    height: 150, // Set height of the GIF
  },
    notification: {
      height: 20,
      width: 20,
    },
    iconButton: {
      marginLeft: 16,
    },
    mainContent: {
      paddingTop: 18,
      paddingLeft: 18,
      paddingRight: 18,
      paddingBottom: 10,
      backgroundColor:isDarkMode ?  '#565E69' : '#DCEAFF',
      borderRadius: 10,
    },
    infoContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor:isDarkMode ?  '#869BBA' : '#B9D5FF',
      borderRadius: 10,
      marginBottom: 10,
    },
    textContainer: {
      padding: 10,
      margin: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    textItem: {
      fontSize: 16,
      color: '#333',
    },
    arrowButton: {
      padding: 8,
    },
    arrow: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    linkContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    linkInputWrapper: {
      height: 40,
      borderRadius: 29,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:isDarkMode ?  '#869BBA' : '#B9D5FF',
    },
    linkInput: {
      fontWeight: 'bold',
      fontSize: 12,
      textAlign: 'center',
       color: isDarkMode ? '#fff' : '#000',
    },
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
    educationDetailsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
       backgroundColor:isDarkMode ?  '#565E69' : '#DCEAFF',
      borderRadius: 8,
      marginTop: 10,
    },
    greetingTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bookIcon: {
      width: 24,
      height: 24,
      marginRight: 14,
      resizeMode: 'contain',
    },
    greetingText: {
      fontSize: 14,
        color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
    },
    expandDetailsButton: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    expandArrowIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    ExaminationContainer: {
        backgroundColor:isDarkMode ?  '#565E69' : '#DCEAFF',
      marginTop: 10,
      borderRadius: 10,
      paddingBottom: 20,
      paddingTop: 13,
      paddingRight: 10,
      paddingLeft: 10,
    },
    rowContainer: {
      justifyContent: 'space-between',
      marginTop: 16,
      flexDirection: 'row',
    },
    coloredBox: {
        backgroundColor:isDarkMode ?  '#869BBA' : '#B9D5FF',
      height: 53,
      width: '49%',
      borderRadius: 10,
      justifyContent: 'center',
    },
    boxText: {
      textAlign: 'center',
       color: isDarkMode ? '#fff' : '#000',
    },
    logotext: {
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 20,
    },
      containerloading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#333' : '#fff',
    },
     loadingText: {
      fontSize: 18,
      color: isDarkMode ? '#fff' : '#5287D7',
      textAlign: 'center',
      justifyContent:'center',
      alignItems:'center',
    },
      spinner: {
      marginBottom: 10,
    },
    badge: {
      position: 'absolute',
      right: -10,
      top: -10,
      backgroundColor: 'red',
      borderRadius: 10,
      padding: 2,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });
