/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import Settings from './Settings';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import LogOut from './LogOut';
import {Image, Text, useColorScheme} from 'react-native';
import homeImage from '../../assets/icons/home-button.png';
import aboutImage from '../../assets/icons/aboutus.png';
import contactImage from '../../assets/icons/contact-us.png';
import logoutImage from '../../assets/icons/logout.png';
import settingImage from '../../assets/icons/settings.png';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDarkMode = useColorScheme() === 'dark'; // Detect if the device is in dark mode

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
        },
        tabBarActiveTintColor: isDarkMode ? '#5287D7' : '#5287D7', // Active tab color
        tabBarInactiveTintColor: isDarkMode ? 'lightgray' : 'gray', // Inactive tab color
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={homeImage}
              style={{
                width: focused ? 24 : 20, // Increase size if focused
                height: focused ? 24 : 20, // Increase size if focused
                tintColor: focused
                  ? '#5287D7'
                  : isDarkMode
                  ? 'lightgray'
                  : 'gray', // Change color based on focus and mode
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#5287D7' : isDarkMode ? 'lightgray' : 'gray', // Change color based on focus and mode
              }}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={aboutImage}
              style={{
                width: focused ? 24 : 20, // Increase size if focused
                height: focused ? 24 : 20, // Increase size if focused
                tintColor: focused
                  ? '#5287D7'
                  : isDarkMode
                  ? 'lightgray'
                  : 'gray', // Change color based on focus and mode
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#5287D7' : isDarkMode ? 'lightgray' : 'gray', // Change color based on focus and mode
              }}>
              About Us
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={settingImage}
              style={{
                width: focused ? 24 : 20, // Increase size if focused
                height: focused ? 24 : 20, // Increase size if focused
                tintColor: focused
                  ? '#5287D7'
                  : isDarkMode
                  ? 'lightgray'
                  : 'gray', // Change color based on focus and mode
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#5287D7' : isDarkMode ? 'lightgray' : 'gray', // Change color based on focus and mode
              }}>
              Settings
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={contactImage}
              style={{
                width: focused ? 24 : 20, // Increase size if focused
                height: focused ? 24 : 20, // Increase size if focused
                tintColor: focused
                  ? '#5287D7'
                  : isDarkMode
                  ? 'lightgray'
                  : 'gray', // Change color based on focus and mode
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#5287D7' : isDarkMode ? 'lightgray' : 'gray', // Change color based on focus and mode
              }}>
              Contact Us
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={LogOut}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={logoutImage}
              style={{
                width: focused ? 24 : 20, // Increase size if focused
                height: focused ? 24 : 20, // Increase size if focused
                tintColor: focused
                  ? '#5287D7'
                  : isDarkMode
                  ? 'lightgray'
                  : 'gray', // Change color based on focus and mode
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? '#5287D7' : isDarkMode ? 'lightgray' : 'gray', // Change color based on focus and mode
              }}>
              Log out
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
