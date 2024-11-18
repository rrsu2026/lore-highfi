import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StoriesDisplayTimeline from "./StoriesDisplayTimeline";
import StoriesDisplayRecent from "./StoriesDisplayRecent";

const Tabs = createMaterialTopTabNavigator();

const TabbedCardList = ({ navigation, stories }) => {
  return (
    <View>
      <Tabs.Navigator>
        <Tabs.Screen name="StoriesDisplayTimeline">{() => <StoriesDisplayTimeline navigation={navigation} stories={stories} />}</Tabs.Screen>
        <Tabs.Screen name="StoriesDisplayRecent">{() => <StoriesDisplayRecent navigation={navigation} stories={stories} />}</Tabs.Screen>
      </Tabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default TabbedCardList;