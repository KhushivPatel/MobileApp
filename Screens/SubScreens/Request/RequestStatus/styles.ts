// styles.ts
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

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
    headerImage: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
    } as ImageStyle,
    scrollView: {
      flexGrow: 1,
    } as ViewStyle,
    mainContent: {
      marginVertical: 14,
      marginHorizontal: 9,
      backgroundColor: isDarkMode ? '#565E69' : '#DCEAFF',
      borderRadius: 10,
      padding: 10,
    } as ViewStyle,
    textContainerRight: {
      padding: 10,
      alignItems: 'flex-start',
    } as ViewStyle,
    textRight: {
      fontSize: 14,
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 4,
      flex: 2,
      textAlign: 'right',
    } as TextStyle,
    divider: {
      height: 2,
      backgroundColor: isDarkMode ? '#fff' : '#000',
      marginVertical: 10,
    } as ViewStyle,
    textRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#869BBA' : '#B9D5FF',
      padding: 12,
      borderRadius: 10,
      marginBottom: 10,
    } as ViewStyle,
    textLeft: {
      fontSize: 16,
      flex: 2,
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
    } as TextStyle,
    detailContainer: {
      padding: 5,
    } as ViewStyle,
    boldText: {
      fontWeight: 'bold',
    } as TextStyle,
    smallText: {
      fontSize: 12,
    } as TextStyle,
    logotext: {
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 20,
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
    },
    errorText: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16,
      color: 'red',
      textAlign: 'center',
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
      padding: 20,
    },
    noDataText: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
      color: '#3498DB',
      textAlign: 'center',
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
      padding: 20,
    },
  });

export default createStyles;
