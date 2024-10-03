import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Welcome: undefined;
  LogIn: undefined;
};

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const AUTO_NAVIGATE_DELAY = 1000; // 3 seconds delay before navigating

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LogIn');
    }, AUTO_NAVIGATE_DELAY);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logo2.png')}
          style={styles.logo}
        />

        <Text style={styles.titleText}>The</Text>
        <Text style={styles.titleText}>Maharaja Sayajirao</Text>
        <Text style={styles.titleText}>University of Baroda</Text>

        <View style={styles.divider} />

        <Text style={styles.smallText}>MSUB - Vidhyarthi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Default background color
  },
  container: {
    width: '100%',
    alignItems: 'flex-start',
    paddingVertical: 248,
    paddingHorizontal: 21,
  },
  logo: {
    width: 93,
    height: 108,
    marginBottom: 15,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginLeft: 23,
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#000',
    marginVertical: 15,
    marginLeft: 23,
  },
  smallText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginLeft: 23,
  },
});

export default WelcomeScreen;
