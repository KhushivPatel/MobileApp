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
import styles from './styles';
import { AuthContext } from '../../ContextApi/AuthContext';

interface UserResponse {
  response_code: string;
  obj: Array<{
    LastName: string;
    FirstName: string;
    EmailId: string;
    MobileNo: number;
    PRN: number;
  }>;
}

const ProfileScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const currentStyles = styles(isDarkMode);

  const {authToken, userDetails} = useContext(AuthContext);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastName] = useState<string | null>(null);
  const [emailid, setEmailid] = useState<string | null>(null);
  const [mobileno, setMobileNo] = useState<number | null>(null);
  const [prn, setPRN] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentDetailsTopNav/StudentDetailsTopNavGet',
          {
            method: 'GET',
            headers: {
              Referer:
                'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
              Token: authToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: UserResponse = await response.json();
        const user = data.obj[0];

        setFirstname(user.FirstName || 'No Firstname');
        setLastName(user.LastName || 'No Lastname');
        setEmailid(user.EmailId || 'No Email ID');
        setMobileNo(user.MobileNo || null);
        setPRN(user.PRN || null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <View style={currentStyles.containerloading}>
        <ActivityIndicator
          size="large"
          color={isDarkMode ? '#fff' : '#5287D7'}
          style={currentStyles.spinner}
        />
        <Text style={currentStyles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={currentStyles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.header}>
        <Text style={currentStyles.headerText}>Profile</Text>
        <View style={currentStyles.headerIcons}>
          <TouchableOpacity style={currentStyles.iconButton}>
            <Image
              source={require('../../../assets/icons/menu.png')}
              style={currentStyles.notification}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={currentStyles.mainContainer}>
        <View style={currentStyles.profileSection}>
          <Image
            source={require('../../../assets/images/profile.png')}
            style={currentStyles.profileImage}
          />
          <View style={currentStyles.infoContainer}>
            <View style={currentStyles.fullname}>
              <Text style={currentStyles.name}>{firstname}</Text>
              <Text style={currentStyles.name}> {lastname}</Text>
            </View>
            <Text style={currentStyles.email}>{emailid}</Text>
            <View style={currentStyles.divider} />
            <View style={currentStyles.boxContainer}>
              <View style={currentStyles.box}>
                <Text style={currentStyles.boxText}>PRN NO:</Text>
                <Text style={currentStyles.ans}>{prn}</Text>
              </View>
              <View style={currentStyles.box}>
                <Text style={currentStyles.boxText}>Ph No:</Text>
                <Text style={currentStyles.ans}>{mobileno}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={currentStyles.studentcomponent}
        contentContainerStyle={currentStyles.scrollViewContent}>
        <View style={currentStyles.studentDetailmain}>
          <View style={currentStyles.studentmenu}>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/images/profile1.png')}
                style={currentStyles.menuimg}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/images/profil2.png')}
                style={currentStyles.menuimg}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/images/profile3.png')}
                style={currentStyles.menuimg}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/images/profile4.png')}
                style={currentStyles.menuimg}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Text style={currentStyles.logotext}>
        The Maharaja Sayajirao University Of Baroda
      </Text>
    </View>
  );
};

export default ProfileScreen;
