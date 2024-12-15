import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList } from "react-native";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPost, updatePostInFirestore } from "../utils/firestore";
const arrowLeftIcon = require("../assets/icons/arrow-left.png");
const userIcon = require("../assets/icons/user.png");

const CommentsScreen = ({ navigation, route }) => {
  const { postId } = route.params || {};
  const user = useSelector((state) => state.user.userInfo);
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  //console.log(postId);

  useEffect(() => {
      const fetchPost = async () => {
        try {
          await getPost(user.uid, postId).then((post) => {
            setPost(post);
          })
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
      fetchPost();
    }, []);
  
  //console.log(post);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    // Format the date components
    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();

    // Format the time in 24-hour format
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${day} ${month}, ${year} | ${time}`;
  };

  const handleFormSubmit = async () => {
    if (!user) return;

    try {
      const updatedPost = { ...post };
      const commentObject = {
        author: user.displayName,
        authorId: user.uid,
        text: comment,
        createdAt: new Date().toISOString(),
        id: Date.now().toString(),
      };
      if (!updatedPost.data.comments) {
        updatedPost.data.comments = [];
      }
      updatedPost.data.comments.push(commentObject);
      //console.log('updatedPost:', updatedPost);
      await updatePostInFirestore(user.uid, postId, updatedPost.data);
      setPost(updatedPost);
      setComment("");
    } catch (error) {
      console.error('Error adding comment to Firestore:', error);
    }
  }

  return (
    <View style={styles.container}>
      {post && <>
        <View style={styles.postCard}>
          <Image source={{ uri: post.data.photo }} style={styles.postImage} />
        </View>
        
        <View style={styles.commentList}>
          <FlatList
            data={post.data.comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Image source={userIcon} style={styles.userIcon} />
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentText}>{item.text}</Text>
                  <Text style={styles.commentDate}>{formatDate(item.createdAt)}</Text>
                </View>
              </View>
            )}
            />
        </View>
      </>}

      <View style={styles.commentInputFieldContainer}>
        <TextInput
          placeholder="Коментувати..."
          style={styles.input}
          placeholderTextColor="#BDBDBD"
          autoCapitalize="none"
          value={comment}
          onChangeText={(text) => {
            setComment(text);
          }}
        />
        <TouchableOpacity
          onPress={handleFormSubmit}
          style={styles.showPassword}
        >
          <View style={[styles.inputIconContainer]}>
              <Image source={arrowLeftIcon} style={styles.arrowLeftIcon} />
          </View>
        </TouchableOpacity>
      </View>

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
    paddingTop: 32,
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
  commentList: {
    maxHeight: 350,
    overflow: "hidden"
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  commentTextContainer : {
    width: "100%",
    height: "auto",
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 6,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  commentText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#212121",
    alignContent: "flex-start",
    marginBottom: 8,
  },
  commentDate: {
    fontSize: 10,
    fontWeight: "400",
    color: "#BDBDBD",
    alignSelf: "flex-end",
    marginRight: 35,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    fontWeight: "400",
  },
  commentInputFieldContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 16,
  },
  inputIconContainer: {
    position: "absolute",
    top: -25,
    right: 10,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  arrowLeftIcon: {
    position: "absolute",
    top: 5,
    left: 5,
    width: 24,
    height: 24,
    transform: [{ rotate: "90deg" }],
  },
  userIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  postTitle: {
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
});

export default CommentsScreen;
