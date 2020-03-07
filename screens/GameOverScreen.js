import React from "react";
import { View, Text, Button, Alert, Image, StyleSheet } from "react-native";
import BodyText from "../components/BodyText";
import CustomButton from "../components/CustomButton";

const GameOverScreen = props => {
  return (
    <View style={styles.game_over_container}>
      <BodyText>Game Over!</BodyText>
      <View style={styles.game_over_image_container}>
        <Image
          // Local Image
          source={require("../assets/success.png")}
          // Web Image
          // source={{uri('https://')}}
          style={styles.game_over_image}
          // This is the default property - other options exist
          resizeMode="cover"
        />
      </View>
      <BodyText>
        Number of Guesses: <Text style={styles.bold}>{props.guess_count}</Text>
      </BodyText>
      <BodyText>
        User Number: <Text style={styles.bold}>{props.user_number}</Text>
      </BodyText>
      <View style={styles.new_game_btn_container}>
        <CustomButton onPress={props.handle_new_game} activeOpacity={0.6}>
          New Game
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  game_over_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  new_game_btn_container: {
    marginTop: 15
  },
  game_over_image_container: {
    borderWidth: 3,
    borderColor: "black",
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: "hidden",
    marginVertical: 10
  },
  game_over_image: {
    width: "100%",
    height: "100%"
  },
  bold: {
    fontFamily: "open-sans-bold"
  }
});

export default GameOverScreen;
