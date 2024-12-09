import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import FakeDatabaseContext from "./components/FakeDatabaseContext.jsx";
import AuthenticationContext from "./components/AuthenticationContext.jsx";
import theme from "./Theme.js";

// MAIN PAGES
import HomePage from "./components/HomePage.jsx";
import SearchPage from "./components/SearchPage.jsx";
import SearchResults from "./components/SearchResults.jsx";
import MyProfile from "./components/MyProfile.jsx";
import MyCircle from "./components/MyCircle.jsx";
import StoryFormatChoice from "./components/StoryFormatChoice.jsx";
import TextInputChoice from "./components/TextInputChoice.jsx";
import StartVideoRecording from "./components/StartVideoRecording.jsx";
import RecordVideo from "./components/RecordVideo.jsx";
import RecordAudio from "./components/RecordAudio.jsx";
import ViewStory from "./components/ViewStory.jsx";
import EditMetadata from "./components/EditMetadata.jsx";
import MyStories from "./components/MyStories.jsx";
import Scan from "./components/Scan.jsx";
import EditWrittenStory from "./components/EditWrittenStory.jsx";
import SliceOfLifeSearch from "./demo/SliceOfLifeSearch.jsx";
import Login from "./components/Login.jsx";
import NewComment from "./components/NewComment.jsx";
import ViewComments from "./components/ViewComments.jsx";
import ViewComment from "./components/ViewComment.jsx";

import NavBar from "./components/Navbar.jsx";
import MySubscribers from "./components/MySubscribers.jsx";
import SubscribedAuthors from "./components/SubscribedAuthors.jsx";
import SavedStories from "./components/SavedStories.jsx";

