import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import PostsScreen from "./screens/PostsScreen";
import Home from "./screens/Home";
import MapScreen from "./screens/MapScreen";
import CommentsScreen from "./screens/CommentsScreen";
import { Octicons } from "@expo/vector-icons";
import { commonStyles } from "./components/commonStyles";
export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const MainStack = createStackNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName={initialRoute}>
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          <MainStack.Screen
            name="Map"
            component={MapScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
            options={({ navigation }) => ({
              title: "Коментарі",
              headerTitleAlign: "center",
              headerLeft: () => (
                <Octicons
                  name="arrow-left"
                  size={24}
                  color={commonStyles.vars.colorText}
                  style={{
                    marginLeft: 16,
                    padding: 5,
                  }}
                  onPress={() => navigation.navigate("Posts")}
                />
              ),
            })}
          />
        </MainStack.Navigator>
      </NavigationContainer>
      ;
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    // alignItems: "center",
    justifyContent: "center",
  },
});
