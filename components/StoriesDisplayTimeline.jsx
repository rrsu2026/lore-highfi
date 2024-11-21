import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import StoryCard from "./StoryCard";
import theme from "../Theme";

const StoriesDisplayTimeline = ({ navigation, stories }) => {
  const [scale, setScale] = useState(new Animated.Value(1));
  const [zoomIn, setZoomIn] = useState(false);

  const onPinchEvent = Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: false,
  });

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        useNativeDriver: false,
      }).start();
    }
  };

  const formatDateToDecade = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return Math.floor(year / 10) * 10;
  };

  const groupStoriesByDecade = (stories) => {
    return stories.reduce((acc, story) => {
      const decade = formatDateToDecade(story.occurrencedAt);
      if (!acc[decade]) {
        acc[decade] = [];
      }
      acc[decade].push(story);
      return acc;
    }, {});
  };

  const groupedStories = groupStoriesByDecade(stories);

  const handleStackClick = () => {
    setZoomIn(!zoomIn);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <Animated.View style={[styles.timeline, { transform: [{ scale }] }]}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.yellowLine} />
            {Object.keys(groupedStories)
              .sort((a, b) => a - b)
              .map((decade) => (
                <View key={decade} style={styles.yearSection}>
                  <View style={styles.yearContainer}>
                    <Text style={styles.time}>{`${decade}s`}</Text>
                  </View>
                  {groupedStories[decade].length > 1 ? (
                    <TouchableOpacity
                      style={styles.stackContainer}
                      onPress={handleStackClick}
                    >
                      <Text style={styles.stackLabel}>
                        {groupedStories[decade].length} stories
                      </Text>
                      {zoomIn && (
                        <View style={styles.zoomedStack}>
                          {groupedStories[decade].map((story) => (
                            <StoryCard
                              key={story.id} // Use a unique identifier
                              navigation={navigation}
                              story={story}
                            />
                          ))}
                        </View>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.cardContainer}>
                      <StoryCard
                        navigation={navigation}
                        story={groupedStories[decade][0]}
                      />
                    </View>
                  )}
                </View>
              ))}
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
    flexDirection: "column",
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginLeft: 30,
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
    marginBottom: "2%",
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginRight: 10,
  },
  stackContainer: {
    flexDirection: "column",
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#f4f4f4",
  },
  stackLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  zoomedStack: {
    flexDirection: "column",
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
