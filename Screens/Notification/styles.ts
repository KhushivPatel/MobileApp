import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

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
      marginBottom: 16,
    } as ViewStyle,
    headerText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    } as TextStyle,
    notificationList: {
      padding: 20,
    } as ViewStyle,
    notificationContainer: {
      marginBottom: 16,
    } as ViewStyle,
    notificationTitle: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 16,
    } as TextStyle,
    notificationDescription: {
      fontSize: 14,
      color: '#000',
      marginTop: 4,
    } as TextStyle,
    noNotificationsText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
    } as TextStyle,
    divider: {
      height: 1,
      backgroundColor: '#ccc',
      marginVertical: 10,
    } as ViewStyle,
    markAsRead: {
      color: isDarkMode ? 'white' : 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 20,
    } as TextStyle,
    textRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#565E69' : '#DCEAFF',
      borderRadius: 10,
      marginBottom: 10,
    } as ViewStyle,
    constantmessage: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#565E69' : '#DCEAFF',
      padding:6,
      margin:10,
        borderRadius: 10,
    } as ViewStyle,
    notificationImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginRight: 10,
    } as ViewStyle,
    notificationTextContainer: {
      flex: 1,
    } as ViewStyle,
    datecontainer: {
      backgroundColor: isDarkMode ? '#869BBA' : '#B9D5FF',
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      padding: 10,
    },
    padding: {
      padding: 10,
    },
    datetext: {
      color: '#002E74',
      fontWeight: 'bold',
    },
    scroll: {
      flexGrow: 1,
    },
    logotext: {
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
    },
    scrollViewContent:{
      padding:10,
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
  });

export default createStyles;
