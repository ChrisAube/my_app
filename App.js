import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "./assets/logo.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height: 159 }} />
      <Image
        source={{ uri: "https://placedog.net/300/280" }}
        style={{ width: 300, height: 280 }}
      />

      <Text style={{ color: "#fff", fontSize: 18 }}>
        mobile app development
      </Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={{ backgroundColor: "blue" }}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Pick a photo</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "#3ea0ad",
    alignItems: "center",
    justifyContent: "center",
  },
});
