import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { commonStyles } from "../components/commonStyles";
import backgroundPhoto from "../assets/images/background-photo.png";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import HeroButton from "../components/HeroButton";


function CreatePostsScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type] = useState(Camera.Constants.Type.back);

  const [cameraPhoto, setCameraPhoto] = useState(null);
  const [title, setTitle] = useState(null);
  const [place, setPlace] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  const stylesForHeroButton =
    title && place && cameraPhoto
      ? {
          backgroundColor: commonStyles.vars.colorAccent,
          color: commonStyles.vars.colorWhite,
        }
      : { backgroundColor: "#F6F6F6", color: commonStyles.vars.colorGray };

  const handlePressPublicationButton = async () => {
    //get status of location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingViewStyles}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.cameraWrapper}>
            {hasPermission ? (
              !cameraPhoto ? (
                <View style={styles.backgroundCamera}>
                  <Camera
                    style={styles.backgroundCamera}
                    type={type}
                    ref={setCameraRef}
                  >
                    <View style={styles.buttonPhoto}>
                      <MaterialCommunityIcons
                        name="camera"
                        size={24}
                        color={commonStyles.vars.colorGray}
                        onPress={async () => {
                          if (cameraRef) {
                            const { uri } = await cameraRef.takePictureAsync();
                            await MediaLibrary.createAssetAsync(uri);
                            setCameraPhoto(uri);
                          }
                        }}
                      />
                    </View>
                  </Camera>
                </View>
              ) : (
                <ImageBackground
                  style={styles.backgroundCamera}
                  source={{ uri: cameraPhoto }}
                >
                  <View
                    style={[
                      styles.buttonPhoto,
                      { backgroundColor: "rgba(255, 255, 255,0.3)" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="camera"
                      size={24}
                      color={commonStyles.vars.colorWhite}
                      onPress={() => {
                        setCameraPhoto(null);
                      }}
                    />
                  </View>
                </ImageBackground>
              )
            ) : (
              <ImageBackground
                source={backgroundPhoto}
                style={styles.backgroundCamera}
              >
                <Text>No access to camera</Text>
              </ImageBackground>
            )}
            {!cameraPhoto ? (
              <Text style={styles.text}>Завантажте фото</Text>
            ) : (
              <Text style={styles.text}>Редагувати фото</Text>
            )}
          </View>
          <View style={{ marginTop: 32, marginBottom: 16 }}>
            <TextInput
              placeholder="Назва..."
              placeholderTextColor={commonStyles.vars.colorGray}
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
            <Feather
              name="map-pin"
              size={24}
              color={commonStyles.vars.colorGray}
              style={styles.mapPin}
            />
            <TextInput
              placeholder="Місцевість.."
              placeholderTextColor={commonStyles.vars.colorGray}
              style={[styles.input, { paddingLeft: 28 }]}
              value={place}
              onChangeText={setPlace}
            />
          </View>
          <HeroButton
            style={{
              marginTop: 0,
              marginBottom: "auto",
              ...stylesForHeroButton,
            }}
            onPress={() =>
              title && place && cameraPhoto && handlePressPublicationButton()
            }
          >
            Опублікувати
          </HeroButton>
          <View style={styles.buttonWrapper}>
            <Feather
              name="trash-2"
              size={24}
              color={commonStyles.vars.colorGray}
              onPress={() => {
                setTitle(null);
                setPlace(null);
                setCameraPhoto(null);
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    color: commonStyles.vars.colorText,
    backgroundColor: commonStyles.vars.colorWhite,
  },
  keyboardAvoidingViewStyles: {
    flex: 1,
  },
  cameraWrapper: { width: "100%", height: 267 },

  backgroundCamera: {
    width: "100%",
    height: 240,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    resizeMode: "cover",
    borderRadius: 8,
  },
  buttonPhoto: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: commonStyles.vars.colorWhite,
  },
  text: {
    ...commonStyles.fonts,
    marginTop: 8,
    color: commonStyles.vars.colorGray,
    height: 19,
  },
  input: {
    ...commonStyles.fonts,
    height: 50,
    marginBottom: 16,
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: commonStyles.vars.colorGray,
  },
  mapPin: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: [{ translateY: 8 }],
  },
  buttonWrapper: {
    width: 70,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});

export default CreatePostsScreen;
