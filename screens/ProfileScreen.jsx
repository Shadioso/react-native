import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StyleSheet, View, ScrollView } from "react-native";
import MainBackground from "../components/MainBackground";
import AvatarWrapper from "../components/AvatarWrapper";
import Title from "../components/Title";
import { Feather } from "@expo/vector-icons";
import PostCard from "../components/PostCard";
import { commonStyles } from "../components/commonStyles";
import { selectUser } from "../redux/auth/selectors";
import { logOut, updateUserData } from "../redux/auth/operations";
import AnimatedLoader from "react-native-animated-loader";

import { selectIsLoading, selectPosts } from "../redux/posts/selectors";
import { fetchPosts } from "../redux/posts/operations";
import { signOut } from "firebase/auth";
import { auth } from "../config";

function ProfileScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  let photo = user.photo;
  if (route.params?.photo) {
    photo = route.params?.photo;
  }

  useEffect(() => {
    if (photo !== user.photo) {
      dispatch(updateUserData({ ...user, photo }));
    }
  }, [dispatch, photo]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector(selectPosts).filter(
    (item) => item.idUser === user.id
  );

  const isLoading = useSelector(selectIsLoading);
  return isLoading ? (
    <AnimatedLoader
      source={require("../assets/loader/98195-loader.json")}
      visible={true}
      overlayColor="rgba(255,255,255,0.75)"
      speed={1}
      style={{ flex: 1 }}
    />
  ) : (
    <MainBackground>
      <ScrollView>
        <View style={styles.background}>
          <AvatarWrapper
            photo={user.photo}
            customStyles={{
              top: -60,
              left: "50%",
              transform: [{ translateX: -50 }],
            }}
            add={false}
          />
          <Feather
            name="log-out"
            size={24}
            color={commonStyles.vars.colorGray}
            style={styles.logOut}
            onPress={async () => {
              try {
                await signOut(auth);
                logOut();
                navigation.navigate("Login");
              } catch (error) {
                console.log(error);
              }
            }}
          />
          <Title
            customStyles={{
              marginTop: 92,
              marginBottom: 32,
            }}
          >
            {user.login}
          </Title>
          <View style={{ flex: 1 }}>
            {posts.map((item) => (
              <PostCard key={item.id} data={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </MainBackground>
  );
}

const styles = StyleSheet.create({
  logOut: {
    position: "absolute",
    top: 22,
    right: 16,
    padding: 5,
  },
  background: {
    marginTop: 147,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: commonStyles.vars.colorWhite,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
export default ProfileScreen;