const fakeDatabase = {
  stories: [
    {
      id: "c88489ba-d259-4158-8443-5fe0d352a764",
      title: "A Short Tale",
      authorId: "701e20bb-3aba-4d4b-9f6c-436762886d58",
      location: "Nantucket, MA",
      tags: ["Mice", "Adventure", "Slice of Life"],
      postedAt: new Date(2024, 6, 15).toISOString(),
      startDate: new Date(1975, 0, 1).toISOString(),
      text: "Once upon a time, in a small village, there was a mouse named Squeaky.",
      comments: []
    },
    {
      id: "bd685d19-9dcf-4dd6-aae2-f5cda5791287",
      title: "Meeting my Wife",
      authorId: "701e20bb-3aba-4d4b-9f6c-436762886d58",
      location: "Nantucket, MA",
      tags: ["Slice of Life", "Love Stories", "First-Gen", "Wisdom and Advice"],
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      startDate: new Date(1975, 0, 1).toISOString(),
      text: "Off the shore of Cape Cod, summers on Nantucket were a combination of warm sun and brisk wind. It was late August and I had escaped the busy skylines of New York in search of solace.\n\nI pulled out my camera while watching waves crash upon Madaket Beach. My goal was to capture the momentary bliss I felt. But there she stood in front of the vast sea.\n\nShe was breathtaking, glancing at me with a parasol in hand. Her eyes were gray like the ocean during the first waves after a storm.\n\nNew York was a place of neverending toil and Dionysian indulgence alike. As an up and coming stockbroker, I had grown weary of both extremes. I had come to miss my Swathmore days when I spent my time indulging in literature and the arts. But time stopped when I stepped in front of her.\n\nShe felt like art, her curled hair swaying in the wind as hair did in the eyes of great Romanticists.",
      comments: []
    },
    {
      id: "49651814-8f82-4065-9531-3a49b2b02ae3",
      title: "Nightmare at DFW part 2",
      authorId: "6618d3b5-8540-4b84-9ed8-215a7f769ee3",
      location: "Fort Worth, TX",
      tags: ["Slice of Life", "First-Gen"],
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      startDate: new Date(1980, 0, 1).toISOString(),
      text: "After the distressing encounter at Dallas Fort Worth Airport, I hoped the worst was behind me. However, the challenges continued as I navigated through Texas.  {'\n'}{'\n'} Upon arriving at my hotel, the receptionist's forced smile and curt responses made it clear I wasn't entirely welcome. Despite having a confirmed reservation, I was told my room wasn't ready and was asked to wait in the lobby. As I sat there, I couldn't help but notice other guests, who arrived after me, being promptly checked in.  {'\n'}{'\n'} Later, while dining at a nearby restaurant, I experienced prolonged waits for service. When my meal finally arrived, it was cold, and my attempts to address the issue were met with indifference. The subtle glances and whispered comments from neighboring tables added to my discomfort.  {'\n'}{'\n'} The culmination of these experiences left me feeling isolated and unwelcome. It was a stark reminder of the prejudices that persisted, even decades after World War II. Despite my education and professional achievements, I was still subjected to discrimination based on my heritage.  {'\n'}{'\n'} These incidents reinforced the importance of resilience and the need to continue advocating for understanding and equality. They also deepened my appreciation for the support of my community and the progress we've made, while highlighting the work that remains.",
      comments: []
    },
    {
      id: "588e8bf5-fdf9-4ceb-a0b2-514c908ea13b",
      title: "Nightmare at DFW",
      authorId: "6618d3b5-8540-4b84-9ed8-215a7f769ee3",
      location: "Fort Worth, TX",
      tags: ["Slice of Life"],
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      startDate: new Date(1984, 0, 1).toISOString(),
      text: "In 1980, I was a Japanese-American chemical engineer, a proud alumnus of MIT, working in Texas. That year, I had a distressing experience at Dallas/Fort Worth Regional Airport, as it was known then.{'\n'}{'\n'} I arrived at DFW Airport for a business trip, dressed in my usual professional attire and carrying the necessary documents. As I approached the security checkpoint, a stern-faced officer singled me out for additional screening. Despite my compliance and calm demeanor, the scrutiny intensified. Officers rifled through my belongings and questioned me about my travel plans and background. {'\n'}{'\n'} The interrogation took a disheartening turn when one officer asked, 'Are you related to anyone who was in those camps during the war?' I was taken aback, realizing he was referring to the internment camps where Japanese-Americans were unjustly held during World War II. This question felt like a stark reminder of the lingering prejudice that many believed had faded. {'\n'}{'\n'} After what felt like an eternity, I was allowed to proceed, but the experience left me shaken and humiliated. It was a painful reminder that, despite my education and professional achievements, I was still seen by some through a lens of suspicion and bias. {'\n'}{'\n'} This incident at DFW Airport underscored the challenges that Japanese-Americans continued to face, even decades after World War II. It highlighted the importance of addressing and confronting prejudice in all its forms to ensure that such injustices do not persist.",
      comments: []
    },
    {
      id: "5082a3db-ff6f-4539-b875-d2035222a3bc",
      title: "Frank Sinatra Concert",
      authorId: "a28bfa77-fd2e-4802-834b-0a0f1c76d394",
      tags: ["Slice of Life", "Women"],
      location: "Chicago, IL",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      startDate: new Date(1945, 0, 1).toISOString(),
      text: "The smell of caramel corn and the distant hum of chatter filled the air that night in 1945. I was just a little girl, barely eight, clutching my father’s hand as we wove through the crowded streets outside the Chicago Theatre. Its iconic marquee glowed against the chilly autumn sky, and the name Frank Sinatra sparkled like magic. My father, a quiet man who rarely treated himself to such outings, had surprised me with tickets earlier that week. He loved Sinatra's voice, and I think he wanted to share that joy with me. Inside, the theater felt grand and endless, with velvet seats and golden lights that danced off the walls. When Sinatra finally took the stage, his voice filled every corner of that beautiful room. I remember sitting there, my legs too short to reach the floor, transfixed by his charm, feeling as if he were singing just for me.\n\nNow, as I sit in my worn armchair all these years later, I can still hear the music in my mind. My father’s hand felt so strong in mine back then, and I wonder if he knew how much that night would mean to me. The war was ending, and the world felt uncertain, but for those two hours, everything seemed right. My father bought me a small box of Cracker Jack at intermission, and I remember the sweetness mingling with the melodies as Sinatra crooned I’ll Never Smile Again. Sometimes, when the house is quiet, I hum that song to myself and think of my father. He passed not long after that night, but I still have the memory of his smile as Sinatra tipped his hat to the audience. It’s a little thread of light in a world that can sometimes feel so dim.",
      comments: []
    },
    {
      id: "3799dfa1-4d9d-4b0a-987a-9270a18ab151",
      title: "First Trip to NYC",
      authorId: "6a5bb277-6f10-4e0f-937c-5ef5d1d8f692",
      tags: ["Slice of Life"],
      location: "New York, NY",
      postedAt: new Date(2024, 6, 15).toISOString(), // Months in JavaScript are 0-indexed, but days and years are not
      startDate: new Date(1963, 0, 1).toISOString(),
      text: "I still remember stepping off that Greyhound bus into the madness of New York City back in 1963, a wide-eyed farm boy barely 18. Those skyscrapers felt like they could touch the stars, and I stood there, boots and all, wondering how a Texan like me had landed in the middle of such a roaring, blinking universe. I clutched my hat tight, weaving through crowds faster than any herd I’d ever seen, the honking taxis and flashing lights of Times Square making my head spin. I’d spent most of my money on a hot dog and a ticket to the top of the Empire State Building, where the whole city spread out like a quilt stitched with light. Now, at 75, I can still feel that wonder deep in my chest—it was the first time I realized how big and beautiful the world could be.\n\n\n\n\n\n\n\n",
      comments: []
    },
    {
      "id": "i06kjg55-nl0m-bg89-6b2j-8i8n9k54lb7u",
      "title": "Sailing with the Swedish Army",
      "authorId": "i06kjg55-nl0m-bg89-6b2j-8i8n9k54lb72",

      "location": "Baltic Sea",
      "tags": ["Military", "Sailing", "Swedish Army", "1970s"],
      "postedAt": "2024-07-15T00:00:00.000Z",
      "startDate": "1975-01-01T00:00:00.000Z",
      "text": "In the mid-1970s, as a young conscript in the Swedish Army, I found myself assigned to a unit responsible for coastal defense. Our operations often took us to the Baltic Sea, where we conducted various training exercises and patrols. The Swedish Army maintained a fleet of vessels designed for archipelago warfare, a tradition dating back to the 18th century with the establishment of the archipelago fleet. \n\n These vessels were crucial for navigating the intricate waterways of Sweden's coastline. \n\n During one particularly challenging exercise, we were tasked with navigating through the dense archipelagos under adverse weather conditions. The experience was both physically demanding and mentally taxing, testing our seamanship and resilience. Despite the hardships, these missions fostered a deep camaraderie among us, as we relied on each other to overcome the obstacles presented by the sea and weather. \n\n Serving in this capacity provided me with invaluable skills and experiences. It instilled in me a profound respect for the sea and the importance of teamwork. These lessons have stayed with me throughout my life, shaping my character and approach to challenges.",
      "comments": []
    },
    {
      "id": "a28bfa77-fd2e-4802-834b-0a0f1c76d394",
      "title": "Chinese New Year Amidst the Financial Crisis",
      "authorId": "a28bfa77-fd2e-4802-834b-0a0f1c76d394",
      "location": "Chicago, IL",
      "tags": ["Chinese-American", "Family", "Slice of Life", "Resilience"],
      "postedAt": "2024-07-15T00:00:00.000Z",
      "startDate": "2009-01-26T00:00:00.000Z",
      "text": "As the 2009 Chinese New Year approached, the Chen household buzzed with activity. The aroma of traditional dishes like dumplings and fish filled the air, symbolizing prosperity and abundance. Red lanterns adorned the living room, casting a warm glow that contrasted with the cold reality of the ongoing financial crisis.\n\nGathered around the dinner table, I looked at my grandchildren's eager faces. Their parents, my children, had been discussing the impact of the economic downturn on their jobs and savings. The weight of the recession was palpable, but tonight, I wanted to focus on hope and resilience.\n\nAfter dinner, I handed each grandchild a red envelope, or hóngbāo, containing money—a tradition meant to bestow good luck and ward off evil spirits. Their eyes lit up, momentarily forgetting the outside world's troubles. We then gathered to watch the Spring Festival Gala on television, a program filled with performances that celebrate Chinese culture and unity.\n\nAs fireworks illuminated the night sky, I reflected on the importance of family and tradition during challenging times. The financial crisis had affected us all, but the New Year offered a chance to start anew, to instill hope in the younger generation, and to remind them of the strength found in our shared heritage.\n\nIn the face of uncertainty, our family's celebration of Chinese New Year became a beacon of continuity and optimism, reinforcing the bonds that hold us together and the cultural values that guide us forward.",
      "comments": []
    },
    {
      "id": "q28bfa77-fd2e-4802-834b-0a0f1c76d3987",
      "title": "Voice",
      "authorId": "h95jif44-mk9l-af78-5a1i-7h7m8j43ka61",
      "location": "Chicago, IL",
      "tags": ["Egypt", "1970s"],
      "postedAt": "2024-07-15T00:00:00.000Z",
      "startDate": "2009-01-26T00:00:00.000Z",
      "audio": "https://ia801303.us.archive.org/3/items/AmericanStories/Luck_-_By_Mark_Twain.mp3",
      "comments": []
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
      subscribedTo: ["a28bfa77-fd2e-4802-834b-0a0f1c76d394"],
      savedStories: [
        "c88489ba-d259-4158-8443-5fe0d352a764",
        "bd685d19-9dcf-4dd6-aae2-f5cda5791287",
      ]
    },
    {
      id: "a28bfa77-fd2e-4802-834b-0a0f1c76d394",
      name: "Shelly Chen",
      location: "Chicago, IL",
      age: 92,
      tags: ["1940s", "Music", "Storytelling"],
      about: "I grew up in Chicago during the 1940s and have a deep love for music and storytelling.",
      subscribedTo: ["6618d3b5-8540-4b84-9ed8-215a7f769ee3"],
    },
    {
      id: "6a5bb277-6f10-4e0f-937c-5ef5d1d8f692",
      name: "Bob Williams",
      pfp: require('./assets/bobw.jpg'),
      location: "Austin, TX",
      age: 78,
      tags: ["1970s", "Teacher"],
      about: "I love talking about Austin, TX and science education!",
      subscribedTo: ["6618d3b5-8540-4b84-9ed8-215a7f769ee3"],
    },
    {
      "id": "b39cfa88-ge3f-4912-945c-1b1g2d87e405",
      "name": "Miguel Hernández",
      "location": "San Antonio, TX",
      "age": 75,
      "tags": ["1950s", "Cooking", "Travel"],
      "about": "Born and raised in San Antonio, I have a passion for cooking traditional Tex-Mex dishes and exploring new places.",
      "subscribedTo": ["7729e4c6-9651-5c95-af9f-326b8g87f6f4"]
    },
    {
      "id": "c40dfa99-hf4g-5a23-056d-2c2h3e98f516",
      "name": "Aisha Khan",
      "location": "Dearborn, MI",
      "age": 68,
      "tags": ["1960s", "Art", "Gardening"],
      "about": "As an artist from Dearborn, I find joy in painting and cultivating my garden.",
      "subscribedTo": ["883af5d7-0762-6da6-bg0g-437c9h98g7g5"]
    },
    {
      "id": "d51efb00-ig5h-6b34-167e-3d3i4f09g627",
      "name": "Raj Patel",
      "location": "Edison, NJ",
      "age": 72,
      "tags": ["1950s", "Technology", "Photography"],
      "about": "A retired engineer in Edison, I enjoy staying updated with tech trends and capturing moments through photography.",
      "subscribedTo": ["994bg6e8-1873-7eb7-ch1h-548d0i09h8h6"]
    },
    {
      "id": "e62fgc11-jh6i-7c45-278f-4e4j5g10h738",
      "name": "Maria Rossi",
      "location": "Boston, MA",
      "age": 80,
      "tags": ["1940s", "Cooking", "Family"],
      "about": "Originally from Italy, I cherish cooking family recipes and spending time with my grandchildren in Boston.",
      "subscribedTo": ["a05ch7f9-2984-8fc8-di2i-659e1j10i9i7"]
    },
    {
      "id": "f73ghd22-ki7j-8d56-389g-5f5k6h21i849",
      "name": "John O'Connor",
      "location": "Dublin, Ireland",
      "age": 85,
      "tags": ["1930s", "History", "Literature"],
      "about": "A retired history professor in Dublin, I have a profound interest in literature and historical events.",
      "subscribedTo": ["b16di8g0-3a95-9gd9-ej3j-76af2k21j0j8"]
    },
    {
      "id": "g84ihe33-lj8k-9e67-490h-6g6l7i32j950",
      "name": "Akira Tanaka",
      "location": "San Francisco, CA",
      "age": 70,
      "tags": ["1950s", "Photography", "Travel"],
      "about": "Born in Japan, now residing in San Francisco, I love capturing landscapes and traveling the world.",
      "subscribedTo": ["c27ej9h1-4ba6-af0a-fk4k-87bg3l32k1k9"]
    },
    {
      "id": "h95jif44-mk9l-af78-5a1i-7h7m8j43ka61",
      "name": "Fatima Ali",
      "location": "Cairo, Egypt",
      "age": 65,
      "tags": ["1960s", "Teaching", "Music"],
      "about": "As a retired teacher in Cairo, I have a passion for traditional Egyptian music and educating the youth.",
      "subscribedTo": ["d38fk0i2-5cb7-bg1b-gl5l-98ch4m43l2l0"]
    },
    {
      "id": "i06kjg55-nl0m-bg89-6b2j-8i8n9k54lb72",
      "name": "Lars Johansson",
      "location": "Stockholm, Sweden",
      "age": 78,
      "tags": ["1940s", "Sailing", "Writing"],
      "about": "A former sailor from Stockholm, I now enjoy writing about my adventures on the sea.",
      "subscribedTo": ["e49gl1j3-6dc8-ch2c-hm6m-a9di5n54m3m1"]
    },
    {
      "id": "j17lkj66-om1n-ch90-7c3k-9j9o0l65mc83",
      "name": "Linda Martinez",
      "location": "Los Angeles, CA",
      "age": 60,
      "tags": ["1960s", "Dance", "Fitness"],
      "about": "A dance instructor in Los Angeles, I am dedicated to promoting fitness and well-being through dance.",
      "subscribedTo": ["f50hm2k4-7ed9-di3d-in7n-b0ej6o65n4n2"]
    }
  ],
};

