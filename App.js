import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import FakeDatabaseContext from "./components/FakeDatabaseContext";
import AuthenticationContext from "./components/AuthenticationContext";
import theme from "./Theme";

// MAIN PAGES
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import SearchResults from "./components/SearchResults";
import MyProfile from "./components/MyProfile";
import MyCircle from "./components/MyCircle";
import StoryFormatChoice from "./components/StoryFormatChoice";
import TextInputChoice from "./components/TextInputChoice";
import StartAudioRecording from "./components/StartAudioRecording";
import StartVideoRecording from "./components/StartVideoRecording";
import RecordVideo from "./components/RecordVideo";
import RecordAudio from "./components/RecordAudio";
import ViewStory from "./components/ViewStory";
import EditMetadata from "./components/EditMetadata";
import MyStories from "./components/MyStories";
import Scan from "./components/Scan";
import EditWrittenStory from "./components/EditWrittenStory";

import NavBar from "./components/Navbar";

const fakeDatabase = {
  stories: [
    {
      title: "Meeting my Wife",
      author: "701e20bb-3aba-4d4b-9f6c-436762886d58",
      location: "Nantucket, MA",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      occurrencedAt: new Date(1975, 0, 1).toISOString(),
      text: "Off the shore of Cape Cod, summers on Nantucket were a combination of warm sun and brisk wind. It was late August and I had escaped the busy skylines of New York in search of solace. I pulled out my camera while watching waves crash upon Madaket Beach. My goal was to capture the momentary bliss I felt. But there she stood in front of the vast sea",
    },
    {
      title: "Nightmare at DFW part 2",
      author: "6618d3b5-8540-4b84-9ed8-215a7f769ee3",
      location: "Nantucket, MA",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      occurrencedAt: new Date(1980, 0, 1).toISOString(),
      text: "Off the shore of Cape Cod, summers on Nantucket were a combination of warm sun and brisk wind. It was late August and I had escaped the busy skylines of New York in search of solace. I pulled out my camera while watching waves crash upon Madaket Beach. My goal was to capture the momentary bliss I felt. But there she stood in front of the vast sea",
    },
    {
      title: "Nightmare at DFW",
      author: "6618d3b5-8540-4b84-9ed8-215a7f769ee3",
      location: "Nantucket, MA",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      occurrencedAt: new Date(1980, 0, 1).toISOString(),
      text: "Off the shore of Cape Cod, summers on Nantucket were a combination of warm sun and brisk wind. It was late August and I had escaped the busy skylines of New York in search of solace. I pulled out my camera while watching waves crash upon Madaket Beach. My goal was to capture the momentary bliss I felt. But there she stood in front of the vast sea",
    },
    {
      title: "Elvis Concert",
      author: "a28bfa77-fd2e-4802-834b-0a0f1c76d394",
      location: "Nantucket, MA",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      occurrencedAt: new Date(1945, 0, 1).toISOString(),
      text: "I saw elvis this one time",
    },
    {
      title: "First Trip to NYC",
      author: "6a5bb277-6f10-4e0f-937c-5ef5d1d8f692",
      location: "Nantucket, MA",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      occurrencedAt: new Date(1963, 0, 1).toISOString(),
      text: "Off the shore of Cape Cod, summers on Nantucket were a combination of warm sun and brisk wind. It was late August and I had escaped the busy skylines of New York in search of solace. I pulled out my camera while watching waves crash upon Madaket Beach. My goal was to capture the momentary bliss I felt. But there she stood in front of the vast sea",
    },
  ],
  users: [
    {
      id: "701e20bb-3aba-4d4b-9f6c-436762886d58",
      name: "Christos Stephanopoulos",
    },
    {
      id: "6618d3b5-8540-4b84-9ed8-215a7f769ee3",
      name: "Rennold Suzuki",
      location: "Seattle, WA",
      age: 85,
      tags: ["Veteran", "First-Gen", "Scientist"],
      about:
        "I moved to the US from Okinawa, Japan in 1959 to study at MIT. I then moved to California to work at a ChemE lab.",
      circle: [
        "a28bfa77-fd2e-4802-834b-0a0f1c76d394",
        "6a5bb277-6f10-4e0f-937c-5ef5d1d8f692",
      ],
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
      about: "I love talking about Austin, TX and science education!",
    },
  ],
};

const defaultUser = "6618d3b5-8540-4b84-9ed8-215a7f769ee3";

const Stack = createNativeStackNavigator();

export default function App() {
  const [db, setDb] = useState(fakeDatabase);
  const [currentScreen, setCurrentScreen] = useState("HomePage");
  const [loggedInUser, setLoggedInUser] = useState(
    db.users.find((user) => user.id === defaultUser)
  );
  return (
    <AuthenticationContext.Provider value={loggedInUser}>
      <FakeDatabaseContext.Provider value={db}>
        <NavigationContainer
          onStateChange={(state) => {
            if (!state) return;
            const currentRoute = state.routes[state.index]; // get active screen
            setCurrentScreen(currentRoute.name); // update state with current screen name
          }}
        >
          <View style={styles.container}>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#f4f4f4",
                },
                headerTintColor: theme.colors.primaryColor5,
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            >
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SearchPage"
                component={SearchPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="SearchResults" component={SearchResults} />
              <Stack.Screen name="MyProfile" component={MyProfile} />
              <Stack.Screen name="MyCircle" component={MyCircle} />
              <Stack.Screen
                name="StoryFormatChoice"
                component={StoryFormatChoice}
              />
              <Stack.Screen
                name="TextInputChoice"
                component={TextInputChoice}
              />
              <Stack.Screen
                name="StartAudioRecording"
                component={StartAudioRecording}
              />
              <Stack.Screen
                name="StartVideoRecording"
                component={StartVideoRecording}
              />
              <Stack.Screen name="RecordVideo" component={RecordVideo} />
              <Stack.Screen name="RecordAudio" component={RecordAudio} />
              <Stack.Screen
                name="ViewStory"
                component={ViewStory}
                options={{
                  headerBackTitle: "Back",
                  headerTitle: "",
                }}
              />
              <Stack.Screen name="EditMetadata" component={EditMetadata} />
              <Stack.Screen name="MyStories" component={MyStories} />
              <Stack.Screen name="Scan" component={Scan} />
              <Stack.Screen
                name="EditWrittenStory"
                component={EditWrittenStory}
              />
            </Stack.Navigator>
            <NavBar currentScreen={currentScreen} />
          </View>
        </NavigationContainer>
      </FakeDatabaseContext.Provider>
    </AuthenticationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    backgroundColor: "cornflowerblue",
    padding: "1rem",
  },
});
