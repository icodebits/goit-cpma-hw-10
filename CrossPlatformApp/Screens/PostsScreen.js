import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/reducers/postsSlice";
import { getPosts } from "../utils/firestore";
const avatarImage = require("../assets/images/avatar.jpg");
const mapPinIcon = require("../assets/icons/map-pin.png");
const messageIcon = require("../assets/icons/message-circle.png");

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await getPosts(user.uid).then((posts) => {
          dispatch(setPosts(posts));
        })
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={avatarImage} style={styles.avatarImage} />
        <View style={styles.userData}>
          <Text style={styles.userName}>{ user.displayName }</Text>
          <Text style={styles.userEmail}>{ user.email }</Text>
        </View>
      </View>
      {posts && (
        <View style={styles.postList}>
        {loading && <Text>Loading...</Text>}
        <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Image source={{ uri: item.photo }} style={styles.postImage} />
            <Text style={styles.postTitle}>{item.title}</Text>
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
                  navigation.navigate("Map", { latitude: item.latitude, longitude: item.longitude });
                }}>
                  <Text style={styles.locationText}>{item.location}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  postList: {
    flex: 1,
    width: "100%",
  },
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