const defaultUser = "6618d3b5-8540-4b84-9ed8-215a7f769ee3";

const Stack = createNativeStackNavigator();

export default function App() {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [db, setDb] = useState(fakeDatabase);
  const [currentScreen, setCurrentScreen] = useState("HomePage");
  const [loggedInUser, setLoggedInUser] = useState(
    db.users.find((user) => user.id === defaultUser)
  );
  return (
    <AuthenticationContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <FakeDatabaseContext.Provider value={[db, setDb]}>
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
                name="StartVideoRecording"
                component={StartVideoRecording}
                options={{ headerTitle: "" }}
              />
              <Stack.Screen name="RecordVideo" component={RecordVideo} options={{ headerTitle: "" }}
              />
              <Stack.Screen name="RecordAudio" component={RecordAudio} options={{ headerTitle: "" }} />
              <Stack.Screen
                name="ViewStory"
                component={ViewStory}
                options={{
                  headerBackTitle: "Back",
                  headerTitle: "",
                }}
              />
              <Stack.Screen name="EditMetadata" component={EditMetadata} options={{ headerTitle: "" }}
              />
              <Stack.Screen name="MyStories" component={MyStories} options={{ headerTitle: "" }} />
              <Stack.Screen name="Scan" component={Scan} options={{ headerTitle: "" }} />
              <Stack.Screen
                name="EditWrittenStory"
                component={EditWrittenStory}
                options={{ headerTitle: "" }}
              />
              <Stack.Screen
                name="SliceOfLifeSearch"
                component={SliceOfLifeSearch}
                options={{ headerBackTitle: "Back", headerTitle: "" }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false, presentation: "modal" }}
              />
              <Stack.Screen
                name="NewComment"
                component={NewComment}
                options={{ headerTitle: "Comment" }}
              />
              <Stack.Screen
                name="ViewComments"
                component={ViewComments}
                options={{ headerTitle: "Comments" }}
              />
              <Stack.Screen
                name="ViewComment"
                component={ViewComment}
                options={{ headerTitle: "Your Comment" }}
              />
              <Stack.Screen
                name="MySubscribers"
                component={MySubscribers}
                options={{ headerTitle: "My Subscribers" }}
              />
              <Stack.Screen
                name="SubscribedAuthors"
                component={SubscribedAuthors}
                options={{ headerTitle: "Subscribed Authors" }}
              />
              <Stack.Screen
                name="SavedStories"
                component={SavedStories}
                options={{ headerTitle: "Saved Stories" }}
              />
            </Stack.Navigator>
            {currentScreen !== "Login" && <NavBar currentScreen={currentScreen} />}
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
