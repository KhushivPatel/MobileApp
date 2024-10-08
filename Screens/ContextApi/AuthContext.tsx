import React, {createContext, useState, ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import CustomAlert from '../CommanText/CustomAlert';
// Define user details interface
export interface UserDetails {
  name: string;
  email: string;
  // Add other user properties as needed
}

// Define the shape of the authentication context
export interface AuthContextType {
  authToken: string | null;
  userDetails: UserDetails | null;
  login: (
    credentials: LoginCredentials,
    navigation: NativeStackNavigationProp<RootStackParamList>,
  ) => Promise<void>;
  logout: () => void;
}

// Define the shape of login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Create an authentication context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Define the AuthProvider component to wrap around your app
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  // Login function to handle authentication
  const login = async (
    credentials: LoginCredentials,
    navigation: NativeStackNavigationProp<RootStackParamList>,
  ) => {
    const data = {
      username: credentials.email,
      password: credentials.password,
      loginValidateCaptcha: 'true',
    };
    // Headers required by the API
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json, text/plain, */*');
    myHeaders.append('accept-language', 'en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7');
    myHeaders.append('browser', 'chrome');
    myHeaders.append('browserversion', 'not known');
    myHeaders.append('city', 'not known');
    myHeaders.append('content-type', 'application/json');
    myHeaders.append('device', 'unknown');
    myHeaders.append('macaddress', 'not known');
    // myHeaders.append('origin', 'https://admission.msubaroda.ac.in');
    myHeaders.append('origin', 'http://172.25.15.22');
    myHeaders.append('os', 'windows');
    myHeaders.append('osversion', 'not known');
    myHeaders.append('priority', 'u=1, i');
    myHeaders.append(
      'referer',
      // 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
      'http://172.25.15.22/',
    );
    myHeaders.append(
      'sec-ch-ua',
      // '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
      '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    );
    myHeaders.append('sec-ch-ua-mobile', '?0');
    myHeaders.append('sec-ch-ua-platform', '"Windows"');
    myHeaders.append('sec-fetch-dest', 'empty');
    myHeaders.append('sec-fetch-mode', 'cors');
    myHeaders.append('sec-fetch-site', 'same-origin');
    myHeaders.append('sourceip', '');
    myHeaders.append(
      'token',
      '|zIdI[R|O-cs\\2J|zIdI[R|:2442358;4|zIdI[R|\\5KiUlqP[zIJ[ScTZuY5nCxNR',
      // '45L8GVnPp[WeGLV45L8GVnP:245262;6345L8GVnPo5KiLFW-1;CpYUsZDeNv{iklu',
    );
    myHeaders.append(
      'user-agent',
      // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    );
    try {
      // Making a POST request to the login API
      const response = await fetch(
        // 'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/Verification/login',
        'http://14.139.121.110:4760/Vidhyarthi_API/api/Verification/login',
        {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      const {response_code, obj, token} = result;
      // console.warn(result);
      // Handle successful login
      if (response_code === '200' && obj === 'TRUE') {
        setAuthToken(token);
        navigation.navigate('HomeScreen');
        // Optionally, set user details if provided from the API
        // setUserDetails({ name: 'John Doe', email: credentials.email });
        // localStorage.setItem('token', token);
      } else {
        setAlertMessage('Login failed. Please check your credentials.');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };

  // Logout function to clear authentication data
  const logout = () => {
    setAuthToken(null);
    setUserDetails(null);
    // localStorage.removeItem('token');
  };

  // Provide the authToken, userDetails, login, and logout methods via the context
  return (
    <AuthContext.Provider value={{authToken, userDetails, login, logout}}>
      {children}
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </AuthContext.Provider>
  );
};
