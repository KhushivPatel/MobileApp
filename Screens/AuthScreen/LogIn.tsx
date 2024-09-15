import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import createStyles from './styles'; // Import createStyles instead of styles

// Define the type for the stack parameters
type RootStackParamList = {
  Login: undefined;
  HomeScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LogIn: React.FC<Props> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const placeholderColor = isDarkMode ? '#dedede' : '#676767';

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    const data = {
      username: email,
      password: password,
      loginValidateCaptcha: 'true',
    };

    const myHeaders = new Headers();
    myHeaders.append('browser', 'chrome');
    myHeaders.append('browserversion', 'not known');
    myHeaders.append('city', 'not known');
    myHeaders.append('content-type', 'application/json');
    myHeaders.append('device', 'unknown');
    myHeaders.append('macaddress', 'not known');
    myHeaders.append('origin', 'https://admission.msubaroda.ac.in');
    myHeaders.append('os', 'windows');
    myHeaders.append('osversion', 'not known');
    myHeaders.append(
      'referer',
      'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
    );
    myHeaders.append(
      'sec-ch-ua',
      '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    );

    try {
      const response = await fetch(
        'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/Verification/login',
        {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      setLoading(false);

      // eslint-disable-next-line eqeqeq
      if (response.ok && result.token != '') {
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Login Failed', result.message || 'Something went wrong.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Error',
        'Unable to connect to the server. Please try again later.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/login_img.png')}
        style={styles.image}
      />

      <View style={styles.loginContainer}>
        <Text style={styles.title}>MSUB - Vidhyarthi</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor={placeholderColor}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={placeholderColor}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#5287D7" />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.universityText}>
        The Maharaja Sayajirao University Of Baroda
      </Text>
      <Text style={styles.termsText}>
        By logging in you are accepting all the terms and conditions
      </Text>
    </View>
  );
};

export default LogIn;
