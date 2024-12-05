import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { Audio } from "expo-av";

const StoryAudio = ({ audio }) => {
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    try {
      console.log("Loading sound...");
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: audio,
      });
      setSound(newSound);
      console.log("Sound successfully set:", newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error loading or playing sound:", error);
    }
  }
  
  return (
    <View>
      <Button title="Play Audio" onPress={playSound} />
    </View>
  );
};

export default StoryAudio;