import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const gridIcon = require("../assets/icons/grid.png");
const addIcon = require("../assets/icons/add.png");
const profileIcon = require("../assets/icons/user.png");
const logOutIcon = require("../assets/icons/log-out.png");
const arrowLeftIcon = require("../assets/icons/arrow-left.png");

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 83,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          paddingVertical: 5
        },
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#000",
        headerStyle: { backgroundColor: "#fff" },
        headerTitleAlign: "center",
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: "Публікації",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <View style={[styles.headerRightIcon]}>
                    <Image source={logOutIcon} style={styles.logOutIcon} />
                </View>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.bottomBarTab, styles.leftIcon]}>
                <Image source={gridIcon} style={styles.gridIcon} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen} 
        options={{
          tabBarStyle: { display: "none" },
          headerTitle: "Створити публікацію",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Posts' })}>
                <View style={[styles.headerLeftIcon]}>
                    <Image source={arrowLeftIcon} style={styles.arrowLeftIcon} />
                </View>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.bottomBarTab, styles.bottomBarTabActive]}>
                <Image source={addIcon} style={styles.addIcon} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Профіль",
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.bottomBarTab, styles.rightIcon]}>
                <Image source={profileIcon} style={styles.profileIcon} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomBarTab: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 70,
        height: 40,
        marginTop: 20,
    },
    bottomBarTabActive: {
        backgroundColor: "#FF6C00",
    },
    addIcon: {
        width: 13,
        height: 13,
    },
    gridIcon: {
        width: 24,
        height: 24,
    },
    profileIcon: {
        width: 24,
        height: 24,
    },
    logOutIcon: {
        width: 24,
        height: 24,
    },
    arrowLeftIcon: {
        width: 24,
        height: 24,
    },
    leftIcon: {
        marginLeft: 90,
    },
    rightIcon: {
        marginRight: 90,
    },
    headerRightIcon: {
        marginRight: 10,
    },
    headerLeftIcon: {
        marginLeft: 10,
    },
});

export default Home;