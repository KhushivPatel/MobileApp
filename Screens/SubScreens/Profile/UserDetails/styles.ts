import { StyleSheet } from 'react-native';

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    Header:{
        fontSize:16,
        fontWeight:'bold',
        color:'#5287D7',
    },
 divider: {
      height: 1,
      backgroundColor: '#5D779E',
      marginTop: 10,
      marginBottom: 10,
    },
    infoContainer:{
        padding:5,
        marginTop:10,
    },
     nameContainer: {
    backgroundColor: '#E9F2F5',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
    flex:1,
  },
  nameLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
      flex:2,
  },
  firstName: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333',
       flex:2,
       marginLeft:20,
  },
    containerloading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      // backgroundColor: isDarkMode ? '#333' : '#fff',
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
    input: {
      flex: 2,
      // borderColor: isDarkMode ? '#ffffff' : '#cccccc',
      // borderWidth: 1,
      borderRadius: 5,
      // padding: 10,
      backgroundColor: isDarkMode ? '#333333' : '#B9D5FF',
      color: isDarkMode ? '#ffffff' : '#000000',
      // marginLeft: 10,
    },
      headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Align items at both ends
      alignItems: 'center', // Center items vertically
      // marginBottom: 20, // Add some space below
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
     button: {
      backgroundColor: isDarkMode ? '#5287D7' : '#5287D7', // Adjust based on your theme
      borderRadius: 10,
      height:30,
      // width:50,
      padding:6,
       justifyContent:'center',
      alignItems:'center',
      flexDirection: 'row',
    },
    buttonText: {
      color: '#ffffff', // Color for button text
      fontWeight: 'bold',
      // justifyContent:'center',
      // alignItems:'center',
      textAlign:'center',
    },
    Edit:{
      padding:4,
      margin:4,
      height:12,
      width:12,
      color:'#fff',
      tintColor: 'white',
    },
  });

export default styles;
