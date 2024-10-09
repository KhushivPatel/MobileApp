// styles.ts
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

const createStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
  } as ViewStyle,
  scrollContent: {
    flex: 1,
  },
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
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  } as TextStyle,
   logotext: {
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 20,
    },
  headerImage: {
    width: 40,
    height: 20,
    resizeMode: 'contain',
  } as ImageStyle,
  detailcontainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  fileSelectRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  } as ViewStyle,
  fileSelectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    padding: 14,
    backgroundColor: isDarkMode ? '#DCEAFF' : '#DCEAFF',
    borderRadius: 5,
  } as ViewStyle,
  fileSelectText: {
    color: '#767676',
    fontSize: 16,
  } as TextStyle,
  dropdownIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  } as ImageStyle,
  dropdownMenu: {
    marginBottom: 10,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  } as ViewStyle,
  Request: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    paddingBottom: 10,
  } as TextStyle,
  dropdownItem: {
    borderBottomWidth: 1,
    borderColor: '#000',
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    color: '#000',
    borderRadius: 5,
  } as TextStyle,
  Requestcontainer: {
    marginVertical: 16,
    marginHorizontal: 16,
    flex: 1,
    padding: 14,
    backgroundColor: isDarkMode ? '#DCEAFF' : '#DCEAFF',
    borderRadius: 5,
  },
  textRight: {
    fontSize: 14,
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 4,
  } as TextStyle,
  textRow: {
    backgroundColor: isDarkMode ? '#869BBA' : '#DCEAFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  } as ViewStyle,
  textLeft: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
  } as TextStyle,
  attachtext: {
    color: '#ff0000',
    fontWeight: 'bold',
  } as TextStyle,
  ChooseButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#5287D7', // Blue background color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  } as ViewStyle,
  ChooseButtonText: {
    color: '#fff',
    fontSize: 16,
  } as TextStyle,
  text: {
    color: '#000',
    fontWeight: 'bold',
  } as TextStyle,
  otpcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  } as ViewStyle,
  otptext: {
    backgroundColor: isDarkMode ? '#869BBA' : '#DCEAFF',
    width: '67%',
    borderRadius: 10,
  } as ViewStyle,
  otpbutton: {
    backgroundColor: '#5287D7', // Blue background color
    width: '30%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  input: {
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  } as TextStyle,
 genderSelection: {
    marginVertical: 10,
  },
  genderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  radioSelected: {
    fontWeight: 'bold',
    color: 'blue', // Selected color
  },
  radioUnselected: {
    color: 'black', // Unselected color
  },
  inputContainer:{
    color:'black',
  },
  errorText:{
    color:'red',
  },
  label:{
      flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

});

export default createStyles;
