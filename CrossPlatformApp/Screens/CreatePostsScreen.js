import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
const cameraIcon = require("../assets/icons/camera.png");
const trashIcon = require("../assets/icons/trash.png");
const mapPinIcon = require("../assets/icons/map-pin.png");

const CreatePostsScreen = ({ navigation }) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const [libraryPermission, requestLibraryPermission] = MediaLibrary.usePermissions();
  const camera = useRef();

  const [cameraMessage, setCameraMessage] = useState();
  const [location, setLocation] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postLocation, setPostLocation] = useState("");
  
  useEffect(() => {
    if (photoUri) {
      setCameraMessage("Редагувати фото");
    } else {
      setCameraMessage("Завантажте фото");
    }
  }, [photoUri]);
  
  // Request Camera and Location Permissions
  useEffect(() => {
    (async () => {
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Location access is needed to create posts with geolocation."
        );
      }
    })();
  }, []);

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    if (!camera) return;

    if (!libraryPermission.granted) {
      requestLibraryPermission();
    }

    const image = await camera?.current?.takePictureAsync();
    setPhotoUri(image.uri);
    await MediaLibrary.saveToLibraryAsync(image.uri);
  }
  
  const handlePublish = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      /*console.log("Post Title:", postTitle);
      console.log("Post Location:", postLocation);
      console.log("Photo URI:", photoUri);
      console.log("Geolocation:", location.coords);

      Alert.alert(
        "Post Created",
        `Your post has been created with the following details:
        Title: ${postTitle}
        Location: ${postLocation}
        Latitude: ${location.coords.latitude}
        Longitude: ${location.coords.longitude}`
      );*/

      // Reset form
      setPhotoUri(null);
      setPostTitle("");
      setPostLocation("");

      navigation.navigate('Home', {
        screen: 'Posts',
        params: { photo: photoUri, location: location.coords, title: postTitle, position: postLocation }
      });
    } catch (error) {
      Alert.alert("Error", "Failed to fetch geolocation. Ensure location services are enabled.");
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.cameraBlockWrapper}>
        <View style={styles.cameraBlock}>
          {!photoUri ? (
            <CameraView
              style={styles.camera}
              ref={camera}
            >
              <View style={styles.cameraControls}>
                <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                  <Image source={cameraIcon} style={styles.cameraIcon} />
                </TouchableOpacity>
              </View>
            </CameraView>
          ) : (
            <View>
              <Image source={{ uri: photoUri }} style={styles.photoPreview} />
            </View>
          )}
        </View>
        <Text style={styles.message}>{cameraMessage}</Text>
      
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          placeholderTextColor="#bdbdbd"
          value={postTitle}
          onChangeText={(text) => setPostTitle(text)}
        />
      
        <View style={styles.inputWrapper}>
          <Image source={mapPinIcon} style={styles.mapPinIcon} />
          <TextInput
            style={[styles.input, { paddingLeft: 30 }]}
            placeholder="Місцевість..."
            placeholderTextColor="#bdbdbd"
            value={postLocation}
            onChangeText={(text) => setPostLocation(text)}
          />
        </View>

        <TouchableOpacity
          style={[styles.publishButton, (photoUri ? styles.publishButtonActive : styles.publishButtonInactive)]}
          onPress={handlePublish}>
          <Text style={[styles.publishButtonText, ( photoUri ? styles.publishButtonTextActive : styles.publishButtonTextInactive )]}>Опубліковати</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={() => { setPhotoUri(null); setPostTitle(""); setPostLocation(""); setLocation(null); }}>
        <Image source={trashIcon} style={styles.trashIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cameraBlockWrapper: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
  },
  cameraBlock: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "top",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraControls: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  cameraControlsPreview: {
    zIndex: 1,
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 32,
    marginTop: 8,
  },
  photoPreview: {
    width: "auto",
    height: "100%",
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    paddingLeft: 0,
    backgroundColor: "#fff",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  publishButton: {
    width: "100%",
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  publishButtonActive: {
    backgroundColor: "#FF6C00",
  },
  publishButtonInactive: {
    backgroundColor: "#F6F6F6",
  },
  publishButtonText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: "400",
  },
  publishButtonTextActive: {
    color: "#FFFFFF",
  },
  publishButtonTextInactive: {
    color: "#BDBDBD",
  },
  deleteButton: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
    width: 70,
    height: 40,
  },
  cameraIcon: {
    width: 24,
    height: 24,
  },
  trashIcon: {
    width: 24,
    height: 24,
  },
  mapPinIcon: {
    position: "absolute",
    top: 12,
    width: 24,
    height: 24,
    zIndex: 1,
  },
});

export default CreatePostsScreen;
