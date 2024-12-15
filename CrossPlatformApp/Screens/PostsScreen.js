import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
const avatarImage = require("../assets/images/avatar.jpg");
const mapPinIcon = require("../assets/icons/map-pin.png");
const messageIcon = require("../assets/icons/message-circle.png");

const PostsScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.userInfo);
  const { photo, location, title, position } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={avatarImage} style={styles.avatarImage} />
        <View style={styles.userData}>
          <Text style={styles.userName}>{ user.displayName }</Text>
          <Text style={styles.userEmail}>{ user.email }</Text>
        </View>
      </View>
      {photo && (
        <View style={styles.postCard}>
          <Image source={{ uri: photo }} style={styles.postImage} />
          <Text style={styles.postTitle}>{title}</Text>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Comments");
            }} style={styles.messageContainer}>
              <Image source={messageIcon} style={styles.messageIcon} />
              <Text style={styles.messageCounter}>0</Text>
            </TouchableOpacity>
            <View style={styles.locationContainer}>
              <Image source={mapPinIcon} style={styles.mapPinIcon} />
              <TouchableOpacity onPress={() => {
                navigation.navigate("Map", { latitude: location.latitude, longitude: location.longitude });
              }}>
                <Text style={styles.locationText}>{position}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
  },
  userInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
  },
  userData: {
    flexDirection: "column",
    marginLeft: 8,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 15,
    color: "#212121",
  },

  postCard: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 32,
  },
  postImage: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 8,
  },
  mapPinIcon: {
    width: 24,
    height: 24,
  },
  messageIcon: {
    width: 24,
    height: 24,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  messageCounter: {
    fontSize: 16,
    color: "#BDBDBD",
    marginLeft: 5,
    fontWeight: "500",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default PostsScreen;
