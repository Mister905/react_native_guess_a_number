import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
// Components
import Header from "./components/Header";
// Screens
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOverScreen";
import GameOverScreen from "./screens/GameOverScreen";
// FONTS
import * as Font from "expo-font";
import { AppLoading } from "expo";
// This function returns a promise
const fetch_fonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};
// touch /components/BodyText

export default function App() {
  const [user_number, set_user_number] = useState();
  const [guess_count, set_guess_count] = useState(0);
  const [loading_fonts, set_loading_fonts] = useState(true);

  if (loading_fonts) {
    // Proceed once the promise resolves
    return (
      <AppLoading
        startAsync={fetch_fonts}
        onFinish={() => set_loading_fonts(false)}
        onError={error => console.log(error)}
      />
    );
  }

  const handle_start_game = selected_number => {
    set_user_number(selected_number);
  };

  const handle_game_over = guess_count => {
    set_guess_count(guess_count);
  };

  const handle_new_game = () => {
    set_user_number(null);
    set_guess_count(0);
  };

  let content = <StartScreen handle_start_game={handle_start_game} />;

  if (user_number && guess_count <= 0) {
    content = (
      <GameScreen
        user_number={user_number}
        handle_game_over={handle_game_over}
      />
    );
  } else if (guess_count > 0) {
    content = (
      <GameOverScreen
        guess_count={guess_count}
        user_number={user_number}
        handle_new_game={handle_new_game}
      />
    );
  }

  return (
    <View style={styles.app_container}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  app_container: {
    flex: 1
  }
});
