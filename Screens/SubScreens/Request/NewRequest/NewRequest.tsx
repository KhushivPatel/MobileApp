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
  const [studentDetails, setStudentDetails] = useState<any>(null); // To hold student details
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string>(''); // State for mobile number input
  const [newMobileNumber, setNewMobileNumber] = useState<string>(''); // State for new mobile number
  const [otp, setOtp] = useState<string>(''); // State for mobile OTP input
  const [newEmail, setNewEmail] = useState<string>(''); // State for new email input
  const [emailOtp, setEmailOtp] = useState<string>(''); // State for email OTP input
  const {authToken} = useContext(AuthContext);
  const [verificationOtp, setVerificationOtp] = useState<string>(''); // State for verification OTP input
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null,
  ); // State to hold the selected request ID
  const [gender, setGender] = useState<string>(''); // State for selected gender
  const [reasonOfRequest, setReasonOfRequest] = useState<string>('');
  const [previousRequests, setPreviousRequests] = useState<number[]>([]); // State to hold previous request IDs

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

  // Fetch existing student data from the API
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentDetailsTopNav/StudentDetailsTopNavGet',
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
          throw new Error('Failed to fetch student details');
        }

        setStudentDetails(result.obj[0]); // Assuming only one student object is returned
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchStudentDetails();
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
  const handleDropdownSelect = (item: RequestItem) => {
    setSelectedRequest(item.Request);
    setSelectedRequestId(item.Id); // Set the selected request ID
    setDropdownVisible(false);

    if (item.Request === 'Mobile Number' || item.Request === 'Email ID') {
      setIsOTPVisible(true);
    } else {
      setIsOTPVisible(false);
    }

    // Update existing value and placeholder based on the selected request
    switch (item.Request) {
      case 'Mobile Number':
        setExistingValue(studentDetails?.MobileNo || ''); // Get existing mobile number from student details
        setInputPlaceholder('Enter New Mobile Number');
        break;
      case 'Email ID':
        setExistingValue(studentDetails?.EmailId || ''); // Get existing email from student details
        setInputPlaceholder('Enter New Email ID');
        break;
      case 'Gender':
        setExistingValue(studentDetails?.Gender || ''); // Get existing gender
        setInputPlaceholder('Enter New Gender');
        break;
      case 'Date Of Birth':
        setExistingValue(studentDetails?.DOB || ''); // Get existing DOB
        setInputPlaceholder('Enter New Date of Birth');
        break;
      case 'Name as per Marksheet':
        setExistingValue(studentDetails?.NameAsPerMarksheet || ''); // Get existing name
        setInputPlaceholder('Enter New Name as per Marksheet');
        break;
      case 'Mother Name':
        setExistingValue(studentDetails?.MotherName || ''); // Get existing mother name
        setInputPlaceholder("Enter New Mother's Name");
        break;
      case 'Upload Document (Photo Id)':
        setExistingValue(''); // No existing value for file uploads
        setInputPlaceholder('');
        break;
      case 'Photo':
        setExistingValue(studentDetails?.StudentPhoto || ''); // Get existing photo
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
          onPress={() => handleDropdownSelect(item)}>
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
  // submit

  // Check if the request already exists before sending a new one
  const isRequestAlreadyExists = (requestId: number) => {
    return previousRequests.includes(requestId);
  };

  // Handle sending request with all required information
  const handleSendRequest = async () => {
    // Check if the request with the same RequestId already exists
    if (isRequestAlreadyExists(selectedRequestId!)) {
      Alert.alert(
        'Request already exists!',
        'This request has already been sent.',
      );
      return;
    }

    // Create the payload based on the selected request type
    const payload = {
      RequestId: selectedRequestId, // Use the dynamic Request ID
      ReasonOfRequest: reasonOfRequest, // Reason for the request
      ExistingRecord: existingValue, // Existing mobile number or email
      ChangeRecord:
        selectedRequest === 'Mobile Number' ? newMobileNumber : newEmail, // New value based on request type
      IsDeclared: true,
      MobileOTP: selectedRequest === 'Mobile Number' ? otp : null, // Include mobile OTP if applicable
      EmailOTP: selectedRequest === 'Email ID' ? emailOtp : null, // Include email OTP if applicable
      ShowName: studentDetails
        ? `${studentDetails.FirstName} ${studentDetails.LastName}`
        : '', // Assuming you have these fields
      RequestName: selectedRequest, // Selected request name
    };

    try {
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/SendRequest',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Referer: 'http://172.25.15.22/',
            Token: authToken,
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send request');
      }

      // Handle successful request
      alert('Request sent successfully!');

      // Add the RequestId to the previous requests to avoid duplicates
      setPreviousRequests([...previousRequests, selectedRequestId!]);
    } catch (err: any) {
      alert(err.message || 'Error sending request');
    }
  };

  // Render loading state or error message
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  // Handle OTP sending logic for mobile
  const handleSendMobileOTP = async () => {
    const requestId = selectedRequestId; // Use the dynamic Request ID
    const payload = {
      RequestId: requestId,
      ReasonOfRequest: null,
      ExistingRecord: existingValue, // Existing mobile number from student details
      ChangeRecord: newMobileNumber, // New mobile number input by user
      IsDeclared: true,
      MobileOTP: otp, // OTP entered by the user
    };

    try {
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/MobileOTP',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Referer: 'http://172.25.15.22/',
            Token: authToken,
          },
          body: JSON.stringify(payload),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send OTP');
      }
      alert('OTP sent successfully');
    } catch (err: any) {
      alert(err.message || 'Error sending OTP');
    }
  };

  // Handle OTP sending logic for email
  const handleSendEmailOTP = async () => {
    const requestId = selectedRequestId; // Use the dynamic Request ID
    const payload = {
      RequestId: requestId,
      ReasonOfRequest: null,
      ExistingRecord: existingValue, // Existing email from student details
      ChangeRecord: newEmail, // New email input by user
      IsDeclared: true,
      EmailOTP: emailOtp, // OTP entered by the user
    };

    try {
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/EmailOTP',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Referer: 'http://172.25.15.22/',
            Token: authToken,
          },
          body: JSON.stringify(payload),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send OTP');
      }
      alert('Email OTP sent successfully');
    } catch (err: any) {
      alert(err.message || 'Error sending Email OTP');
    }
  };
  // Render the OTP section for mobile or email
  // Render the OTP section for mobile or email
  const renderOTPSection = () => (
    <View>
      {selectedRequest === 'Mobile Number' && (
        <>
          <View style={styles.otpcontainer}>
            <View style={styles.otptext}>
              <TextInput
                style={styles.input}
                placeholder="Enter New Mobile Number"
                value={newMobileNumber}
                onChangeText={setNewMobileNumber}
              />
            </View>
            <View style={styles.otpbutton}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSendMobileOTP}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.otpcontainer}>
            <View style={styles.otptext}>
              <TextInput
                style={styles.input}
                placeholder="Enter Verification OTP"
                value={verificationOtp}
                onChangeText={setVerificationOtp}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.otpbutton}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {selectedRequest === 'Email ID' && (
        <>
          <View style={styles.otpcontainer}>
            <View style={styles.otptext}>
              <TextInput
                style={styles.input}
                placeholder="Enter New Email ID"
                value={newEmail}
                onChangeText={setNewEmail}
              />
            </View>
            <View style={styles.otpbutton}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSendEmailOTP}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.otpcontainer}>
            <View style={styles.otptext}>
              <TextInput
                style={styles.input}
                placeholder="Enter Verification Email OTP"
                value={verificationOtp}
                onChangeText={setVerificationOtp}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.otpbutton}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Verify Email OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );

  // Loading state rendering
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
  };

  // Render the gender radio buttons if the selected request is 'Gender'
  const renderGenderSelection = () => {
    return (
      <View style={styles.genderSelection}>
        <Text style={styles.genderLabel}>Select Gender:</Text>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handleGenderChange('Male')}>
          <Text
            style={
              gender === 'Male' ? styles.radioSelected : styles.radioUnselected
            }>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handleGenderChange('Female')}>
          <Text
            style={
              gender === 'Female'
                ? styles.radioSelected
                : styles.radioUnselected
            }>
            Female
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handleGenderChange('Other')}>
          <Text
            style={
              gender === 'Other' ? styles.radioSelected : styles.radioUnselected
            }>
            Other
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
            setMobileNumber(''); // Reset mobile number state
            setNewMobileNumber(''); // Reset new mobile number state
            setNewEmail(''); // Reset new email state
            setOtp(''); // Reset mobile OTP state
            setEmailOtp(''); // Reset email OTP state
          }}>
          <Image
            source={require('../../../../assets/icons/whitereload.png')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.detailcontainer}>
          {/* Dropdown to select request */}
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
            <TextInput
              placeholder="Reason Of Request"
              value={reasonOfRequest}
              onChangeText={setReasonOfRequest} // Update reasonOfRequest state
            />
          </View>

          <View style={styles.textRow}>
            <Text style={styles.textLeft}>Existing {selectedRequest}</Text>
            <Text style={styles.textRight}>{existingValue}</Text>
          </View>
          <View style={styles.textRow}>
            <TextInput
              placeholder={inputPlaceholder}
              value={
                selectedRequest === 'Mobile Number' ? newMobileNumber : newEmail
              }
              onChangeText={text => {
                if (selectedRequest === 'Mobile Number') {
                  setNewMobileNumber(text);
                } else if (selectedRequest === 'Email ID') {
                  setNewEmail(text);
                }
              }}
            />
          </View>
          {selectedRequest === 'Gender' && renderGenderSelection()}

          {selectedRequest !== 'Gender' && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{inputPlaceholder}</Text>
              <TextInput
                style={styles.input}
                value={existingValue}
                onChangeText={setExistingValue}
                placeholder={inputPlaceholder}
              />
            </View>
          )}
          {isOTPVisible && renderOTPSection()}

          <View style={styles.textRow}>
            <TextInput placeholder="Reason Of Request" />
          </View>

          {renderFileSection()}

          <TouchableOpacity
            style={styles.ChooseButton}
            onPress={handleSendRequest}>
            <Text style={styles.ChooseButtonText}>Send Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewRequest;
