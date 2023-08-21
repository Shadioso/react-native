import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { commonStyles } from "./commonStyles";

function RegistrationInput({ placeholder, keyboardType = "default" }) {
  return (
    <TextInput
      name={`name`}
      value={`value`}
      style={[styles.input, commonStyles.fonts]}
      placeholder={`placeholder`}
      placeholderTextColor="#BDBDBD"
      keyboardType={keyboardType}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    color: commonStyles.vars.colorText,
  },
});
export default RegistrationInput;
