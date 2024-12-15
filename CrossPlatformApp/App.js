import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack"
import { useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";
import MapScreen from "./Screens/MapScreen";
import CommentsScreen from "./Screens/CommentsScreen";

import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store/store';
import { useEffect } from 'react';
import { authStateChanged } from './utils/auth';
const arrowLeftIcon = require("./assets/icons/arrow-left.png");

const Stack = createStackNavigator();

const AuthListener = () => {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    authStateChanged(dispatch);
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Comments"
              component={CommentsScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerTitle: "Коментарі",
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Posts' })}>
                      <View style={[styles.headerLeftIcon]}>
                          <Image source={arrowLeftIcon} style={styles.arrowLeftIcon} />
                      </View>
                  </TouchableOpacity>
                ),
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <AuthListener />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowLeftIcon: {
        width: 24,
        height: 24,
  },
  leftIcon: {
      marginLeft: 90,
  },
  headerLeftIcon: {
      marginLeft: 10,
  },
});
