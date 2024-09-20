import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './Screens/WelcomeScreen/WelcomeScreen';
import LogIn from './Screens/AuthScreen/LogIn';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import NotificationScreen from './Screens/Notification/NotificationScreen';
import ProfileScreen from './Screens/SubScreens/Profile/ProfileScreen';
import View_id from './Screens/SubScreens/Examination/IdCard/View_id';
import RequestStatus from './Screens/SubScreens/Request/RequestStatus/RequestStatus';
import NewRequest from './Screens/SubScreens/Request/NewRequest/NewRequest';
import SimpleView from './Screens/SubScreens/Examination/IdCard/simpleview/SimpleView';
import EducationalList from './Screens/SubScreens/Education/EducationalList';
import TimetableDetails from './Screens/SubScreens/Examination/TimeTable/TimetableDetails';
import Fee from './Screens/SubScreens/Exam/ExamFee/Fee';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{headerShown: false}}
        />
        {/* drowar navigation  pandding */}
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="View_id"
          component={View_id}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SimpleView"
          component={SimpleView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RequestStatus"
          component={RequestStatus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewRequest"
          component={NewRequest}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EducationalList"
          component={EducationalList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TimetableDetails"
          component={TimetableDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Fee"
          component={Fee}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
