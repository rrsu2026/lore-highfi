import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TimelineDisplay from "./TimelineDisplay";
import RecentDisplay from "./RecentDisplay";

const Tabs = createMaterialTopTabNavigator();

const TabbedCardList = () => {
  return (
    <View>
      <Tabs.Navigator>
        <Tabs.Screen name="TimelineDisplay" component={TimelineDisplay} />
        <Tabs.Screen name="RecentDisplay" component={RecentDisplay} />
      </Tabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default TabbedCardList;