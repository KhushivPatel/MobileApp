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
import ExamImage from '../../assets/icons/exam.png';
import FeeImage from '../../assets/icons/fee.png';
import PaperImage from '../../assets/icons/papers.png';
import settingImage from '../../assets/icons/settings.png';
import ExaminationDetails from '../SubScreens/FeesDetails/ExaminationDetails';
import Fee from '../SubScreens/Exam/ExamFee/Fee';
import PaperList from '../SubScreens/Paper/PaperSelection/PaperList';

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
        name="ExaminationDetails"
        component={ExaminationDetails}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={ExamImage}
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
              Examination
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Fee"
        component={Fee}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={FeeImage}
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
              Fees Details
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="PaperList"
        component={PaperList}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={PaperImage}
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
              Paper List
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
