import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreatePosts")}>
        <Text>Create a Post</Text>
      </TouchableOpacity>
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

export default MapScreen;
