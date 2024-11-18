import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StoriesDisplayTimeline from "./StoriesDisplayTimeline";
import StoriesDisplayRecent from "./StoriesDisplayRecent";

const Tabs = createMaterialTopTabNavigator();

const TabbedCardList = ({stories}) => {
  return (
    <View>
      <Tabs.Navigator>
        <Tabs.Screen name="StoriesDisplayTimeline" component={() => <StoriesDisplayTimeline stories={stories} />} />
        <Tabs.Screen name="StoriesDisplayRecent" component={() => <StoriesDisplayRecent stories={stories} />} />
      </Tabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default TabbedCardList;