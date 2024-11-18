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


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="HomePage" component={HomePage} />
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
