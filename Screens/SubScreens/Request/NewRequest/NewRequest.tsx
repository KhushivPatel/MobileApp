import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  useColorScheme,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import createStyles from './styles'; // Import styles from the new file

const REQUEST_OPTIONS = [
  'First Name',
  'Last Name',
  'Mobile Number',
  'Email ID',
  'Date Of Birth',
  'Name as per Marksheet',
  'Photo',
];

const NewRequest: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] =
    useState<string>('Request to Change');
  const [existingValue, setExistingValue] = useState<string>('');
  const [inputPlaceholder, setInputPlaceholder] = useState<string>('');
  const [isOTPVisible, setIsOTPVisible] = useState<boolean>(false);

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

  const handleDropdownSelect = (item: string) => {
    setSelectedRequest(item);
    setDropdownVisible(false);

    if (item === 'Mobile Number' || item === 'Email ID') {
      setIsOTPVisible(true);
    } else {
      setIsOTPVisible(false);
    }

    const settings = {
      'Request to Change First Name': {
        existingValue: 'First2050054',
        placeholder: 'New First Name',
      },
      'Last Name': {existingValue: 'Last2050054', placeholder: 'New Last Name'},
      'Date Of Birth': {
        existingValue: '01/01/2000',
        placeholder: 'New Date of Birth',
      },
      'Mobile Number': {
        existingValue: '1234567890',
        placeholder: 'New Mobile Number',
      },
      'Email ID': {
        existingValue: 'example@example.com',
        placeholder: 'New Email ID',
      },
      Photo: {existingValue: 'Current Photo', placeholder: 'Upload New Photo'},
      'Name as per Marksheet': {
        existingValue: 'Name as per Marksheet',
        placeholder: 'New Name as per Marksheet',
      },
    };

    const setting = settings[item] || {existingValue: '', placeholder: ''};
    setExistingValue(setting.existingValue);
    setInputPlaceholder(setting.placeholder);
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const renderDropdownMenu = () => (
    <View style={styles.dropdownMenu}>
      <Text style={styles.Request}>Request to Change</Text>
      {REQUEST_OPTIONS.map(item => (
        <TouchableOpacity key={item} onPress={() => handleDropdownSelect(item)}>
          <Text style={styles.dropdownItem}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderFileSection = () => (
    <View style={styles.textRow}>
      <Text style={styles.attachtext}>
        {selectedRequest.includes('First Name') &&
          'Please Attach School Leaving Certificate *'}
        {selectedRequest.includes('Last Name') &&
          'Please Attach School Leaving Certificate *'}
        {selectedRequest.includes('Date Of Birth') &&
          'Please Attach LC/ Birth/ Passing Certificate of standard X or XII –mentioning Date of Birth *'}
        {selectedRequest.includes('Photo') && 'Upload New Photo'}
        {selectedRequest.includes('Name as per Marksheet') &&
          'Please Attach Standard X or XII or Last Qualifying Exam Certificate *'}
      </Text>
      <TouchableOpacity style={styles.ChooseButton} onPress={handleFileSelect}>
        <Text style={styles.ChooseButtonText}>Choose File</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        {selectedFile ? selectedFile : 'No File Selected'}
      </Text>
    </View>
  );

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
              <Text style={styles.fileSelectText}>
                {selectedFile ? selectedFile : selectedRequest}
              </Text>
              <Image
                source={require('../../../../assets/icons/arrowdown.png')}
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
          </View>
          {dropdownVisible && renderDropdownMenu()}
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
