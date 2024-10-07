import { StyleSheet } from 'react-native';

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginLeft: 10,
    },
    containerloading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    spinner: {
      marginBottom: 10,
    },
    loadingText: {
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 20,
    },
    noDataText: {
      textAlign: 'center',
      marginTop: 20,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    scrollView: {
      marginBottom: 16,
    },
    mainContent: {
      marginBottom: 20,
    },
    progressCard: {
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f8f8',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    companyText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    positionText: {
      fontSize: 14,
      color: isDarkMode ? '#ffffff' : '#555555',
    },
    locationText: {
      fontSize: 12,
      color: isDarkMode ? '#ffffff' : '#777777',
    },
    ctcText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    joiningDateText: {
      fontSize: 12,
      color: isDarkMode ? '#ffffff' : '#777777',
    },
    noteText: {
      fontSize: 12,
      color: isDarkMode ? '#ffffff' : '#777777',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: '80%',
      padding: 20,
      backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
      borderRadius: 10,
      elevation: 5,
    },
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    input: {
      height: 40,
      borderColor: isDarkMode ? '#ffffff' : '#000000',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    logotext: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 14,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
  });

export default createStyles;
