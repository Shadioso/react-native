import React from "react";
import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { commonStyles } from "./commonStyles";

import { addLike } from "../redux/posts/operations";
import { selectUser } from "../redux/auth/selectors";

function PostCard({
  data: { id, photo, title, place, coords, likes, comments, idUser },
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.foto} />
      <Text style={styles.title}>{title}</Text>

      <View style={styles.postDataContainer}>
        <Feather
          name="message-circle"
          size={24}
          color={commonStyles.vars.colorAccent}
          style={{ marginRight: 6 }}
          onPress={() => {
            navigation.navigate("Comments", { idPost: id, photo });
          }}
        />
        <Text style={[styles.text, { marginRight: 24 }]}>
          {comments.length}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Feather
            name="thumbs-up"
            size={24}
            color={commonStyles.vars.colorAccent}
            style={{ marginRight: 6 }}
            onPress={() => {
              if (user.id !== idUser) {
                dispatch(addLike({ idPost: id, idUser: user.id }));
              }
            }}
          />
          <Text>{likes.length}</Text>
        </View>

        <Feather
          name="map-pin"
          size={24}
          color={commonStyles.vars.colorGray}
          style={{ marginLeft: "auto", marginRight: 4 }}
          onPress={() => {
            navigation.navigate("Map", { title, place, coords });
          }}
        />
        <Text
          style={[
            styles.text,
            { textDecorationLine: "underline", textDecorationStyle: "solid" },
          ]}
        >
          {place}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 299,
    marginBottom: 32,
    color: commonStyles.vars.colorText,
    backgroundColor: commonStyles.vars.colorWhite,
  },
  foto: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    resizeMode: "cover",
    backgroundColor: commonStyles.vars.colorGray,
  },
  title: {
    marginBottom: 8,
    ...commonStyles.fonts,
    fontFamily: "Roboto-500",
  },
  postDataContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  text: { ...commonStyles.fonts },
});

export default PostCard;
