import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CreatePostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Create Posts Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostsScreen;
