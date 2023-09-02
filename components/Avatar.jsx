import React from "react";
import { StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

import { selectUser } from "../redux/auth/selectors";

function Avatar({ customStyles = {}, photo = null }) {
  const user = useSelector(selectUser);

  if (user.photo && photo === null) {
    photo = user.photo;
  }
  return (
    <Image
      source={{ uri: photo }}
      style={[styles.avatar, customStyles]}
    ></Image>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
});
export default Avatar;
