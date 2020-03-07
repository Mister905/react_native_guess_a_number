import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colours from "../constants/colours";

const CustomButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.custom_btn}>
        <Text style={styles.custom_btn_text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  custom_btn: {
    backgroundColor: Colours.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  custom_btn_text: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18
  }
});

export default CustomButton;
