import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";

import { commonStyles } from "./commonStyles";

function RegistrationLink({ children }) {
  return (
    <Pressable>
      <Text style={[commonStyles.fonts, styles.text]}>{`Зареєструватися`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#1B4371",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
});
export default RegistrationLink;
