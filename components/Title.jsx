import React from "react";
import { StyleSheet, Text } from "react-native";

function Title({ customStyles = {}, children }) {
  return <Text style={[styles.title, customStyles]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    height: 36,
    fontFamily: "Roboto-500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
  },
});
export default Title;
