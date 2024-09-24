import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

const styles = (isDarkMode: boolean) =>
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
      // backgroundColor: isDarkMode ? '#565E69' : '#DCEAFF',
      borderRadius: 10,
    } as ViewStyle,
    textContainerRight: {
      padding: 10,
      alignItems: 'flex-start',
    } as ViewStyle,
    textRight: {
      fontSize: 14,
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 4,
      textAlign: 'right',
    } as TextStyle,
    textRow: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#5C78A0' : '#88AFE9',
      padding: 12,
      borderRadius: 10,
      marginBottom: 12,
    } as ViewStyle,
    textLeft: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
      flex: 0.5,
    } as TextStyle,
    detailContainer: {
      flex: 2,
      paddingTop: 12,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 20,
      backgroundColor: isDarkMode ? '#869BBA' : '#B9D5FF',
      // borderBottomLeftRadius: 10,
      // borderBottomRightRadius: 10,
      borderRadius:10,
      marginBottom:24,
    } as ViewStyle,
    boldText: {
      fontWeight: 'bold',
    } as TextStyle,
    smallText: {
      fontSize: 12,
    } as TextStyle,
    button: {
      marginTop: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: isDarkMode ? '#152947' : '#5287D7',
      borderRadius: 10,
      alignItems: 'center',
    } as ViewStyle,
    buttonText: {
      color: '#fff',
      fontSize: 16,
    } as TextStyle,
  });

export default styles;
