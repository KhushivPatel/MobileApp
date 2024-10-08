// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable no-catch-shadow */
// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   useColorScheme,
//   ActivityIndicator,
// } from 'react-native';
// import {createStyles} from './styles';
// import Alert1 from '../CommanText/Alert1';
// import Alert2 from '../CommanText/Alert2';
// import { AuthContext } from '../ContextApi/AuthContext';
// import {useNavigation} from '@react-navigation/native';

// const HomeScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const {authToken, userDetails} = useContext(AuthContext);
//   const isDarkMode = useColorScheme() === 'dark';
//   const styles = createStyles(isDarkMode);
//   const [notificationCount, setNotificationCount] = useState<number>(0);
//   // Api call is started
//   const [firstname, setFirstname] = useState<string | null>(null);
//   const [emailid, setEmailid] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // const handleNotification = () => {
//   //   navigation.navigate('NotificationScreen');
//   // };
//   const handleProfile = () => {
//     navigation.navigate('ProfileScreen');
//   };
//   const handleidcard = () => {
//     navigation.navigate('View_id');
//   };
//   const handlerequestStatus = () => {
//     navigation.navigate('RequestStatus');
//   };
//   const handlenewRequest = () => {
//     navigation.navigate('NewRequest');
//   };
//   const handleEducation = () => {
//     navigation.navigate('EducationalList');
//   };
//   const handleTimetable = () => {
//     navigation.navigate('TimetableDetails');
//   };
//   const handleFee = () => {
//     navigation.navigate('Fee');
//   };
//   const handleCertificate = () => {
//     navigation.navigate('DownloadCertificate');
//   };
//   const handleConvocation = () => {
//     navigation.navigate('Convocation');
//   };
//   const handleProgress = () => {
//     navigation.navigate('Progress');
//   };

//   interface UserResponse {
//     response_code: string;
//     obj: Array<{
//       FirstName: string;
//       EmailId: string;
//     }>;
//   }

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await fetch(
//           'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentDetailsTopNav/StudentDetailsTopNavGet',
//           {
//             method: 'GET',
//             headers: {
//               Referer:
//                 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
//               Token: authToken,
//             },
//           },
//         );

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data: UserResponse = await response.json();
//         setNotificationCount(data.obj ? data.obj.length : 0);
//         const user = data.obj[0];
//         setFirstname(user.FirstName || 'No Firstname');
//         setEmailid(user.EmailId || 'No Email ID');
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.containerloading}>
//         <ActivityIndicator
//           size="large"
//           color={isDarkMode ? '#fff' : '#5287D7'}
//           style={styles.spinner}
//         />
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text>Error: {error}</Text>
//       </View>
//     );
//   }

