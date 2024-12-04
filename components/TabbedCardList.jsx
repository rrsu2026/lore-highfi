import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StoriesDisplayTimeline from "./StoriesDisplayTimeline";
import StoriesDisplayRecent from "./StoriesDisplayRecent";
import theme from "../Theme.js";

const Tabs = createMaterialTopTabNavigator();

const TabbedCardList = ({ navigation, stories }) => {
  return (
    <View style={{ minHeight: 1000 }}>
      <Tabs.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.com,
            borderBottomWidth: 2.5,
          },

          tabBarIndicatorStyle: {
            backgroundColor: theme.colors.grayBg,
            height: "100%",
            borderTopWidth: 2.5,
            borderLeftWidth: 2.5,
            borderRightWidth: 2.5,
          },
          tabBarLabelStyle: { fontSize: 18, fontWeight: "600" },
        }}
      >
        <Tabs.Screen name="Timeline">
          {() => (
            <StoriesDisplayTimeline navigation={navigation} stories={stories} />
          )}
        </Tabs.Screen>
        <Tabs.Screen name="Recent">
          {() => (
            <StoriesDisplayRecent navigation={navigation} stories={stories} />
          )}
        </Tabs.Screen>
      </Tabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TabbedCardList;
