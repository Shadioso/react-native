import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Octicons, Feather } from "@expo/vector-icons";
import { commonStyles } from "../components/commonStyles";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();
const Home = ({ navigation }) => {
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Posts") {
            iconName = "grid";
          } else if (route.name === "CreatePost") {
            iconName = "plus";
          } else if (route.name === "Profile") {
            iconName = "user";
          }
          return (
            <View
              style={
                focused ? styles.buttonWrapperActive : styles.buttonWrapper
              }
            >
              <Feather
                name={iconName}
                size={24}
                color={focused ? commonStyles.vars.colorWhite : "#616161"}
              />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: commonStyles.vars.colorWhite,
        tabBarInactiveTintColor: "#616161",
        tabBarStyle: {
          height: 83,
          paddingBottom: 9,
        },
        headerTitleAlign: "center",
        headerTintColor: commonStyles.vars.colorText,
        headerTitleStyle: {
          fontFamily: "Roboto-500",
          fontSize: 17,
          lineHeight: 22,
          textAlign: "center",
        },
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={({ navigation }) => ({
          title: "Публікації",
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color={commonStyles.vars.colorGray}
              style={{ marginRight: 16, padding: 5 }}
            />
          ),
        })}
      />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          headerLeft: () => (
            <Octicons
              name="arrow-left"
              size={24}
              color={commonStyles.vars.colorGray}
              style={{ marginLeft: 16, padding: 5 }}
              onPress={() => navigation.navigate("Posts")}
            />
          ),
          tabBarStyle: {
            display: "none",
          },
        })}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonWrapperActive: {
    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: commonStyles.vars.colorAccent,
  },
  buttonWrapper: {
    backgroundColor: commonStyles.vars.colorWhite,
  },
});

export default Home;
