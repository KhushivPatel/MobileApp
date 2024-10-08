import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import createStyles from './styles'; // Import styles from the new file
import {AuthContext} from '../../../ContextApi/AuthContext'; // Assuming AuthContext is already set up

interface RequestItem {
  Id: number;
  Request: string;
}

const NewRequest: React.FC = () => {
  const styles = createStyles(false); // Update this if you have dark mode logic
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] =
    useState<string>('Request to Change');
  const [existingValue, setExistingValue] = useState<string>('');
  const [inputPlaceholder, setInputPlaceholder] = useState<string>('');
  const [isOTPVisible, setIsOTPVisible] = useState<boolean>(false);
  const [requests, setRequests] = useState<RequestItem[]>([]); // API request data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {authToken} = useContext(AuthContext);

  // Fetch request options from the API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/RequestListForProfileGet',
          {
            method: 'GET',
            headers: {
              Referer: 'http://172.25.15.22/',
              Token: authToken,
              'Content-Type': 'application/json',
            },
          },
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        setRequests(result.obj); // Store the API response
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [authToken]);

  // Handle file selection using DocumentPicker
  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(result[0].name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };

  // Handle selecting a request from the dropdown
  // const handleDropdownSelect = (item: string) => {
  //   setSelectedRequest(item);
  //   setDropdownVisible(false);

  //   if (item === 'Mobile Number' || item === 'Email ID') {
  //     setIsOTPVisible(true);
  //   } else {
  //     setIsOTPVisible(false);
  //   }

  //   // Set input placeholder and existing value logic (customize as needed)
  //   const setting = settings[item] || {existingValue: '', placeholder: ''};
  //   setExistingValue(setting.existingValue);
  //   setInputPlaceholder(setting.placeholder);
  // };
const handleDropdownSelect = (item: string) => {
  setSelectedRequest(item);
  setDropdownVisible(false);

  if (item === 'Mobile Number' || item === 'Email ID') {
    setIsOTPVisible(true);
  } else {
    setIsOTPVisible(false);
  }

  // Update existing value and placeholder based on the selected request
  switch (item) {
    case 'Mobile Number':
      setExistingValue('Current Mobile Number'); // Set existing mobile number if available
      setInputPlaceholder('Enter New Mobile Number');
      break;
    case 'Email ID':
      setExistingValue('Current Email ID'); // Set existing email ID if available
      setInputPlaceholder('Enter New Email ID');
      break;
    case 'Gender':
      setExistingValue('Current Gender'); // Set existing gender if available
      setInputPlaceholder('Enter New Gender');
      break;
    case 'Date Of Birth':
      setExistingValue('Current Date of Birth'); // Set existing DOB if available
      setInputPlaceholder('Enter New Date of Birth');
      break;
    case 'Name as per Marksheet':
      setExistingValue('Current Name'); // Set existing name as per marksheet if available
      setInputPlaceholder('Enter New Name as per Marksheet');
      break;
    case 'Mother Name':
      setExistingValue("Current Mother's Name"); // Set existing mother name if available
      setInputPlaceholder("Enter New Mother's Name");
      break;
    case 'Upload Document (Photo Id)':
      setExistingValue(''); // No existing value for file uploads
      setInputPlaceholder('');
      break;
    case 'Photo':
      setExistingValue('Current Photo'); // Set if there's an existing photo
      setInputPlaceholder('Upload New Photo');
      break;
    default:
      setExistingValue('');
      setInputPlaceholder('');
      break;
  }
};

  // Toggle the dropdown visibility
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  // Render the dynamic dropdown menu
  const renderDropdownMenu = () => (
    <View style={styles.dropdownMenu}>
      {requests.map(item => (
        <TouchableOpacity
          key={item.Id}
          onPress={() => handleDropdownSelect(item.Request)}>
          <Text style={styles.dropdownItem}>{item.Request}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Render the file section based on selected request
  const renderFileSection = () => (
    <View style={styles.textRow}>
      <Text style={styles.attachtext}>
        {selectedRequest.includes('First Name') &&
          'Please Attach School Leaving Certificate *'}
        {selectedRequest.includes('Last Name') &&
          'Please Attach School Leaving Certificate *'}
        {selectedRequest.includes('Date Of Birth') &&
          'Please Attach LC/ Birth Certificate *'}
        {selectedRequest.includes('Photo') && 'Upload New Photo'}
        {selectedRequest.includes('Name as per Marksheet') &&
          'Please Attach Standard X or XII Certificate *'}
      </Text>
      <TouchableOpacity style={styles.ChooseButton} onPress={handleFileSelect}>
        <Text style={styles.ChooseButtonText}>Choose File</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        {selectedFile ? selectedFile : 'No File Selected'}
      </Text>
    </View>
  );

  // Render the OTP section based on request type
  const renderOTPSection = () => (
    <>
      <View style={styles.otpcontainer}>
        <View style={styles.otptext}>
          <TextInput style={styles.input} placeholder="Enter OTP" />
        </View>
        <View style={styles.otpbutton}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.otpcontainer}>
        <View style={styles.otptext}>
          <TextInput style={styles.input} placeholder="Enter OTP" />
        </View>
        <View style={styles.otpbutton}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Request Status</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedFile(null);
            setSelectedRequest('Request to Change');
            setExistingValue('');
            setInputPlaceholder('');
            setIsOTPVisible(false);
            setDropdownVisible(false);
          }}>
          <Image
            source={require('../../../../assets/icons/whitereload.png')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.detailcontainer}>
          <View style={styles.fileSelectRow}>
            <TouchableOpacity
              style={styles.fileSelectButton}
              onPress={toggleDropdown}>
              <Text style={styles.fileSelectText}>{selectedRequest}</Text>
              <Image
                source={require('../../../../assets/icons/arrowdown.png')}
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
          </View>
          {dropdownVisible && renderDropdownMenu()}

          {/* Display Selected Request Details */}
          <View style={styles.textRow}>
            <Text style={styles.textLeft}>Request To Change</Text>
            <Text style={styles.textRight}>{selectedRequest}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.textLeft}>Existing {selectedRequest}</Text>
            <Text style={styles.textRight}>{existingValue}</Text>
          </View>
          <View style={styles.textRow}>
            <TextInput placeholder={inputPlaceholder} />
          </View>

          {selectedRequest !== 'Mobile Number' &&
            selectedRequest !== 'Email ID' &&
            renderFileSection()}

          {isOTPVisible && renderOTPSection()}

          <View style={styles.textRow}>
            <TextInput placeholder="Reason Of Request" />
          </View>
          <TouchableOpacity style={styles.ChooseButton}>
            <Text style={styles.ChooseButtonText}>Send Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Text style={styles.logotext}>
        The Maharaja Sayajirao University of Baroda
      </Text>
    </View>
  );
};

export default NewRequest;
