// ResultPrintStyles.ts
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    result: {
      borderColor: '#000',
      borderWidth: 1,
      margin: 14,
    } as ViewStyle,
    msutitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    } as ViewStyle,
    logo: {
      height: 55,
      width: 55,
    } as ViewStyle,
    msutext: {
      padding: 10,
      alignItems: 'center',
    } as ViewStyle,
    text: {
      fontSize: 14,
      color: '#000',
    } as TextStyle,
    subtext: {
      fontWeight: 'bold',
      fontSize: 11,
      color: '#000',
    } as TextStyle,
    examdatetext: {
      borderWidth: 1,
      borderTopColor: '#000',
      borderBottomColor: '#000',
      borderRightColor: '#fff',
      borderLeftColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingRight: 11,
      paddingLeft: 11,
      paddingTop: 10,
      paddingBottom: 10,
    } as ViewStyle,
    horizontalScrollView: {
      flexGrow: 1,
    } as ViewStyle,
    horizontalContainer: {
      flexDirection: 'row',
    } as ViewStyle,
    columnContainer: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
    } as ViewStyle,
    headerText: {
      fontSize: 14,
      fontWeight: 'bold',
      marginRight: 10,
      textAlign: 'center',
      borderRightWidth: 1,
      borderColor: '#000',
    } as TextStyle,
    sectionContainer: {} as ViewStyle,
    mainText: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      borderRightWidth: 1,
      borderColor: '#000',
      padding: 10,
    } as TextStyle,
    subTextContainer: {
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderColor: '#000',
      flexDirection: 'row',
      flexWrap: 'nowrap',
    } as ViewStyle,
    subText: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 2,
      borderLeftWidth: 1,
      borderColor: '#000',
    } as TextStyle,
  });

export default createStyles;
