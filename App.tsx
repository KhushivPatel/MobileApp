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
import EducationalList from './Screens/SubScreens/Education/EducationalList';
import TimetableDetails from './Screens/SubScreens/Examination/TimeTable/TimetableDetails';
import Fee from './Screens/SubScreens/Exam/ExamFee/Fee';
import View_timetable from './Screens/SubScreens/Examination/TimeTable/View_timetable';
import FeeRecipt from './Screens/SubScreens/Exam/ExamFee/FeeRecipt';
import {AuthProvider} from './Screens/ContextApi/AuthContext';
import {UserDetailProvider} from './Screens/ContextApi/UserDetailContext';
import Educationinfo from './Screens/SubScreens/Profile/UserDetails/Educationinfo';
import 'react-native-gesture-handler';
import {ExamProvider} from './Screens/ContextApi/ExamProvider';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tabs from './Screens/NavScreens/Tabs';
import LogOut from './Screens/NavScreens/LogOut';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  LogIn: undefined;
  HomeScreen: undefined;
  NotificationScreen: undefined;
  ProfileScreen: undefined;
  View_id: undefined;
  RequestStatus: undefined;
  NewRequest: undefined;
  EducationalList: undefined;
  TimetableDetails: undefined;
  Fee: undefined;
  View_timetable: undefined;
  FeeRecipt: undefined;
  Educationinfo: undefined;
  AboutUs: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <AuthProvider>
      <UserDetailProvider>
        <ExamProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {/* <Tabs/> */}
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
              <Stack.Screen name="LogIn" component={LogIn} />
              <Stack.Screen name="HomeScreen" component={Tabs} />
              <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="View_id" component={View_id} />
              <Stack.Screen name="RequestStatus" component={RequestStatus} />
              <Stack.Screen name="NewRequest" component={NewRequest} />
              <Stack.Screen
                name="EducationalList"
                component={EducationalList}
              />
              <Stack.Screen name="Fee" component={Fee} />
              <Stack.Screen
                name="TimetableDetails"
                component={TimetableDetails}
              />
              <Stack.Screen name="View_timetable" component={View_timetable} />
              <Stack.Screen name="FeeRecipt" component={FeeRecipt} />
              <Stack.Screen name="Educationinfo" component={Educationinfo} />
              <Stack.Screen name="LogOut" component={LogOut} />
            </Stack.Navigator>
          </NavigationContainer>
        </ExamProvider>
      </UserDetailProvider>
    </AuthProvider>
  );
};

export default App;
