import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import FakeDatabaseContext from './components/FakeDatabaseContext';

// MAIN PAGES 
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import SearchResults from './components/SearchResults';
import MyProfile from './components/MyProfile';
import StoryFormatChoice from './components/StoryFormatChoice';
import TextInputChoice from './components/TextInputChoice';
import StartAudioRecording from './components/StartAudioRecording';
import StartVideoRecording from './components/StartVideoRecording';
import RecordVideo from './components/RecordVideo';
import RecordAudio from './components/RecordAudio';
import ViewStory from './components/ViewStory';
import EditMetadata from './components/EditMetadata';
import MyStories from './components/MyStories';
import Scan from './components/Scan';
import EditWrittenStory from './components/EditWrittenStory';

import NavBar from './components/Navbar';


const fakeDatabase = {
  stories: [
    {
      title: "Meeting my Wife",
      author: "Christos Stephanopoulos",
      location: "Nantucket, MA",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      occurrencedAt: new Date(1975, 0, 1).toISOString(),
      text: "Off the shore of Cape Cod, summers on Nantucket were a combination of warm sun and brisk wind. It was late August and I had escaped the busy skylines of New York in search of solace. I pulled out my camera while watching waves crash upon Madaket Beach. My goal was to capture the momentary bliss I felt. But there she stood in front of the vast sea"
    },
    {
      title: "Nightmare at DFW",
      author: "Rennold Suzuki"
    },
    {
      title: "Elvis Concert",
      author: "Shelly C."
    },
    {
      title: "First Trip to NYC",
      author: "Bob W."
    }
  ]
};

const Stack = createNativeStackNavigator();

export default function App() {
  [db, setDb] = useState(fakeDatabase);
  return (
    <FakeDatabaseContext.Provider value={db}>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="SearchPage" component={SearchPage} />
            <Stack.Screen name="SearchResults" component={SearchResults} />
            <Stack.Screen name="MyProfile" component={MyProfile} />
            <Stack.Screen name="StoryFormatChoice" component={StoryFormatChoice} />
            <Stack.Screen name="TextInputChoice" component={TextInputChoice} />
            <Stack.Screen name="StartAudioRecording" component={StartAudioRecording} />
            <Stack.Screen name="StartVideoRecording" component={StartVideoRecording} />
            <Stack.Screen name="RecordVideo" component={RecordVideo} />
            <Stack.Screen name="RecordAudio" component={RecordAudio} />
            <Stack.Screen name="ViewStory" component={ViewStory} />
            <Stack.Screen name="EditMetadata" component={EditMetadata} />
            <Stack.Screen name="MyStories" component={MyStories} />
            <Stack.Screen name="Scan" component={Scan} />
            <Stack.Screen name="EditWrittenStory" component={EditWrittenStory} />
          </Stack.Navigator>
          <NavBar />
        </View>
      </NavigationContainer>
    </FakeDatabaseContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    backgroundColor: "cornflowerblue",
    padding: "1rem"
  },
});
