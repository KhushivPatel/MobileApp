import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
    },
    header: {
      height: 58,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#22395C' : '#5287D7',
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? 'transparent' : '#ddd',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    mainContainer: {
      marginBottom: 14,
      marginTop: 14,
      marginRight: 9,
      marginLeft: 9,
      backgroundColor: '#fff',
      borderRadius: 10,
      overflow: 'hidden', // Ensures children don't overflow rounded corners
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: isDarkMode ? '#565E69' : '#DCEAFF',
      borderTopLeftRadius: 10, // Rounded top corners
      borderTopRightRadius: 10,
    },
    leftTextContainer: {
      flex: 1,
    },
    mainText: {
      fontSize: 11,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    subText: {
      fontSize: 14,
      color: isDarkMode ? '#fff' : '#000',
      marginTop: 4,
    },
    arrowContainer: {
      paddingLeft: 10,
    },
    arrowImage: {
      width: 15, // Width of the arrow icon
      height: 15, // Height of the arrow icon
      resizeMode: 'contain', // Keep aspect ratio of the arrow
    },
    textContainer: {
      padding: 16,
      backgroundColor: isDarkMode ? '#869BBA' : '#B9D5FF',
      borderBottomLeftRadius: 10, // Rounded bottom corners
      borderBottomRightRadius: 10,
    },
    additionalText: {
      fontSize: 12,
      color: isDarkMode ? '#fff' : '#000',
    },
  });

export default createStyles;
