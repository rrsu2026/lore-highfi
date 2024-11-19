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
      author: "701e20bb-3aba-4d4b-9f6c-436762886d58",
      location: "Nantucket, MA",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      occurrencedAt: new Date(1975, 0, 1).toISOString(),
      text: "Off the shore of Cape Cod, summers on Nantucket were a combination of warm sun and brisk wind. It was late August and I had escaped the busy skylines of New York in search of solace. I pulled out my camera while watching waves crash upon Madaket Beach. My goal was to capture the momentary bliss I felt. But there she stood in front of the vast sea"
    },
    {
      title: "Nightmare at DFW",
      author: "6618d3b5-8540-4b84-9ed8-215a7f769ee3"
    },
    {
      title: "Elvis Concert",
      author: "a28bfa77-fd2e-4802-834b-0a0f1c76d394"
    },
    {
      title: "First Trip to NYC",
      author: "6a5bb277-6f10-4e0f-937c-5ef5d1d8f692"
    }
  ],
  users: [
    {
      id: "701e20bb-3aba-4d4b-9f6c-436762886d58",
      name: "Christos Stephanopoulos"
    },
    {
      id: "6618d3b5-8540-4b84-9ed8-215a7f769ee3",
      name: "Rennold Suzuki",
      location: "Seattle, WA",
      age: 85,
      tags: ["Veteran", "First-Gen", "Scientist"],
      about: "I moved to the US from Okinawa, Japan in 1959 to study at MIT. I then moved to California to work at a ChemE lab."
    },
    {
      id: "a28bfa77-fd2e-4802-834b-0a0f1c76d394",
      name: "Shelly C.",
    },
    {
      id: "6a5bb277-6f10-4e0f-937c-5ef5d1d8f692",
      name: "Bob W.",
      location: "Austin, TX",
      age: 78,
      tags: ["1970s", "Teacher"],
      about: "I love talking about Austin, TX and science education!"
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
