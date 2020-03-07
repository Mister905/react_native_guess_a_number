import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  FlatList
} from "react-native";
import Card from "../components/Card";
import Colours from "../constants/colours";
import BodyText from "../components/BodyText";
import CustomButton from "../components/CustomButton";
// ICONS
import { Ionicons } from "@expo/vector-icons";

const generate_random_number_in_range = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min)) + min;
  if (random === exclude) {
    return generate_random_number_in_range(min, max, exclude);
  } else {
    return random;
  }
};

const GameScreen = props => {
  const initial_guess = generate_random_number_in_range(
    1,
    100,
    props.user_number
  );

  const [current_guess, set_current_guess] = useState(initial_guess);

  const [guess_list, set_guess_list] = useState([initial_guess]);

  /*  If a component doesn't need to be updated with new data it's always best to avoid a re-render. That's the benefit of useRef (or instance variables in normal class components) over state. This becomes more important when logic gets more complicated and performance becomes a factor */
  const current_low = useRef(1);
  const current_high = useRef(100);

  const { handle_game_over, user_number } = props;

  // Runs after each rendering
  useEffect(() => {
    if (current_guess === user_number) {
      handle_game_over(guess_list.length);
    }
  }, [current_guess, handle_game_over, user_number]);

  const handle_next_guess = direction => {
    if (
      (direction === "lower" && current_guess < props.user_number) ||
      (direction === "higher" && current_guess > props.user_number)
    ) {
      Alert.alert("Please be honest", "It's only fair...", [
        { txt: "OK", style: "cancel" }
      ]);
      return;
    }

    if (direction === "lower") {
      current_high.current = current_guess;
    } else if (direction === "higher") {
      current_low.current = current_guess;
    }

    const next_guess = generate_random_number_in_range(
      current_low.current,
      current_high.current,
      current_guess
    );

    set_current_guess(next_guess);

    set_guess_list(guess_list => [next_guess, ...guess_list]);
  };

  return (
    <View style={styles.game_screen_container}>
      <Text>Computer's Guess</Text>
      <View style={styles.computers_guess_container}>
        <BodyText style={styles.computers_guess_output}>
          {current_guess}
        </BodyText>
      </View>
      <Card style={styles.game_card}>
        <CustomButton onPress={() => handle_next_guess("lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </CustomButton>
        <CustomButton onPress={() => handle_next_guess("higher")}>
          <Ionicons name="md-add" size={24} color="white" />
        </CustomButton>
      </Card>
      <View style={styles.guess_list_container}>
        {/* <ScrollView contentContainerStyle={styles.guess_list}>
          {guess_list.map((guess, i) => {
            return (
              <View style={styles.guess_list_item}>
                <BodyText>Round: {guess_list.length - i}</BodyText>
                <BodyText>Guess: {guess}</BodyText>
              </View>
            );
          })}
        </ScrollView> */}
        {/* FlatList is performance optimized */}
        <FlatList
          data={guess_list}
          keyExtractor={guess => guess.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.guess_list_item}>
                <BodyText>Round: {guess_list.length - index}</BodyText>
                <BodyText>Guess: {item}</BodyText>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  game_screen_container: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  game_card: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  },
  computers_guess_container: {
    borderWidth: 2,
    borderColor: Colours.secondary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  computers_guess_output: {
    color: Colours.secondary,
    fontSize: 22
  },
  guess_list_container: {
    width: "80%",
    flex: 1
  },
  guess_list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  guess_list_item: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default GameScreen;
