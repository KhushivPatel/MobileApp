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
  });

export default styles;
