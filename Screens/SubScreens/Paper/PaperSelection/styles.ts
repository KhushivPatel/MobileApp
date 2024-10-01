import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f8f8f8',
    },
    header: {
      height: 58,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? '#22395C' : '#5287D7',
    },
    dividerView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    headerText: {
      marginLeft:10,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
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
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    scrollView: {
      flexGrow: 1,
    },
    mainContent: {
      marginVertical: 10,
      marginHorizontal: 10,
      backgroundColor: '#B9D5FF',
      borderRadius: 10,
    },
    idContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#DCEAFF',
      borderRadius: 10,
      padding: 10,
    },
    arrow: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
    },
    programNameContainer: {
      flex: 1,
      alignItems: 'flex-start',
      margin:10,
      backgroundColor: '#DCEAFF',
      borderRadius: 10,
      padding: 10,
    },
    programNameText: {
      fontSize: 14,
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
      marginBottom: 4,
    },
    textRight: {
      fontSize: 14,
      color: isDarkMode ? '#fff' : '#000',
      textAlign: 'right',
    },
    textRow: {
      flexDirection: 'row', // Makes the text and image align horizontally
      justifyContent: 'space-between', // Pushes text to the left and image to the right
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#5C78A0' : '#88AFE9',
      padding: 16,
      borderRadius: 10,
    //   marginBottom: 15,
    },
    textLeft: {
      fontSize: 14,
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
      flex: 1, // Allows the text to take up most of the space on the left
    },
    detailContainer: {
      flex: 1,
      alignItems: 'flex-start',
      margin:10,
    },
  });
