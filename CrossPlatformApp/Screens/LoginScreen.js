import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Platform,
  Alert
} from "react-native";
import { loginDB } from "../utils/auth";
import { useDispatch } from "react-redux";

const backgroundImage = require("../assets/images/background.png");

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async () => {
    let noEmailErrors, noPasswordErrors = false;
    if (!email) {
      setEmailError("Введіть адресу електронної пошти");
    } else if (!validateEmail(email)) {
      setEmailError("Введіть дійсну адресу електронної пошти");
    } else {
      noEmailErrors = true;
      setEmailError("");
    }
    
    if (!password) {
      setPasswordError("Введіть пароль");
    } else {
      noPasswordErrors = true;
      setPasswordError("");
    }

    if (noEmailErrors === true && noPasswordErrors === true) {
      console.log("Form submitted with email:", email);
      console.log("Form submitted with password:", password);
      

      try {
        await loginDB({ email, password }, dispatch);
        Keyboard.dismiss();
        navigation.navigate("Home");
      } catch (err) {
        Alert.alert('err')
        console.error('Login error:', err); // Логування помилок
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
            source={backgroundImage}
            style={styles.backgroundImage}
        >
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? 'padding' : 'height'}>
              <View style={styles.formContainer}>
                <Text style={styles.title}>Увійти</Text>

                <TextInput
                    placeholder="Адреса електронної пошти"
                    style={[styles.input, emailError ? styles.inputError : null]}
                    placeholderTextColor="#BDBDBD"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setEmailError("");
                    }}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Пароль"
                    style={[styles.input, passwordError ? styles.inputError : null]}
                    placeholderTextColor="#BDBDBD"
                    autoCapitalize="none"
                    secureTextEntry={!passwordVisible}
                    onChangeText={(text) => {
                      setPassword(text);
                      setPasswordError("");
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.showPassword}
                  >
                    <Text style={styles.showPasswordText}>{passwordVisible ? "Сховати" : "Показати"}</Text>
                  </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                <TouchableOpacity style={styles.loginButton} onPress={handleFormSubmit}>
                    <Text style={styles.loginButtonText}>Увійти</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                    <Text style={styles.registerText}>Немає акаунту? <Text style={styles.registerLink}>Зареєструватися</Text></Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    alignItems: "center",
    height: 520,
    top: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: 500,
    marginTop: 20,
    marginBottom: 25,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    fontWeight: "400",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  showPassword: {
    position: "absolute",
    right: 15,
    top: 15,
    fontSize: 16,
    fontWeight: "400",
    color: "#1B4371",
  },
  showPasswordText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#1B4371",
  },
  loginButton: {
    backgroundColor: "#FF6C00",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 32,
    width: "100%",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  registerText: {
    marginTop: 16,
    color: "#1B4371",
    textDecorationLine: "none",
    fontSize: 16,
    fontWeight: "400",
  },
  registerLink: {
    color: "#1B4371",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
