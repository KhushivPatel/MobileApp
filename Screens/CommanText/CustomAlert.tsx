// CustomAlert.tsx
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

interface CustomAlertProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  message,
  onClose,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.alertBox}>
          <View style={styles.alert}>
            <Image
              source={require('../../assets/images/alert.png')}
              style={styles.alertimg}
            />
            <Text style={styles.message}>{message}</Text>
          </View>
          {/* <Text style={styles.message}>Please try again later</Text> */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertimg: {
    height: 47,
    width: 47,
    resizeMode: 'contain',
    marginBottom:19,
    marginTop:20,
  },
  alert: {
    alignItems: 'center',
  },
  alertBox: {
    width: 300,
    padding: 20,
    // alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 28,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFD3D3',
    padding: 10,
    borderRadius: 40,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CustomAlert;
