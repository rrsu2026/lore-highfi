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
import SliceOfLifeSearch from "./demo/SliceOfLifeSearch.jsx";

import NavBar from "./components/Navbar";

const fakeDatabase = {
  stories: [
    {
      title: "Meeting my Wife",
      author: "701e20bb-3aba-4d4b-9f6c-436762886d58",
      location: "Nantucket, MA",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      occurrencedAt: new Date(1975, 0, 1).toISOString(),
      text: "Off the shore of Cape Cod, summers on Nantucket were a combination of warm sun and brisk wind. It was late August and I had escaped the busy skylines of New York in search of solace.\n\nI pulled out my camera while watching waves crash upon Madaket Beach. My goal was to capture the momentary bliss I felt. But there she stood in front of the vast sea.\n\nShe was breathtaking, glancing at me with a parasol in hand. Her eyes were gray like the ocean during the first waves after a storm.\n\nNew York was a place of neverending toil and Dionysian indulgence alike. As an up and coming stockbroker, I had grown weary of both extremes. I had come to miss my Swathmore days when I spent my time indulging in literature and the arts. But time stopped when I stepped in front of her.\n\nShe felt like art, her curled hair swaying in the wind as hair did in the eyes of great Romanticists.\n\n\n\n\n\n\n\n\n\n",
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
      title: "Frank Sinatra Concert",
      author: "a28bfa77-fd2e-4802-834b-0a0f1c76d394",
      location: "Chicago, IL",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      occurrencedAt: new Date(1945, 0, 1).toISOString(),
      text: "The smell of caramel corn and the distant hum of chatter filled the air that night in 1945. I was just a little girl, barely eight, clutching my father’s hand as we wove through the crowded streets outside the Chicago Theatre. Its iconic marquee glowed against the chilly autumn sky, and the name Frank Sinatra sparkled like magic. My father, a quiet man who rarely treated himself to such outings, had surprised me with tickets earlier that week. He loved Sinatra's voice, and I think he wanted to share that joy with me. Inside, the theater felt grand and endless, with velvet seats and golden lights that danced off the walls. When Sinatra finally took the stage, his voice filled every corner of that beautiful room. I remember sitting there, my legs too short to reach the floor, transfixed by his charm, feeling as if he were singing just for me.\n\nNow, as I sit in my worn armchair all these years later, I can still hear the music in my mind. My father’s hand felt so strong in mine back then, and I wonder if he knew how much that night would mean to me. The war was ending, and the world felt uncertain, but for those two hours, everything seemed right. My father bought me a small box of Cracker Jack at intermission, and I remember the sweetness mingling with the melodies as Sinatra crooned I’ll Never Smile Again. Sometimes, when the house is quiet, I hum that song to myself and think of my father. He passed not long after that night, but I still have the memory of his smile as Sinatra tipped his hat to the audience. It’s a little thread of light in a world that can sometimes feel so dim.\n\n\n\n\n\n\n\n\n\n",
    },
    {
      title: "First Trip to NYC",
      author: "6a5bb277-6f10-4e0f-937c-5ef5d1d8f692",
      location: "New York, NY",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      occurrencedAt: new Date(1963, 0, 1).toISOString(),
      text: "I still remember stepping off that Greyhound bus into the madness of New York City back in 1963, a wide-eyed farm boy barely 18. Those skyscrapers felt like they could touch the stars, and I stood there, boots and all, wondering how a Texan like me had landed in the middle of such a roaring, blinking universe. I clutched my hat tight, weaving through crowds faster than any herd I’d ever seen, the honking taxis and flashing lights of Times Square making my head spin. I’d spent most of my money on a hot dog and a ticket to the top of the Empire State Building, where the whole city spread out like a quilt stitched with light. Now, at 75, I can still feel that wonder deep in my chest—it was the first time I realized how big and beautiful the world could be.\n\n\n\n\n\n\n\n",
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
              <Stack.Screen
                name="MyProfile"
                component={MyProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="MyCircle" component={MyCircle} />
              <Stack.Screen
                name="StoryFormatChoice"
                component={StoryFormatChoice}
                options={{ headerTitle: "" }}
              />
              <Stack.Screen
                name="TextInputChoice"
                component={TextInputChoice}
                options={{ headerTitle: "" }}
              />
              <Stack.Screen
                name="StartAudioRecording"
                component={StartAudioRecording}
                options={{ headerTitle: "", headerBackTitle: "Back" }}
              />
              <Stack.Screen
                name="StartVideoRecording"
                component={StartVideoRecording}
                options={{ headerTitle: "" }}
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
              <Stack.Screen
                name="SliceOfLifeSearch"
                component={SliceOfLifeSearch}
                options={{ headerBackTitle: "Back", headerTitle: "" }}
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
