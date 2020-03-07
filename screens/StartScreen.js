import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Colours from "../constants/colours";
import CustomButton from "../components/CustomButton";

const StartScreen = props => {
  const [user_input, set_user_input] = useState("");
  const [user_confirmation, set_user_confirmation] = useState(false);
  const [selected_number, set_selected_number] = useState();

  const handle_user_input = user_input => {
    // validate user input
    set_user_input(user_input.replace(/[^0-9]/g, ""));
  };

  const handle_reset = () => {
    set_user_input("");
    set_user_confirmation(false);
  };

  const handle_user_confirmation = () => {
    let selected_number_validation = parseInt(user_input);

    if (
      isNaN(selected_number_validation) ||
      selected_number_validation <= 0 ||
      selected_number_validation > 99
    ) {
      Alert.alert("Invalid Number", "Number must be between 1 and 99", [
        { text: "OK", style: "destructive", onPress: handle_reset }
      ]);
      return;
    }
    set_user_confirmation(true);
    set_selected_number(selected_number_validation);
    set_user_input("");
    Keyboard.dismiss();
  };

  let confirmation_output;

  if (user_confirmation) {
    confirmation_output = (
      <Card style={styles.summary_card}>
        <BodyText>You Selected</BodyText>
        <View style={styles.selected_number_container}>
          <BodyText style={styles.selected_number_output}>
            {selected_number}
          </BodyText>
        </View>
        <CustomButton onPress={() => props.handle_start_game(selected_number)}>
          Start Game
        </CustomButton>
      </Card>
    );
  }

  return (
    // Closes keyboard with unfocused tap
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.start_screen_container}>
        <BodyText style={styles.start_screen_title}>Start a New Game</BodyText>
        <Card style={styles.input_card}>
          <BodyText style={styles.select_a_number}>Select a Number</BodyText>
          <View>
            <TextInput
              style={styles.user_input}
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              // Prevents decimal numbers on IOS
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={handle_user_input}
              value={user_input}
            />
          </View>
          <View style={styles.button_container}>
            <View style={styles.start_screen_btn}>
              <Button
                title="Reset"
                color={Colours.secondary}
                onPress={handle_reset}
              />
            </View>
            <View style={styles.start_screen_btn}>
              <Button
                title="Confirm"
                color={Colours.primary}
                onPress={handle_user_confirmation}
              />
            </View>
          </View>
        </Card>
        {confirmation_output}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  start_screen_container: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  start_screen_title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold"
  },
  input_card: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  button_container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  start_screen_btn: {
    width: 100
  },
  user_input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 25,
    width: 50,
    textAlign: "center"
  },
  summary_card: {
    marginTop: 20,
    alignItems: "center"
  },
  selected_number_container: {
    borderWidth: 2,
    borderColor: Colours.secondary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  selected_number_output: {
    color: Colours.secondary,
    fontSize: 22
  },
  select_a_number: {
    fontFamily: "open-sans-bold"
  }
});

export default StartScreen;
