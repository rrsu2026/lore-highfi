import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// color import
import Colors from '../Theme.js';

const NavBar = ({ currentScreen }) => {
  const navigation = useNavigation();

  // determine if the current screen highlights the search icon
  const isSearchHighlighted = ['SearchPage', 'SearchResults'].includes(currentScreen);

  // map icons to their respective screens
  const icons = [
    { screen: 'SearchPage', icon: 'search', outline: 'search-outline', label: 'Search', isHighlighted: isSearchHighlighted },
    { screen: 'HomePage', icon: 'home', outline: 'home-outline', label: 'Home', isHighlighted: currentScreen === 'HomePage' },
    { screen: 'MyProfile', icon: 'person', outline: 'person-outline', label: 'My Profile', isHighlighted: currentScreen === 'MyProfile' },
  ];

  return (
    <View style={styles.navbar}>
      {icons.map(({ screen, icon, outline, label, isHighlighted }) => (
        <TouchableOpacity
          key={screen}
          style={[
            styles.navSection,
            isHighlighted && styles.highlightedSection, // apply shading to 1/3 of the navbar
          ]}
          onPress={() => navigation.navigate(screen)} // handle press for the entire section
        >
          <View style={[styles.highlightLine, isHighlighted && { backgroundColor: Colors.colors.complementColor3 }]} />
          <Ionicons
            name={isHighlighted ? icon : outline}
            size={30}
            color={isHighlighted ? Colors.colors.chineseBlack : Colors.colors.graniteGray }
          />
          <Text style={[styles.label, { color: isHighlighted ? Colors.colors.chineseBlack: Colors.colors.graniteGray }]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.colors.primaryColorSelect, 
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
  },
  navSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  highlightedSection: {
    backgroundColor: Colors.colors.primaryColorBg, 
    height: '100%',
  },
  highlightLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3, // highlight line thickness
    width: '100%',
    backgroundColor: Colors.colors.primaryColor2, 
  },
  button: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default NavBar;
