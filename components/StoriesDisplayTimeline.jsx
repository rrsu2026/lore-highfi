import React, { useState } from 'react'; 
import { StyleSheet, ScrollView, View, Text, Animated, TouchableOpacity } from 'react-native'; 
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler'; 
import StoryCard from './StoryCard'; 

const StoriesDisplayTimeline = ({ navigation, stories }) => {
  const [scale, setScale] = useState(new Animated.Value(1)); 
  const [zoomIn, setZoomIn] = useState(false); 

  // onPinchEvent handles pinch gestures (scaling), updates the scale state
  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale } }],
  );

  // onPinchStateChange handles the end of the pinch gesture and resets the scale
  const onPinchStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      Animated.spring(scale, {
        toValue: 1, 
        friction: 7, 
      }).start(); 
    }
  };

  // Helper function to format a date string into a decade (e.g., 1910, 1920, etc.)
  const formatDateToDecade = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const decade = Math.floor(year / 10) * 10; 
    return decade;
  };

  /* 
  Kinda format stories into a dict with like the decade. we could do a nested dict to track like by the years then, and then 
  we would eventually sort by month, year once they zoom enough. not sure asnbdhjabsdjha
  {
    1910: [story1, story2, story3],
    1920: [story4, story5],
    1930: [story6]
  }
  */
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

  // handleStackClick toggles the zoom state when a stack of stories is clicked --> rn it just expands and shrinks the stack, need to figure out how to make it zoom into a timeline?
  const handleStackClick = () => {
    setZoomIn(!zoomIn);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler onGestureEvent={onPinchEvent} onHandlerStateChange={onPinchStateChange}>
        <Animated.View style={[styles.timeline, { transform: [{ scale }] }]}>
          <ScrollView style={styles.scrollView}>
            {Object.keys(groupedStories).sort((a, b) => a - b).map((decade) => (
              <View key={decade} style={styles.yearSection}>
                <View style={styles.yearContainer}>
                  {/* Decade label */}
                  <Text style={styles.time}>{`${decade}s`}</Text>
                  <View style={styles.lineContainer}></View>
                </View>
                {/* Display a stack of stories if there are more than one in the decade */}
                {groupedStories[decade].length > 1 ? (
                  <TouchableOpacity style={styles.stackContainer} onPress={handleStackClick}>
                    <Text style={styles.stackLabel}>
                      {groupedStories[decade].length} stories
                    </Text>
                    {/* Show zoomed-in view of the stack when zoomIn is true */}
                    {zoomIn && (
                      <View style={styles.zoomedStack}>
                        {groupedStories[decade].map((story) => (
                          <StoryCard
                            key={story.title}
                            navigation={navigation}
                            story={{
                              title: story.title,
                              author: story.author,
                              location: story.location,
                            }}
                          />
                        ))}
                      </View>
                    )}
                  </TouchableOpacity>
                ) : (
                  <View style={styles.cardContainer}>
                    <StoryCard
                      navigation={navigation}
                      story={{
                        title: groupedStories[decade][0].title,
                        author: groupedStories[decade][0].author,
                        location: groupedStories[decade][0].location,
                      }}
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
    flexDirection: 'column',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginLeft: 40,
  },
  yearSection: {
    marginBottom: 30,
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginRight: 10,
  },
  lineContainer: {
    height: 1,
    backgroundColor: '#ccc',
    flex: 1,
  },
  stackContainer: {
    flexDirection: 'column',
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#f4f4f4',
  },
  stackLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  zoomedStack: {
    flexDirection: 'column',
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});

export default StoriesDisplayTimeline;
