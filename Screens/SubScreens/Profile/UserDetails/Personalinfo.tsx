// import {
//   View,
//   Text,
//   ActivityIndicator,
//   Image,
//   StyleSheet,
//   useColorScheme,
// } from 'react-native';
// import React, {useContext, useEffect, useState} from 'react';
// import {AuthContext} from '../../../ContextApi/AuthContext';
// import styles from './styles';
// import CountryDropdown from '../../Dropdowns/CountryDropdown';
// import MaritalStatus from '../../Dropdowns/MaritalStatus';
// import Religion from '../../Dropdowns/Religion';
// import GenOccupation from '../../Dropdowns/GenOccupation';
// import StateDropdown from '../../Dropdowns/StateDropdown';
// const PersonalInfo = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const {authToken, userDetails} = useContext(AuthContext);
//   const isDarkMode = useColorScheme() === 'dark';
//   const currentStyles = styles(isDarkMode);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/StudentProfileGet',
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

//         const result = await response.json();
//         setData(result.obj[0]); // Access the first object directly
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [authToken]);

//   if (loading) {
//     return (
//       <View style={currentStyles.containerloading}>
//         <ActivityIndicator
//           size="large"
//           color={isDarkMode ? '#fff' : '#5287D7'}
//           style={currentStyles.spinner}
//         />
//         <Text style={currentStyles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return <Text style={currentStyles.errorText}>Error: {error}</Text>;
//   }

//   return (
//     <View style={currentStyles.container}>
//       <Text style={currentStyles.Header}>Personal Details</Text>
//       <View style={currentStyles.divider} />
//       {data ? (
//         <>
//           <View style={currentStyles.infoContainer}>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Name: </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.FirstName} {data.LastName}
//               </Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Gender: </Text>
//               <Text style={currentStyles.firstName}>{data.Gender}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Mother Name: </Text>
//               <Text style={currentStyles.firstName}>{data.MotherName}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Father Name: </Text>
//               <Text style={currentStyles.firstName}>{data.NameOfFather}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Email: </Text>
//               <Text style={currentStyles.firstName}>{data.EmailId}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Mobile No: </Text>
//               <Text style={currentStyles.firstName}>{data.MobileNo}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>PRN: </Text>
//               <Text style={currentStyles.firstName}>{data.PRN}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>DOB: </Text>
//               <Text style={currentStyles.firstName}>{data.DOB}</Text>
//             </View>

//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Marital Status: </Text>
//               <Text style={currentStyles.firstName}>{data.MaritalStatus}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Religion: </Text>
//               <Text style={currentStyles.firstName}>{data.ReligionName}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Mother Tongue: </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.MotherTongueName}
//               </Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>
//                 Do you belong to Vadodara(District) ?:{' '}
//               </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.IsLocalToVadodara}
//               </Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>
//                 Have your Communication Address (Present Address) same as
//                 Permanent Residential Address ?:{' '}
//               </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.IsCurrentAsPermanent}
//               </Text>
//             </View>

//             {/*  */}
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Permanent Address: </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.PermanentAddress}
//               </Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Permanent Country: </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.PermanentCountry}
//               </Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Permanent State: </Text>
//               <Text style={currentStyles.firstName}>{data.PermanentState}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Permanent District: </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.PermanentDistrict}
//               </Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>
//                 Permanent City/ Village:{' '}
//               </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.PermanentCityVillage}
//               </Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Permanent Pincode: </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.PermanentPincode}
//               </Text>
//             </View>
//             {/*  */}
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Current Address: </Text>
//               <Text style={currentStyles.firstName}>{data.CurrentAddress}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Current Country: </Text>
//               <Text style={currentStyles.firstName}>{data.CurrentCountry}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Current State: </Text>
//               <Text style={currentStyles.firstName}>{data.CurrentState}</Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Current District: </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.CurrentDistrict}
//               </Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>
//                 Current City/Village:{' '}
//               </Text>
//               <Text style={currentStyles.firstName}>
//                 {data.CurrentCityVillage}
//               </Text>
//             </View>
//             <View style={currentStyles.nameContainer}>
//               <Text style={currentStyles.nameLabel}>Current Pincode: </Text>
//               <Text style={currentStyles.firstName}>{data.CurrentPincode}</Text>
//             </View>
//             {/* drop down */}
//             {/* <CountryDropdown/> */}
//             {/* <MaritalStatus/> */}
//             {/* <Religion/> */}
//             {/* <StateDropdown/> */}
//           </View>
//         </>
//       ) : (
//         <Text>No data available</Text>
//       )}
//     </View>
//   );
// };

// export default PersonalInfo;

import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../ContextApi/AuthContext';
import styles from './styles';
// Assume you have the dropdowns imported
import CountryDropdown from '../../Dropdowns/CountryDropdown';
import MaritalStatus from '../../Dropdowns/MaritalStatus';
import StateDropdown from '../../Dropdowns/StateDropdown';

const PersonalInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const {authToken, userDetails} = useContext(AuthContext);
  const isDarkMode = useColorScheme() === 'dark';
  const currentStyles = styles(isDarkMode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/StudentProfileGet',
          {
            method: 'GET',
            headers: {
              Referer:
                'http://172.25.15.22/',
              Token: authToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.obj[0]);
        setFormData(result.obj[0]); // Initialize formData with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken]);

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    // Call your API to save the updated data
    try {
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/PersonalDetailsEdit', // Update with the correct API endpoint
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Referer: 'http://172.25.15.22/',
            Token: authToken,
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      setIsEditing(false); // Exit edit mode after saving
      // Optionally, refetch data or update local state
      setData(formData);
    } catch (err) {
      setError(err.message);
    }
  };

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
    return <Text style={currentStyles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.headerContainer}>
        <Text style={currentStyles.Header}>Personal Details</Text>

        <TouchableOpacity
          style={currentStyles.button} // Use the button style
          onPress={isEditing ? handleSave : () => setIsEditing(true)}>
          <Image
            source={require('../../../../assets/icons/edit.png')}
            style={currentStyles.Edit}
          />
          <Text style={currentStyles.buttonText}>
            {isEditing ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={currentStyles.divider} />

      {data ? (
        <>
          <View style={currentStyles.infoContainer}>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Name: </Text>
              <Text style={currentStyles.firstName}>
                {data.FirstName} {data.LastName}
              </Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Father Name: </Text>
              {isEditing ? (
                <TextInput
                  style={currentStyles.input}
                  value={formData.NameOfFather}
                  onChangeText={value =>
                    handleInputChange('NameOfFather', value)
                  }
                />
              ) : (
                <Text style={currentStyles.firstName}>{data.NameOfFather}</Text>
              )}
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Mother Name: </Text>
              <Text style={currentStyles.firstName}>{data.MotherName}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Email: </Text>
              <Text style={currentStyles.firstName}>{data.EmailId}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Mobile No: </Text>
              <Text style={currentStyles.firstName}>{data.MobileNo}</Text>
            </View>
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>DOB: </Text>
              <Text style={currentStyles.firstName}>{data.DOB}</Text>
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Marital Status: </Text>
              {isEditing ? (
                <MaritalStatus
                  selectedValue={formData.MaritalStatus}
                  onValueChange={value =>
                    handleInputChange('MaritalStatus', value)
                  }
                />
              ) : (
                <Text style={currentStyles.firstName}>
                  {data.MaritalStatus}
                </Text>
              )}
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Permanent Address: </Text>
              {isEditing ? (
                <TextInput
                  style={currentStyles.input}
                  value={formData.PermanentAddress}
                  onChangeText={value =>
                    handleInputChange('PermanentAddress', value)
                  }
                />
              ) : (
                <Text style={currentStyles.firstName}>
                  {data.PermanentAddress}
                </Text>
              )}
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Permanent Country: </Text>
              {isEditing ? (
                <CountryDropdown
                  selectedValue={formData.PermanentCountry}
                  onValueChange={value =>
                    handleInputChange('PermanentCountry', value)
                  }
                />
              ) : (
                <Text style={currentStyles.firstName}>
                  {data.PermanentCountry}
                </Text>
              )}
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Permanent Pincode: </Text>
              {isEditing ? (
                <TextInput
                  style={currentStyles.input}
                  value={formData.PermanentPincode}
                  onChangeText={value =>
                    handleInputChange('PermanentPincode', value)
                  }
                />
              ) : (
                <Text style={currentStyles.firstName}>
                  {data.PermanentPincode}
                </Text>
              )}
            </View>

            {/* Current Address and details */}
            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Current Address: </Text>
              {isEditing ? (
                <TextInput
                  style={currentStyles.input}
                  value={formData.CurrentAddress}
                  onChangeText={value =>
                    handleInputChange('CurrentAddress', value)
                  }
                />
              ) : (
                <Text style={currentStyles.firstName}>
                  {data.CurrentAddress}
                </Text>
              )}
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Current District: </Text>
              {isEditing ? (
                <CountryDropdown
                  selectedValue={formData.PermanentDistrict}
                  onValueChange={value =>
                    handleInputChange('CurrentCountry', value)
                  }
                />
              ) : (
                <Text style={currentStyles.firstName}>
                  {data.PermanentDistrict}
                </Text>
              )}
            </View>

            <View style={currentStyles.nameContainer}>
              <Text style={currentStyles.nameLabel}>Current Pincode: </Text>
              {isEditing ? (
                <TextInput
                  style={currentStyles.input}
                  value={formData.CurrentPincode}
                  onChangeText={value =>
                    handleInputChange('CurrentPincode', value)
                  }
                />
              ) : (
                <Text style={currentStyles.firstName}>
                  {data.CurrentPincode}
                </Text>
              )}
            </View>
          </View>
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

export default PersonalInfo;
