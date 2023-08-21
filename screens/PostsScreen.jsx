import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Avatar from "../components/Avatar";

export default function PostsScreen() {
  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.container}>
        <View style={styles.posts}>
          <View style={styles.avatarWrapper}>
            <Avatar customStyles={{ width: 60, height: 60, marginRight: 8 }} />
            <View>
              <Text>{`user.login`}</Text>
              <Text>{`user.email`}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    width: "100%",
    marginTop: 4,
    paddingLeft: 16,
    paddingRight: 16,
  },
  avatarWrapper: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  posts: { flex: 1, width: "100%" },
});
