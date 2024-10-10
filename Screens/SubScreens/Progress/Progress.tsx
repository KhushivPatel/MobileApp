// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   useColorScheme,
//   Button,
//   Alert,
//   Modal,
//   TextInput,
// } from 'react-native';
// import createStyles from './styles'; // Assuming styles are defined in this file
// import { AuthContext } from '../../ContextApi/AuthContext';
// import BackButton from '../../CommanText/BackButton';
// import { useNavigation } from '@react-navigation/native';

// const Progress: React.FC = () => {
//   const isDarkMode = useColorScheme() === 'dark';
//   const styles = createStyles(isDarkMode);
//   const { authToken } = useContext(AuthContext);
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   // Modal states
//   const [isAddModalVisible, setAddModalVisible] = useState(false);
//   const [isEditModalVisible, setEditModalVisible] = useState(false);
//   const [currentItem, setCurrentItem] = useState<any>(null);
//   const [newProgress, setNewProgress] = useState<any>({
//     CompanyOrUniversity: '',
//     PositionOrCourse: '',
//     Location: '',
//     CTC: '',
//     EmploymentStatus: '', // New field for Employment Status
//   });
//   const [editedData, setEditedData] = useState<any>(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchData();
//   }, [authToken]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(
//         'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionListGet',
//         {
//           method: 'POST',
//           headers: {
//             Referer: 'http://172.25.15.22/',
//             Token: authToken,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({}),
//         },
//       );

//       const result = await response.json();

//       if (response.ok) {
//         if (result.response_code === '200' && result.obj.length > 0) {
//           setData(result.obj);
//         } else {
//           setData([]);
//         }
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError('Failed to fetch data, please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle adding new progress
//   const handleAddProgress = async () => {
//     try {
//       const response = await fetch(
//         'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionAdd',
//         {
//           method: 'POST',
//           headers: {
//             Referer: 'http://172.25.15.22/',
//             Token: authToken,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newProgress),
//         },
//       );

//       if (response.ok) {
//         fetchData(); // Refresh data after adding new progress
//         setAddModalVisible(false); // Close the modal
//         setNewProgress({
//           CompanyOrUniversity: '',
//           PositionOrCourse: '',
//           Location: '',
//           CTC: '',
//           EmploymentStatus: '', // Reset Employment Status
//         }); // Reset the form
//       } else {
//         throw new Error('Failed to add the item');
//       }
//     } catch (error) {
//       console.error('Error adding item:', error);
//       setError('Failed to add the item');
//     }
//   };

//   // Function to handle editing an item
//   const handleEdit = (item: any) => {
//     setCurrentItem(item); // Set the current item to be edited
//     setEditedData({ ...item }); // Copy the item data to the edit form state
//     setEditModalVisible(true); // Open the edit modal
//   };

//   // Function to save edited data
//   const saveEditedData = async () => {
//     try {
//       const response = await fetch(
//         'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionEdit',
//         {
//           method: 'POST',
//           headers: {
//             Referer: 'http://172.25.15.22/',
//             Token: authToken,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(editedData), // Send the edited data
//         },
//       );

//       if (response.ok) {
//         fetchData(); // Refresh data after update
//         setEditModalVisible(false); // Close the edit modal
//         setCurrentItem(null); // Reset the current item
//         setEditedData(null); // Reset the edit data
//       } else {
//         throw new Error('Failed to update the item');
//       }
//     } catch (error) {
//       console.error('Error updating item:', error);
//       setError('Failed to update the item');
//     }
//   };

//   // Function to delete an item
//   const deleteItem = async (id: number) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this item?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: async () => {
//             try {
//               const response = await fetch(
//                 'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionDelete',
//                 {
//                   method: 'POST',
//                   headers: {
//                     Referer: 'http://172.25.15.22/',
//                     Token: authToken,
//                     'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify({ Id: id }), // Pass the item id to delete
//                 },
//               );

//               if (response.ok) {
//                 fetchData(); // Refresh data after deletion
//               } else {
//                 throw new Error('Failed to delete the item');
//               }
//             } catch (error) {
//               console.error('Error deleting item:', error);
//               setError('Failed to delete the item');
//             }
//           },
//         },
//       ],
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <BackButton />
//         <Text style={styles.headerText}>Student Progression</Text>
//       </View>

//       {loading ? (
//         <View style={styles.containerloading}>
//           <ActivityIndicator
//             size="large"
//             color={isDarkMode ? '#fff' : '#5287D7'}
//             style={styles.spinner}
//           />
//           <Text style={styles.loadingText}>Loading...</Text>
//         </View>
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : data.length === 0 ? (
//         <Text style={styles.noDataText}>No Progression Found</Text>
//       ) : (
//         <ScrollView style={styles.scrollView}>
//           <View style={styles.mainContent}>
//             {data.map(item => (
//               <View key={item.Id} style={styles.progressCard}>
//                 {item.ProgressionType === 1 ? (
//                   <>
//                     <Text style={styles.companyText}>
//                       Company: {item.CompanyOrUniversity}
//                     </Text>
//                     <Text style={styles.positionText}>
//                       Position: {item.PositionOrCourse}
//                     </Text>
//                     <Text style={styles.locationText}>
//                       Location: {item.City}, {item.State}, {item.Location}
//                     </Text>
//                     <Text style={styles.ctcText}>Annual Income: ₹{item.CTC}</Text>
//                     <Text style={styles.joiningDateText}>
//                       Joining Date: {item.TentativeJoiningDate || 'N/A'}
//                     </Text>
//                   </>
//                 ) : item.ProgressionType === 2 ? (
//                   <>
//                     <Text style={styles.universityText}>
//                       University: {item.CompanyOrUniversity}
//                     </Text>
//                     <Text style={styles.courseText}>
//                       Course: {item.PositionOrCourse}
//                     </Text>
//                     <Text style={styles.joiningDateText}>
//                       Joining Date: {item.TentativeJoiningDate || 'N/A'}
//                     </Text>
//                   </>
//                 ) : item.ProgressionType === 3 ? (
//                   <>
//                     <Text style={styles.universityText}>
//                       University: {item.CompanyOrUniversity}
//                     </Text>
//                     <Text style={styles.courseText}>
//                       Course: {item.PositionOrCourse}
//                     </Text>
//                     <Text style={styles.joiningDateText}>
//                       Joining Date: {item.TentativeJoiningDate || 'N/A'}
//                     </Text>
//                   </>
//                 ) : null}

//                 {/* Display Employment Status */}
//                 <Text style={styles.employmentStatusText}>
//                   Employment Status: {item.EmploymentStatus || 'N/A'}
//                 </Text>

//                 <View style={styles.buttonContainer}>
//                   <Button
//                     title="Edit"
//                     onPress={() => handleEdit(item)}
//                   />
//                   <Button
//                     title="Delete"
//                     onPress={() => deleteItem(item.Id)}
//                   />
//                 </View>
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       )}

