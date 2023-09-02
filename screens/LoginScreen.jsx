import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Alert,
} from "react-native";
import { useState } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { logIn } from "../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} from "../redux/auth/selectors";

import Title from "../components/Title";
import RegistrationInput from "../components/RegistrationInput";
import HeroButton from "../components/HeroButton";
import RegistrationLink from "../components/RegistrationLink";
import MainBackground from "../components/MainBackground";
import { commonStyles } from "../components/commonStyles";
import AnimatedLoader from "react-native-animated-loader";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePressShowButton = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = () => {
    if (email === "" || password === "") {
      return Alert.alert(
        "Не коректні дані",
        "Будь ласка, заповніть всі поля непустими даними"
      );
    } else {
      dispatch(logIn({ email, password })).then((res) => {
        if (res.type === "auth/login/fulfilled") {
          setEmail("");
          setPassword("");
          navigation.navigate("Home");
        } else {
          return Alert.alert(
            "Помилка входу",
            `Будь ласка, заповніть всі поля коректними даними. Опис помилки із сервера: ${res.payload}`
          );
        }
      });
    }
  };

  const isRefreshing = useSelector(selectIsRefreshing);
  return isRefreshing ? (
    <AnimatedLoader
      source={require("../assets/loader/98195-loader.json")}
      visible={true}
      overlayColor="rgba(255,255,255,0.75)"
      speed={1}
      style={{ flex: 1 }}
    />
  ) : (
    <MainBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewStyles}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
            <View style={styles.form}>
              <Title
                customStyles={{
                  marginTop: 92,
                  marginBottom: 12,
                }}
              >
                Увійти
              </Title>
              <RegistrationInput
                name="email"
                value={email}
                placeholder="Адреса електронної пошти"
                keyboardType={"email-address"}
                onChangeText={setEmail}
              />
              <View>
                <RegistrationInput
                  name="password"
                  value={password}
                  placeholder="Пароль"
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                ></RegistrationInput>
                <Pressable
                  style={styles.showButton}
                  onPress={handlePressShowButton}
                >
                  <Text style={styles.showButtonText}>
                    {!showPassword ? "Показати" : "Приховати"}
                  </Text>
                </Pressable>
              </View>
            </View>
            <HeroButton
              style={{
                marginTop: 43,
                marginLeft: 16,
                marginRight: 16,
                backgroundColor: commonStyles.vars.colorAccent,
                color: commonStyles.vars.colorWhite,
              }}
              onPress={handleLogin}
            >
              Увійти
            </HeroButton>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>Немає акаунту? </Text>
              <RegistrationLink>Зареєструватися</RegistrationLink>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </MainBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 549,
    color: commonStyles.vars.colorText,
    backgroundColor: commonStyles.vars.colorWhite,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "space-between",
    gap: 16,
  },
  keyboardAvoidingViewStyles: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  showButton: {
    position: "absolute",
    top: "50%",
    right: 16,
    transform: [{ translateY: -8 }],
  },
  showButtonText: { ...commonStyles.fonts, color: "#1B4371" },
  textWrapper: {
    flexDirection: "row",
    height: 19,
    marginTop: 16,
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    ...commonStyles.fonts,
    color: "#1B4371",
  },
});

export default LoginScreen;
