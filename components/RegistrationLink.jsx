import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { commonStyles } from "./commonStyles";

function RegistrationLink({ children }) {
  const navigation = useNavigation();
  const handlePress = () => {
    if (children === "Зареєструватися") {
      navigation.navigate("Registration");
    } else if (children === "Увійти") {
      navigation.navigate("Login");
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Text style={[commonStyles.fonts, styles.text]}>{children}</Text>
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
