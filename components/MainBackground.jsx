import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

import Mountains from "../assets/images/mountains.png";

function MainBackground({ children }) {
  return (
    <ImageBackground source={Mountains} style={styles.background}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});
export default MainBackground;