//       {/* Add Progress Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isAddModalVisible}
//         onRequestClose={() => setAddModalVisible(false)}
//       >
//         <View style={styles.modalView}>
//           <Text style={styles.modalText}>Add New Progression</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Company/University"
//             value={newProgress.CompanyOrUniversity}
//             onChangeText={text =>
//               setNewProgress({ ...newProgress, CompanyOrUniversity: text })
//             }
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Position/Course"
//             value={newProgress.PositionOrCourse}
//             onChangeText={text =>
//               setNewProgress({ ...newProgress, PositionOrCourse: text })
//             }
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Location"
//             value={newProgress.Location}
//             onChangeText={text =>
//               setNewProgress({ ...newProgress, Location: text })
//             }
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="CTC"
//             keyboardType="numeric"
//             value={newProgress.CTC}
//             onChangeText={text =>
//               setNewProgress({ ...newProgress, CTC: text })
//             }
//           />
//           {/* Dropdown or Input for Employment Status */}
//           <TextInput
//             style={styles.input}
//             placeholder="Employment Status"
//             value={newProgress.EmploymentStatus}
//             onChangeText={text =>
//               setNewProgress({ ...newProgress, EmploymentStatus: text })
//             }
//           />
//           <View style={styles.buttonContainer}>
//             <Button title="Add" onPress={handleAddProgress} />
//             <Button title="Cancel" onPress={() => setAddModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Progress Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isEditModalVisible}
//         onRequestClose={() => setEditModalVisible(false)}
//       >
//         <View style={styles.modalView}>
//           <Text style={styles.modalText}>Edit Progression</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Company/University"
//             value={editedData?.CompanyOrUniversity}
//             onChangeText={text =>
//               setEditedData({ ...editedData, CompanyOrUniversity: text })
//             }
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Position/Course"
//             value={editedData?.PositionOrCourse}
//             onChangeText={text =>
//               setEditedData({ ...editedData, PositionOrCourse: text })
//             }
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Location"
//             value={editedData?.Location}
//             onChangeText={text =>
//               setEditedData({ ...editedData, Location: text })
//             }
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="CTC"
//             keyboardType="numeric"
//             value={editedData?.CTC}
//             onChangeText={text =>
//               setEditedData({ ...editedData, CTC: text })
//             }
//           />
//           {/* Dropdown or Input for Employment Status */}
//           <TextInput
//             style={styles.input}
//             placeholder="Employment Status"
//             value={editedData?.EmploymentStatus}
//             onChangeText={text =>
//               setEditedData({ ...editedData, EmploymentStatus: text })
//             }
//           />
//           <View style={styles.buttonContainer}>
//             <Button title="Save" onPress={saveEditedData} />
//             <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>

