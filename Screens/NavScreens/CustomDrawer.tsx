import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = props => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.headerText}>Welcome!</Text>
        <Text style={styles.subHeaderText}>Your App Name</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: '#5287D7',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CustomDrawer;
