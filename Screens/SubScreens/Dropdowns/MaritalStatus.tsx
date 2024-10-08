// import React, {useState, useEffect, useContext} from 'react';
// import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
// import {Picker} from '@react-native-picker/picker'; // Ensure you install this library
// import {AuthContext} from '../../ContextApi/AuthContext';

// const MaritalStatus = () => {
//   const [countries, setCountries] = useState([]);
//   const [MaritalStatus, setMaritalStatus] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const {authToken} = useContext(AuthContext);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch(
//           'https://admission.msubaroda.ac.in/Vidhyarthi_API/api/StudentProfile/MaritalStatusGet',
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
//         setCountries(result.obj);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCountries();
//   }, [authToken]);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading countries...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return <Text style={styles.errorText}>Error: {error}</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Picker
//         selectedValue={MaritalStatus}
//         onValueChange={itemValue => setMaritalStatus(itemValue)}
//         style={styles.picker}>
//         <Picker.Item label="Select a Marital Status" value="" />
//         {countries.map(marrage => (
//           <Picker.Item
//             key={marrage.Id}
//             label={marrage.MaritalStatus}
//             value={marrage.MaritalStatus}
//           />
//         ))}
//       </Picker>
//     </View>
//   );
// };

// export default MaritalStatus;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   label: {
//     justifyContent: 'center',
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   picker: {
//     justifyContent: 'center',
//     alignItems:'center',
//     backgroundColor: '#fff',
//     height: 10,
//     width: '100%',
//   },
//   selectedText: {
//     marginTop: 16,
//     fontSize: 16,
//   },
//   errorText: {
//     color: 'red',
//   },
// });


import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Ensure you install this library
import {AuthContext} from '../../ContextApi/AuthContext';

const MaritalStatus = () => {
  const [maritalStatusOptions, setMaritalStatusOptions] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {authToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchMaritalStatus = async () => {
      try {
        const response = await fetch(
          'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProfile/MaritalStatusGet',
          {
            method: 'GET',
            headers: {
              Referer:
                // 'https://admission.msubaroda.ac.in/vidhyarthi/index.html',
                'http://172.25.15.22/',
              Token: authToken,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setMaritalStatusOptions(result.obj);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMaritalStatus();
  }, [authToken]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5287D7" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={maritalStatus}
          onValueChange={itemValue => setMaritalStatus(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Select a Marital Status" value="" />
          {maritalStatusOptions.map(status => (
            <Picker.Item
              key={status.Id}
              label={status.MaritalStatus}
              value={status.MaritalStatus}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default MaritalStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 16,
    backgroundColor: '#f7f7f7',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#B9D5FF',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 10,
  },
});
