import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Image
        source={require('../../assets/icons/back.png')}
        style={styles.buttonImage}
        tintColor="#ffffff" // Tinting the image to white
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // padding: 2,
    borderRadius: 5,
  },
  buttonImage: {
    height: 25,
    width: 25,
    tintColor: '#ffffff', // Ensure the tint color is set to white
  },
});

export default BackButton;
