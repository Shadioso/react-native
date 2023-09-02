import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { commonStyles } from "./commonStyles";

function HeroButton({ style, onPress = {}, children }) {
  const { color, ...otherStyles } = style;
  return (
    <Pressable style={[styles.button, otherStyles]} onPress={onPress}>
      <Text style={[commonStyles.fonts, styles.buttonText, { color }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 51,
    padding: 16,
    borderRadius: 100,
  },
  buttonText: {
    textAlign: "center",
  },
});
export default HeroButton;
