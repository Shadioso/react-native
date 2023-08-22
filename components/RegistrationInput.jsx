import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { commonStyles } from "./commonStyles";

function RegistrationInput({
  name,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
}) {
  return (
    <TextInput
      name={name}
      value={value}
      style={[styles.input, commonStyles.fonts]}
      placeholder={placeholder}
      placeholderTextColor="#BDBDBD"
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
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
