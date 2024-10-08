/* eslint-disable no-catch-shadow */
import React, {useContext, useEffect, useState} from 'react';
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
import {AuthContext} from '../../ContextApi/AuthContext';
import BackButton from '../../CommanText/BackButton';

const Progress: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = createStyles(isDarkMode);
  const {authToken} = useContext(AuthContext);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Modal states
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null); // To track the item being edited
  const [newProgress, setNewProgress] = useState<any>({
    CompanyOrUniversity: '',
    PositionOrCourse: '',
    Location: '',
    CTC: '',
  });
  const [editedData, setEditedData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [authToken]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error before fetch
      const response = await fetch(
        'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionListGet',
        {
          method: 'POST',
          headers: {
            Referer: 'http://172.25.15.22/',
            Token: authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // Add required params here if necessary
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

  // Function to handle adding new progress
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
        // Refresh data after adding new progress
        fetchData();
        setAddModalVisible(false); // Close the modal
        setNewProgress({
          CompanyOrUniversity: '',
          PositionOrCourse: '',
          Location: '',
          CTC: '',
        }); // Reset the form
      } else {
        throw new Error('Failed to add the item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add the item');
    }
  };

  // Function to handle editing an item
  const handleEdit = (item: any) => {
    setCurrentItem(item); // Set the current item to be edited
    setEditedData({...item}); // Copy the item data to the edit form state
    setEditModalVisible(true); // Open the edit modal
  };

  // Function to save edited data
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

  // Function to delete an item
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
                  body: JSON.stringify({Id: id}), // Pass the item id to delete
                },
              );

              if (response.ok) {
                // Refresh data after deletion
                fetchData();
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
                <Text style={styles.locationText}>
                  Location: {item.City}, {item.State}, {item.Location}
                </Text>
                <Text style={styles.ctcText}>CTC: ₹{item.CTC}</Text>
                <Text style={styles.joiningDateText}>
                  Tentative Joining Date: {item.TentativeJoiningDate || 'N/A'}
                </Text>
                <Text style={styles.noteText}>Note: {item.Note || 'N/A'}</Text>
                <View style={styles.buttonContainer}>
                  <Button title="Edit" onPress={() => handleEdit(item)} />
                  <Button
                    title="Delete"
                    color="red"
                    onPress={() => deleteItem(item.Id)}
                  />
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
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Progression</Text>
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
              value={String(newProgress.CTC)}
              keyboardType="numeric"
              onChangeText={text =>
                setNewProgress({...newProgress, CTC: Number(text)})
              }
            />
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
        <View style={styles.modalContainer}>
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
              value={String(editedData?.CTC)}
              keyboardType="numeric"
              onChangeText={text =>
                setEditedData({...editedData, CTC: Number(text)})
              }
            />
            <Button title="Save" onPress={saveEditedData} />
            <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Add Progress Button */}
      <View style={styles.addButtonContainer}>
        <Button title="Add Progress" onPress={() => setAddModalVisible(true)} />
      </View>

      <Text style={styles.logotext}>
        The Maharaja Sayajirao University of Baroda
      </Text>
    </View>
  );
};

export default Progress;

// import React, {useContext, useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   useColorScheme,
//   Button,
//   Alert,
//   Modal,
// } from 'react-native';
// import createStyles from './styles';
// import {AuthContext} from '../../ContextApi/AuthContext';
// import BackButton from '../../CommanText/BackButton';
// import ProgressForm from './ProgressForm'; // Importing ProgressForm component

// const Progress: React.FC = () => {
//   const isDarkMode = useColorScheme() === 'dark';
//   const styles = createStyles(isDarkMode);
//   const {authToken} = useContext(AuthContext);
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   // Modal states
//   const [isAddModalVisible, setAddModalVisible] = useState(false);
//   const [isEditModalVisible, setEditModalVisible] = useState(false);
//   const [currentItem, setCurrentItem] = useState<any>(null); // To track the item being edited
//   const [newProgress, setNewProgress] = useState<any>({
//     CompanyOrUniversity: '',
//     PositionOrCourse: '',
//     Location: '',
//     CTC: '',
//   });
//   const [editedData, setEditedData] = useState<any>(null);

//   useEffect(() => {
//     fetchData();
//   }, [authToken]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null); // Reset error before fetch
//       const response = await fetch(
//         'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionListGet',
//         {
//           method: 'POST',
//           headers: {
//             Referer: 'http://172.25.15.22/',
//             Token: authToken,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({}), // Add required params here if necessary
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

 
// const handleAddProgress = async (newProgress: any) => {
//   try {
//     const response = await fetch(
//       'http://14.139.121.110:4760/Vidhyarthi_API/api/StudentProgression/StudentProgressionAdd',
//       {
//         method: 'POST',
//         headers: {
//           Referer: 'http://172.25.15.22/',
//           Token: authToken,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newProgress), // Send the new progress data
//       },
//     );

//     if (response.ok) {
//       fetchData(); // Refresh data after adding new progress
//       setAddModalVisible(false); // Close the modal
//     } else {
//       throw new Error('Failed to add the item');
//     }
//   } catch (error) {
//     console.error('Error adding item:', error);
//     setError('Failed to add the item');
//   }
// };

//   // Function to handle editing an item
//   const handleEdit = (item: any) => {
//     setCurrentItem(item); // Set the current item to be edited
//     setEditedData({...item}); // Copy the item data to the edit form state
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
//                   body: JSON.stringify({Id: id}), // Pass the item id to delete
//                 },
//               );

//               if (response.ok) {
//                 // Refresh data after deletion
//                 fetchData();
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
//                 <Text style={styles.companyText}>
//                   Company/University: {item.CompanyOrUniversity}
//                 </Text>
//                 <Text style={styles.positionText}>
//                   Position/Course: {item.PositionOrCourse}
//                 </Text>
//                 <Text style={styles.locationText}>
//                   Location: {item.City}, {item.State}, {item.Location}
//                 </Text>
//                 <Text style={styles.ctcText}>CTC: ₹{item.CTC}</Text>
//                 <Text style={styles.joiningDateText}>
//                   Tentative Joining Date: {item.TentativeJoiningDate || 'N/A'}
//                 </Text>
//                 <Text style={styles.noteText}>Note: {item.Note || 'N/A'}</Text>
//                 <View style={styles.buttonContainer}>
//                   <Button title="Edit" onPress={() => handleEdit(item)} />
//                   <Button
//                     title="Delete"
//                     color="red"
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
//         onRequestClose={() => setAddModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalView}>
//             <ProgressForm
//               onSubmit={handleAddProgress}
//               onClose={() => setAddModalVisible(false)}
//               isVisible={isAddModalVisible} // Pass the modal visibility state
//             />
//           </View>
//         </View>
//       </Modal>
//       {/* Add Progress Button */}
//       <View style={styles.addButtonContainer}>
//         <Button title="Add Progress" onPress={() => setAddModalVisible(true)} />
//       </View>
//       <Text style={styles.logotext}>
//         The Maharaja Sayajirao University of Baroda
//       </Text>
//     </View>
//   );
// };

// export default Progress;