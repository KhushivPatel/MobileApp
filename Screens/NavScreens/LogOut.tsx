import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {AuthContext} from '../ContextApi/AuthContext'; // Path to your AuthProvider file
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App'; // Path to your navigation stack types

const LogOut = () => {
  const {logout} = useContext(AuthContext); // Access the logout function from the context
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Function to handle logout and navigate to the login screen
  const handleLogout = () => {
    logout();
    navigation.replace('LogIn'); // Navigate back to the login screen after logging out
  };

  return (
    <ImageBackground
      source={require('../../assets/images/maharajaimg.png')} // Background image
      style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/msu_logo.png')} // Logout icon or relevant image
          style={styles.icon}
        />
        <Text style={styles.title}>Are you sure you want to logout?</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LogOut;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Adding a translucent layer on top of the background
    width: '100%',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    tintColor: '#fff', // Optional: Tint the image color if needed
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // Adds elevation for Android shadow effect
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
