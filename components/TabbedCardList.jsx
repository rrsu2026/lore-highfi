import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StoriesDisplayTimeline from "./StoriesDisplayTimeline";
import StoriesDisplayRecent from "./StoriesDisplayRecent";

const Tabs = createMaterialTopTabNavigator();

const TabbedCardList = () => {
  return (
    <View>
      <Tabs.Navigator>
        <Tabs.Screen name="StoriesDisplayTimeline" component={StoriesDisplayTimeline} />
        <Tabs.Screen name="StoriesDisplayRecent" component={StoriesDisplayRecent} />
      </Tabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default TabbedCardList;