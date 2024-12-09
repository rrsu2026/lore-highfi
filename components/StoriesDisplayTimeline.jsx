import React, { useState, useRef } from "react";
import { Dimensions } from "react-native";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
} from "react-native";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import StoryCard from "./StoryCard";
import theme from "../Theme";

const { height, width } = Dimensions.get("window");
const isTablet = height / width < 1.6;

const StoriesDisplayTimeline = ({ navigation, stories }) => {
  const [zoomLevel, setZoomLevel] = useState(0); // 0: Decade, 1: Year, 2: Month-Year
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef();

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const currentScale = event.nativeEvent.scale;

      // Determine new zoom level
      let newZoomLevel = zoomLevel;
      if (currentScale > 1.5 && zoomLevel < 2) {
        newZoomLevel = zoomLevel + 1;
      } else if (currentScale < 0.75 && zoomLevel > 0) {
        newZoomLevel = zoomLevel - 1;
      }

      // Apply transition effect
      if (newZoomLevel !== zoomLevel) {
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();

        setZoomLevel(newZoomLevel);
      }

      // Reset scale
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }
  };

  const getAllIntervals = (zoom = zoomLevel) => {
  if (!stories || stories.length === 0) return [];

  // Determine the start and end years based on the stories
  const rawStartYear = new Date(
    Math.min(...stories.map((story) => new Date(story.startDate).getTime()))
  ).getFullYear();
  const rawEndYear = new Date(
    Math.max(...stories.map((story) => new Date(story.startDate).getTime()))
  ).getFullYear();

  // Adjust start and end to decades for zoom level 0
  const startYear = Math.floor(rawStartYear / 10) * 10;
  const endYear = Math.ceil(rawEndYear / 10) * 10;

  let intervals = [];

  if (zoom === 0) {
    // Generate decades
    for (let year = startYear; year <= endYear; year += 10) {
      intervals.push(`${year}`);
    }
  } else if (zoom === 1) {
    // Generate individual years
    for (let year = rawStartYear; year <= rawEndYear; year++) {
      intervals.push(`${year}`);
    }
  } else if (zoom === 2) {
    // Generate month-year pairs
    for (let year = rawStartYear; year <= rawEndYear; year++) {
      for (let month = 0; month < 12; month++) {
        intervals.push(
          `${new Date(year, month).toLocaleString("default", { month: "short" })} ${year}`
        );
      }
    }
  }

  return intervals;
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (zoomLevel === 0) {
      return Math.floor(date.getFullYear() / 10) * 10;
    } else if (zoomLevel === 1) {
      return date.getFullYear();
    } else if (zoomLevel === 2) {
      return `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
    }
  };

  const groupStoriesByInterval = (stories) => {
    return stories.reduce((acc, story) => {
      const interval = formatDate(story.startDate);
      if (!acc[interval]) {
        acc[interval] = [];
      }
      acc[interval].push(story);
      return acc;
    }, {});
  };

  const groupedStories = groupStoriesByInterval(stories);
  const intervals = getAllIntervals();

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler
        onHandlerStateChange={onPinchStateChange}
      >
        <Animated.View style={[styles.timeline, { opacity }]}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={styles.yellowLine} />
            {intervals.map((interval, index) => (
              <View key={`${interval}-${index}`} style={styles.yearSection}>
                <View style={styles.yearContainer}>
                  <Text style={styles.time}>{interval}</Text>
                </View>
                {groupedStories[interval] &&
                  groupedStories[interval].map((story) => (
                    <View key={story.id} style={styles.cardContainer}>
                      <StoryCard
                        navigation={navigation}
                        story={story}
                      />
                    </View>
                  ))}
              </View>
            ))}
            <View />
          </ScrollView>
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeline: {
    flex: 1,
    paddingBottom: isTablet ? 0 : 415,
  },
  scrollView: {
    marginLeft: 30,
  },
  scrollViewContent: {
    paddingBottom: 300,
  },
  yellowLine: {
    position: "absolute",
    width: 10,
    backgroundColor: "#FCD385",
    borderWidth: 2,
    height: "100%",
    left: 20,
    zIndex: -1,
  },
  yearSection: {
    marginBottom: 30,
  },
  yearContainer: {
    marginLeft: "10%",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  time: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginRight: 10,
  },
  cardContainer: {
    borderWidth: 3,
    borderColor: theme.colors.chineseBlack,
    borderRadius: 10,
    padding: 10,
    backgroundColor: theme.colors.primaryColorBg,
    marginBottom: 10,
    marginRight: 10,
  },
});

export default StoriesDisplayTimeline;
