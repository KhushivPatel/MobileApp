import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

const createStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
  } as ViewStyle,

  scrollContainer: {
    paddingBottom: 20, // Additional padding to avoid clipping
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

  maincontainer: {
    margin: 10,
    borderWidth: 2,
    borderColor: isDarkMode ? '#333' : '#000', // Optional, for better visual separation
  } as ViewStyle,

  reciptnamedetail: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: isDarkMode ? '#333' : '#000', // Optional, for better visual separation
  } as ViewStyle,

  leftView: {
    flex: 1,
    padding: 10,
  } as ViewStyle,

  rightView: {
    flex: 1,
    padding: 10,
  } as ViewStyle,

  divider: {
    width: 1,
    backgroundColor: '#000', // Divider color
  } as ViewStyle,

  msucontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    borderBottomColor: '#000',
    borderWidth: 1,
  } as ViewStyle,

  msulogo: {
    height: 108,
    width: 93,
  } as ViewStyle,

  msu: {
    paddingTop: 10,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  } as TextStyle,

  recipttext: {
    paddingTop: 10,
    fontSize: 12,
    color: '#000',
  } as TextStyle,

  detailsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000', // Divider color
  } as ViewStyle,

  detailItem: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#000',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  } as ViewStyle,

  Course: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#000',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  } as ViewStyle,

  detailtextbold: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  } as TextStyle,

  detailtext: {
    fontSize: 12,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  } as TextStyle,

  number: {
    fontSize: 12,
    color: '#000',
  } as TextStyle,

  numbertext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  } as TextStyle,

  feeTotalsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  } as ViewStyle,

  feeHeader: {
    flex: 3,
    borderRightWidth: 1,
    borderColor: '#000',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  } as ViewStyle,

  feeItem: {
    flex: 5,
    borderRightWidth: 1,
    borderColor: '#000',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  } as ViewStyle,

  feeItem1: {
    flex: 2,
    borderRightWidth: 1,
    borderColor: '#000',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  } as ViewStyle,

  feeHeaderTextBold: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  } as TextStyle,

  feeText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  } as TextStyle,
});

export default createStyles;
