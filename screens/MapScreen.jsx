import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

import AnimatedLoader from "react-native-animated-loader";
import { selectIsLoading } from "../redux/posts/selectors";

const MapScreen = ({ route }) => {
  const { title, place, coords } = route.params;

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
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {coords && (
          <Marker title={title} coordinate={coords} description={place} />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
