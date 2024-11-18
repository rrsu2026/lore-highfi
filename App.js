import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
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

const stories = [ // Fake database
  {
    title: "Meeting my Wife",
    author: "Christos Stephanopoulos",
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
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="HomePage" component={HomePage} initialParams={{stories}} />
          <Stack.Screen name="StoryFormatChoice" component={StoryFormatChoice} />
          <Stack.Screen name="TextInputChoice" component={TextInputChoice} />
          <Stack.Screen name="StartAudioRecording" component={StartAudioRecording} />
          <Stack.Screen name="StartVideoRecording" component={StartVideoRecording} />
          <Stack.Screen name="RecordVideo" component={RecordVideo} />
          <Stack.Screen name="RecordAudio" component={RecordAudio} />
          <Stack.Screen name="ViewStory" component={ViewStory} />
          <Stack.Screen name="EditMetadata" component={EditMetadata} />
          <Stack.Screen name="MyStories" component={MyStories} initialParams={{stories}} />
          <Stack.Screen name="Scan" component={Scan} />
          <Stack.Screen name="EditWrittenStory" component={EditWrittenStory} />
        </Stack.Navigator>
        <nav style={styles.navbar}>Navbar goes here</nav>
      </View>
    </NavigationContainer>
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
