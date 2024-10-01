import { StyleSheet } from 'react-native';

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f8f8f8',
    },
    notification: {
      height: 20,
      width: 20,
    },
    header: {
      height: 58,
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 8,
      backgroundColor: isDarkMode ? '#22395C' : '#5287D7',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? 'transparent' : '#ddd',
    },
    headerText: {
      marginLeft:10,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: 16,
    },
    mainContainer: {
      padding: 20,
    },
    profileSection: {
      flexDirection: 'row',
    },
    profileImage: {
      width: 111,
      height: 111,
      borderRadius: 23,
      marginRight: 16,
    },
    infoContainer: {
      flex: 1,
      height: 111,
      backgroundColor: isDarkMode ? '#565E69' : '#DCEAFF',
      borderRadius: 17,
      padding: 10,
    },
    fullname:{
      flex:1,
      flexDirection:'row',
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
        name: {
      fontSize: 15,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    email: {
      fontSize: 12,
      color: isDarkMode ? '#ddd' : '#555',
    },
    divider: {
      height: 1,
      backgroundColor: '#5D779E',
      marginTop: 5,
    },
    boxContainer: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    box: {
      backgroundColor: isDarkMode ? '#869BBA' : '#B9D5FF',
      flex: 1,
      height: 45,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    boxText: {
      fontSize: 12,
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    boxans: {
      backgroundColor: isDarkMode ? '#5C78A0' : '#88AFE9',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    ans: {
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 30, // Center text vertically
      color: isDarkMode ? '#fff' : '#000',
    },
    studentcomponent: {
      paddingHorizontal: 10,
    },
    scrollViewContent: {
      flexGrow: 1, // Ensures the content container takes up all available space
    },
    studentDetailmain: {
      backgroundColor: isDarkMode ? '#565E69' : '#DCEAFF',
      borderRadius: 14,
      paddingBottom: 20,
      flex: 1,
    },
    studentmenu: {
      flexDirection: 'row',
      backgroundColor: isDarkMode ? '#869BBA' : '#B9D5FF',
      borderRadius: 14,
      height: 53,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    menuimg: {
      height: 20,
      width: 20,
    },
   logotext: {
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
    },
     tabButton: {
      paddingBottom: 10,
      borderBottomWidth: 0, // Default no border
    },
    activeTab: {
      borderBottomWidth: 2,  // Make the underline
      borderBottomColor: '#5287D7', // You can change the color
    },
    tabContentContainer: {
      padding: 10,
      // backgroundColor: isDarkMode ? '#222' : '#fff',
    },
    tabContent: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
    },
  });

export default styles;
