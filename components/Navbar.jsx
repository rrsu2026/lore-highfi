import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation(); // Use the navigation hook
  const [selected, setSelected] = useState('home'); 

  // Function to handle button press and change the selected state
  const handlePress = (screen, icon) => {
    navigation.navigate(screen); 
    setSelected(icon);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress("HomePage", 'home')}
      >
        <Ionicons
          name={selected === 'home' ? 'home' : 'home-outline'}
          size={30}
          color={selected === 'home' ? 'tomato' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress("SearchPage", 'search')}
      >
        <Ionicons
          name={selected === 'search' ? 'search' : 'search-outline'}
          size={30}
          color={selected === 'search' ? 'tomato' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress("MyProfile", 'myProfile')}
      >
        <Ionicons
          name={selected === 'myProfile' ? 'person' : 'person-outline'}
          size={30}
          color={selected === 'myProfile' ? 'tomato' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    alignItems: 'center',
  },
});

export default NavBar;