//   // API call end
//   return (
//     <View style={styles.container}>
//       {/* Navbar part */}
//       <View style={styles.header}>
//         <Image
//           source={require('../../assets/images/msu_logo.png')}
//           style={styles.icon}
//         />
//         <Text style={styles.headerText}>
//           MSU INTEGRATED SYSTEM (MSUIS) VIDHYARTHI
//         </Text>
//         <View style={styles.headerIcons}></View>
//       </View>
//       {/* Details and menu part */}
//       <ScrollView>
//         <View style={styles.homestyle}>
//           {/* Profile part */}
//             <View style={styles.mainContent}>
//             <TouchableOpacity onPress={handleProfile}>
//               <View style={styles.infoContainer}>
//                 <View style={styles.textContainer}>
//                   <Text
//                     style={[
//                       styles.textItem,
//                       {
//                         fontSize: 24,
//                         color: isDarkMode ? '#fff' : '#000',
//                         fontWeight: 'bold',
//                       },
//                     ]}>
//                     Hello 👋
//                   </Text>
//                   {/* Display FirstName from API */}
//                   <Text
//                     style={[
//                       styles.textItem,
//                       {
//                         fontSize: 14,
//                         color: isDarkMode ? '#fff' : '#000',
//                         fontWeight: 'bold',
//                       },
//                     ]}>
//                     {firstname}
//                   </Text>
//                   {/* Display EmailId from API */}
//                   <Text
//                     style={[
//                       styles.textItem,
//                       {
//                         fontSize: 14,
//                         color: isDarkMode ? '#cdcdcd' : '#6B6B6B',
//                         fontWeight: 'bold',
//                       },
//                     ]}>
//                     {emailid}
//                   </Text>
//                 </View>
//                 <TouchableOpacity
//                   style={styles.arrowButton}
//                   onPress={handleProfile}>
//                   <Image
//                     source={require('../../assets/icons/arrow.png')}
//                     style={styles.arrow}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </TouchableOpacity>
//           </View>
//           {/* alert1 */}
//           <Alert1 />
//           {/* alert2 */}
//           {/* <Alert2 /> */}
//           {/* education details */}
//           <TouchableOpacity onPress={handleEducation}>
//             <View style={styles.educationDetailsContainer}>
//               <View style={styles.greetingTextContainer}>
//                 <Image
//                   source={require('../../assets/icons/book.png')}
//                   style={styles.bookIcon}
//                 />
//                 <Text style={styles.greetingText}>Educational Details</Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.expandDetailsButton}
//                 onPress={handleEducation}>
//                 <Image
//                   source={require('../../assets/icons/arrow.png')}
//                   style={styles.expandArrowIcon}
//                 />
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//           {/* convocation */}
//           <TouchableOpacity onPress={handleConvocation}>
//             <View style={styles.educationDetailsContainer}>
//               <View style={styles.greetingTextContainer}>
//                 <Image
//                   source={require('../../assets/icons/convo.png')}
//                   style={styles.bookIcon}
//                 />
//                 <Text style={styles.greetingText}>Convocation Details</Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.expandDetailsButton}
//                 onPress={handleConvocation}>
//                 <Image
//                   source={require('../../assets/icons/arrow.png')}
//                   style={styles.expandArrowIcon}
//                 />
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//           {/* progresion */}
//           <TouchableOpacity onPress={handleProgress}>
//             <View style={styles.educationDetailsContainer}>
//               <View style={styles.greetingTextContainer}>
//                 <Image
//                   source={require('../../assets/icons/progress.png')}
//                   style={styles.bookIcon}
//                 />
//                 <Text style={styles.greetingText}>Progress Details</Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.expandDetailsButton}
//                 onPress={handleProgress}>
//                 <Image
//                   source={require('../../assets/icons/arrow.png')}
//                   style={styles.expandArrowIcon}
//                 />
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//           {/* examination details */}
//           <View style={styles.ExaminationContainer}>
//             <Text style={styles.greetingText}>Examination</Text>
//             <View style={styles.rowContainer}>
//               <TouchableOpacity
//                 style={styles.coloredBox}
//                 onPress={handleTimetable}>
//                 <Text style={styles.boxText}>Time Table</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.coloredBox}
//                 onPress={handleidcard}>
//                 <Text style={styles.boxText}>ID Card</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* exam fee and hall tickets */}
//           <View style={styles.ExaminationContainer}>
//             <Text style={styles.greetingText}>Exam - Fee & Hall Ticket</Text>
//             <View style={styles.rowContainer}>
//               <TouchableOpacity style={styles.coloredBox} onPress={handleFee}>
//                 <Text style={styles.boxText}>Exam Fees</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.coloredBox}>
//                 <Text style={styles.boxText}>Hall Ticket</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* academics details */}
//           {/* request details */}
//           <View style={styles.ExaminationContainer}>
//             <Text style={styles.greetingText}>Request</Text>
//             <View style={styles.rowContainer}>
//               <TouchableOpacity
//                 style={styles.coloredBox}
//                 onPress={handlerequestStatus}>
//                 <Text style={styles.boxText}>Request Status</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.coloredBox}
//                 onPress={handlenewRequest}>
//                 <Text style={styles.boxText}>New Request</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* certificate details */}
//           <View style={styles.ExaminationContainer}>
//             <Text style={styles.greetingText}>Certificate</Text>
//             <View style={styles.rowContainer}>
//               <TouchableOpacity
//                 style={styles.coloredBox}
//                 onPress={handleCertificate}>
//                 <Text style={styles.boxText}>Download Certificate</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.coloredBox}>
//                 <Text style={styles.boxText}>Request Certificate</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* msu text */}
//           <Text style={styles.logotext}>
//             The Maharaja Sayajirao University of Baroda
//           </Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default HomeScreen;

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-catch-shadow */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import {createStyles} from './styles';
import Alert1 from '../CommanText/Alert1';
import Alert2 from '../CommanText/Alert2';
import {AuthContext} from '../ContextApi/AuthContext';
import {useNavigation} from '@react-navigation/native';
import ProgressForm from '../SubScreens/Progress/ProgressForm';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const {authToken} = useContext(AuthContext);
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  // State management
  const [userInfo, setUserInfo] = useState<{
    firstname: string | null;
    emailid: string | null;
  }>({firstname: null, emailid: null});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  // Fetch user information
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          // 'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentDetailsTopNav/StudentDetailsTopNavGet',
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentDetailsTopNav/StudentDetailsTopNavGet',
          {
            method: 'GET',
            headers: {
              Referer:
                // 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
                'http://172.25.15.22/',
              Token: authToken,
              // Token:
              //   '45L8GVnPp[WeGLV45L8GVnP:245262;6345L8GVnPo5KiLFW-1;CpYUsZDeNv{iklu',
            },
          },
        );

        if (!response.ok) {throw new Error('Network response was not ok');}

        const data = await response.json();
        setNotificationCount(data.obj ? data.obj.length : 0);

        const user = data.obj[0];
        setUserInfo({
          firstname: user.FirstName || 'No Firstname',
          emailid: user.EmailId || 'No Email ID',
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [authToken]);

  // Navigation handler
  const navigateTo = (screen: string) => () => {
    navigation.navigate(screen);
  };

  // Loading and error states
  if (loading) {
    return (
      <View style={styles.containerloading}>
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#fff' : '#5287D7'}
          style={styles.spinner}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  // Rendered component
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/msu_logo.png')}
          style={styles.icon}
        />
        <Text style={styles.headerText}>
          MSU INTEGRATED SYSTEM (MSUIS) VIDHYARTHI
        </Text>
        <View style={styles.headerIcons}></View>
      </View>

      {/* Main content */}
      <ScrollView>
        <View style={styles.homestyle}>
          {/* Profile Section */}
          <View style={styles.mainContent}>
            <TouchableOpacity onPress={navigateTo('ProfileScreen')}>
              <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.textItem,
                      {
                        fontSize: 24,
                        color: isDarkMode ? '#fff' : '#000',
                        fontWeight: 'bold',
                      },
                    ]}>
                    Hello 👋
                  </Text>
                  <Text
                    style={[
                      styles.textItem,
                      {
                        fontSize: 14,
                        color: isDarkMode ? '#fff' : '#000',
                        fontWeight: 'bold',
                      },
                    ]}>
                    {userInfo.firstname}
                  </Text>
                  <Text
                    style={[
                      styles.textItem,
                      {
                        fontSize: 14,
                        color: isDarkMode ? '#cdcdcd' : '#6B6B6B',
                        fontWeight: 'bold',
                      },
                    ]}>
                    {userInfo.emailid}
                  </Text>
                </View>
                <Image
                  source={require('../../assets/icons/arrow.png')}
                  style={styles.arrow}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Alerts */}
          <Alert1 />
          {/* <Alert2 /> */}

          {/* Educational Details */}
          <TouchableOpacity onPress={navigateTo('EducationalList')}>
            <View style={styles.educationDetailsContainer}>
              <View style={styles.greetingTextContainer}>
                <Image
                  source={require('../../assets/icons/book.png')}
                  style={styles.bookIcon}
                />
                <Text style={styles.greetingText}>Educational Details</Text>
              </View>
              <Image
                source={require('../../assets/icons/arrow.png')}
                style={styles.expandArrowIcon}
              />
            </View>
          </TouchableOpacity>

          {/* Convocation Details */}
          <TouchableOpacity onPress={navigateTo('Convocation')}>
            <View style={styles.educationDetailsContainer}>
              <View style={styles.greetingTextContainer}>
                <Image
                  source={require('../../assets/icons/convo.png')}
                  style={styles.bookIcon}
                />
                <Text style={styles.greetingText}>Convocation Details</Text>
              </View>
              <Image
                source={require('../../assets/icons/arrow.png')}
                style={styles.expandArrowIcon}
              />
            </View>
          </TouchableOpacity>

          {/* Progress Details */}
          <TouchableOpacity onPress={navigateTo('Progress')}>
            <View style={styles.educationDetailsContainer}>
              <View style={styles.greetingTextContainer}>
                <Image
                  source={require('../../assets/icons/progress.png')}
                  style={styles.bookIcon}
                />
                <Text style={styles.greetingText}>Progress Details</Text>
              </View>
              <Image
                source={require('../../assets/icons/arrow.png')}
                style={styles.expandArrowIcon}
              />
            </View>
          </TouchableOpacity>

          {/* Examination Section */}
          <View style={styles.ExaminationContainer}>
            <Text style={styles.greetingText}>Examination</Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.coloredBox}
                onPress={navigateTo('TimetableDetails')}>
                <Text style={styles.boxText}>Time Table</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.coloredBox}
                onPress={navigateTo('View_id')}>
                <Text style={styles.boxText}>ID Card</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Exam Fees & Hall Tickets */}
          <View style={styles.ExaminationContainer}>
            <Text style={styles.greetingText}>Exam - Fee & Hall Ticket</Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.coloredBox}
                onPress={navigateTo('Fee')}>
                <Text style={styles.boxText}>Exam Fees</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.coloredBox}>
                <Text style={styles.boxText}>Hall Ticket</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Request Section */}
          <View style={styles.ExaminationContainer}>
            <Text style={styles.greetingText}>Request</Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.coloredBox}
                onPress={navigateTo('RequestStatus')}>
                <Text style={styles.boxText}>Request Status</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.coloredBox}
                onPress={navigateTo('NewRequest')}>
                <Text style={styles.boxText}>New Request</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Certificate Section */}
          <View style={styles.ExaminationContainer}>
            <Text style={styles.greetingText}>Certificate</Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.coloredBox}
                onPress={navigateTo('DownloadCertificate')}>
                <Text style={styles.boxText}>Download Certificate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.coloredBox}>
                <Text style={styles.boxText}>Request Certificate</Text>
              </TouchableOpacity>
            </View>
          </View>
{/* <ProgressForm/> */}
          {/* MSU Footer */}
          <Text style={styles.logotext}>
            The Maharaja Sayajirao University of Baroda
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