//       {/* Add Progress Button */}
//       <Button title="Add Career Progression" onPress={() => setAddModalVisible(true)} />
//       <Text style={styles.logotext}>
//         The Maharaja Sayajirao University of Baroda
//       </Text>
//     </View>
//   );
// };

// export default Progress;


/* eslint-disable no-catch-shadow */
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
  Button,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import createStyles from './styles'; // Assuming styles are defined in this file
import { AuthContext } from '../../ContextApi/AuthContext';
import BackButton from '../../CommanText/BackButton';
import { useNavigation } from '@react-navigation/native';

const Progress: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);
  const { authToken } = useContext(AuthContext);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [newProgress, setNewProgress] = useState<any>({
    CompanyOrUniversity: '',
    PositionOrCourse: '',
    Location: '',
    CTC: '',
    EmploymentStatus: '',
  });
  const [editedData, setEditedData] = useState<any>(null);
  const navigation = useNavigation();
  const handleAddButtonClick = () => {
    navigation.navigate('ProgressForm'); // Navigate to ProgressForm when button is clicked
  };

  useEffect(() => {
    fetchData();
  }, [authToken]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionListGet',
        {
          method: 'POST',
          headers: {
            Referer: 'http://172.25.15.22/',
            Token: authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        },
      );

      const result = await response.json();

      if (response.ok) {
        if (result.response_code === '200' && result.obj.length > 0) {
          setData(result.obj);
        } else {
          setData([]);
        }
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProgress = async () => {
    try {
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionAdd',
        {
          method: 'POST',
          headers: {
            Referer: 'http://172.25.15.22/',
            Token: authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProgress),
        },
      );

      if (response.ok) {
        fetchData(); // Refresh data after adding new progress
        setAddModalVisible(false); // Close the modal
        setNewProgress({
          CompanyOrUniversity: '',
          PositionOrCourse: '',
          Location: '',
          CTC: '',
          EmploymentStatus: '', // Reset Employment Status
        }); // Reset the form
      } else {
        throw new Error('Failed to add the item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add the item');
    }
  };

  const handleEdit = (item: any) => {
    setCurrentItem(item); // Set the current item to be edited
    setEditedData({ ...item }); // Copy the item data to the edit form state
    setEditModalVisible(true); // Open the edit modal
  };

  const saveEditedData = async () => {
    try {
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionEdit',
        {
          method: 'POST',
          headers: {
            Referer: 'http://172.25.15.22/',
            Token: authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedData), // Send the edited data
        },
      );

      if (response.ok) {
        fetchData(); // Refresh data after update
        setEditModalVisible(false); // Close the edit modal
        setCurrentItem(null); // Reset the current item
        setEditedData(null); // Reset the edit data
      } else {
        throw new Error('Failed to update the item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update the item');
    }
  };

  const deleteItem = async (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const response = await fetch(
                'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionDelete',
                {
                  method: 'POST',
                  headers: {
                    Referer: 'http://172.25.15.22/',
                    Token: authToken,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ Id: id }), // Pass the item id to delete
                },
              );

              if (response.ok) {
                fetchData(); // Refresh data after deletion
              } else {
                throw new Error('Failed to delete the item');
              }
            } catch (error) {
              console.error('Error deleting item:', error);
              setError('Failed to delete the item');
            }
          },
        },
      ],
    );
  };

  const getEmploymentStatus = (type: number, status: number) => {
    if (type === 1) {
      switch (status) {
        case 1:
          return 'Internship';
        case 2:
          return 'Employee - On Campus';
        case 3:
          return 'Employed - Off Campus';
        case 4:
          return 'Business / Startup';
        default:
          return 'Freelancing';
      }
    } else if (type === 2) {
      return 'Further Studies';
    } else if (type === 3) {
      return 'Unemployed / No Further Studies';
    }
    return 'Unknown';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerText}>Student Progression</Text>
      </View>

      {loading ? (
        <View style={styles.containerloading}>
          <ActivityIndicator
            size="large"
            color={isDarkMode ? '#fff' : '#5287D7'}
            style={styles.spinner}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : data.length === 0 ? (
        <Text style={styles.noDataText}>No Progression Found</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainContent}>
            {data.map(item => (
              <View key={item.Id} style={styles.progressCard}>
                <Text style={styles.companyText}>
                  Company/University: {item.CompanyOrUniversity}
                </Text>
                <Text style={styles.positionText}>
                  Position/Course: {item.PositionOrCourse}
                </Text>
                <Text style={styles.joiningDateText}>
                  Joining Date: {item.TentativeJoiningDate || 'N/A'}
                </Text>
                <Text style={styles.employmentStatusText}>
                  Employment Status:{' '}
                  {getEmploymentStatus(
                    item.ProgressionType,
                    item.ProgressionStatus,
                  )}
                </Text>

                <View style={styles.buttonContainer}>
                  <Button title="Edit" onPress={() => handleEdit(item)} />
                  <Button title="Delete" onPress={() => deleteItem(item.Id)} />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Add Progress Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => setAddModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New Progression</Text>
          <TextInput
            style={styles.input}
            placeholder="Company/University"
            value={newProgress.CompanyOrUniversity}
            onChangeText={text =>
              setNewProgress({...newProgress, CompanyOrUniversity: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Position/Course"
            value={newProgress.PositionOrCourse}
            onChangeText={text =>
              setNewProgress({...newProgress, PositionOrCourse: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={newProgress.Location}
            onChangeText={text =>
              setNewProgress({...newProgress, Location: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="CTC"
            keyboardType="numeric"
            value={newProgress.CTC}
            onChangeText={text => setNewProgress({...newProgress, CTC: text})}
          />
          {/* Dropdown or Input for Employment Status */}
          <TextInput
            style={styles.input}
            placeholder="Employment Status"
            value={newProgress.EmploymentStatus}
            onChangeText={text =>
              setNewProgress({...newProgress, EmploymentStatus: text})
            }
          />
          <View style={styles.buttonContainer}>
            <Button title="Add" onPress={handleAddProgress} />
            <Button title="Cancel" onPress={() => setAddModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Edit Progress Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Progression</Text>
          <TextInput
            style={styles.input}
            placeholder="Company/University"
            value={editedData?.CompanyOrUniversity}
            onChangeText={text =>
              setEditedData({...editedData, CompanyOrUniversity: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Position/Course"
            value={editedData?.PositionOrCourse}
            onChangeText={text =>
              setEditedData({...editedData, PositionOrCourse: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={editedData?.Location}
            onChangeText={text =>
              setEditedData({...editedData, Location: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="CTC"
            keyboardType="numeric"
            value={editedData?.CTC}
            onChangeText={text => setEditedData({...editedData, CTC: text})}
          />
          {/* Dropdown or Input for Employment Status */}
          <TextInput
            style={styles.input}
            placeholder="Employment Status"
            value={editedData?.EmploymentStatus}
            onChangeText={text =>
              setEditedData({...editedData, EmploymentStatus: text})
            }
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={saveEditedData} />
            <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Add Progress Button */}
      <Button title="Add Career Progression" onPress={handleAddButtonClick} />
      <Text style={styles.logotext}>
        The Maharaja Sayajirao University of Baroda
      </Text>
    </View>
  );
};

export default Progress;
