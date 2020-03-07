import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colours from "../constants/colours";

const Header = props => {
  return (
    <View style={styles.header_container}>
      <Text style={styles.header_title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Colours.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  header_title: {
    color: "black",
    fontSize: 18
  }
});

export default Header;
