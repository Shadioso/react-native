import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";

import { persistor, store } from "./redux/store";

import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import Home from "./screens/Home";
import CommentsScreen from "./screens/CommentsScreen";
import { Octicons } from "@expo/vector-icons";
import { commonStyles } from "./components/commonStyles";
import PostCard from "./components/PostCard";
import MapScreen from "./screens/MapScreen";
import { PersistGate } from "redux-persist/integration/react";
import CreateAvatar from "./screens/CreateAvatar";

import { auth } from "./config";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
  });
  const [initialRoute, setInitialRoute] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setInitialRoute(user ? "Home" : "Login");
    });
  }, []);
  if (!fontsLoaded) {
    return null;
  }
  const MainStack = createStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {initialRoute && (
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
                name="PostCard"
                component={PostCard}
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
              <MainStack.Screen
                name="CreateAvatar"
                component={CreateAvatar}
                options={({ navigation }) => ({
                  title: "Створення фото користувача",
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
                      onPress={() => navigation.navigate("Profile")}
                    />
                  ),
                })}
              />
            </MainStack.Navigator>
          </NavigationContainer>
        )}
      </PersistGate>
    </Provider>
  );
}
