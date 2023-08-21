import { StyleSheet, View, Pressable, Text } from "react-native";
import Title from "../components/Title";
import RegistrationInput from "../components/RegistrationInput";
import HeroButton from "../components/HeroButton";
import RegistrationLink from "../components/RegistrationLink";
import MainBackground from "../components/MainBackground";
import { commonStyles } from "../components/commonStyles";

function RegistrationScreen() {
  return (
    <MainBackground>
      <View style={styles.container}>
        <View style={styles.form}>
          <Title
            customStyles={{
              marginTop: 92,
              marginBottom: 12,
            }}
          >
            Реєстрація
          </Title>
          <RegistrationInput placeholder="Логін" name="login" value={`login`} />
          <RegistrationInput
            name="email"
            value={`email`}
            placeholder="Адреса електронної пошти"
            keyboardType={"email-address"}
          />
          <View>
            <RegistrationInput
              name="password"
              value={`password`}
              placeholder="Пароль"
            ></RegistrationInput>

            <Pressable style={styles.showButton}>
              <Text style={styles.showButtonText}>"Показати"</Text>
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
        >
          Зареєструватися
        </HeroButton>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Вже є акаунт? </Text>
          <RegistrationLink>Увійти</RegistrationLink>
        </View>
      </View>
    </MainBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 549,
    marginTop: 295,
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
  text: { ...commonStyles.fonts, color: "#1B4371" },
});
export default RegistrationScreen;
