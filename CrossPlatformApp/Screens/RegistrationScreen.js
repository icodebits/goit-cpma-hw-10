import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
const backgroundImage = require("../assets/images/background.png");
const addIcon = require("../assets/images/add.png");

const RegistrationScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError("Введіть дійсну адресу електронної пошти");
    } else {
      setEmailError("");
      console.log("Form submitted with email:", email);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <View style={styles.formContainer}>
          <View style={styles.profileContainer}>
            <TouchableOpacity style={styles.addPhotoButton}>
              <Image source={addIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput
            placeholder="Логін"
            style={styles.input}
            placeholderTextColor="#BDBDBD"
          />
          <TextInput
            placeholder="Адреса електронної пошти"
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholderTextColor="#BDBDBD"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(""); // Clear error while typing
            }}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Пароль"
              style={styles.input}
              placeholderTextColor="#BDBDBD"
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.showPassword}
            >
              <Text style={styles.showPasswordText}>{passwordVisible ? "Сховати" : "Показати"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleFormSubmit}>
            <Text style={styles.registerButtonText}>Зареєструватися</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.loginLink}>
              Вже є акаунт? Увійти
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 580,
    top: 135,
  },
  profileContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    marginTop: -80,
    marginBottom: 32,
  },
  addPhotoButton: {
    position: "absolute",
    top: 80,
    right: -12,
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 32,

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
  registerButton: {
    backgroundColor: "#FF6C00",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 43,
    width: "100%",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  loginLink: {
    marginTop: 10,
    color: "#1B4371",
    textDecorationLine: "none",
    fontSize: 16,
    fontWeight: "400",
  },
});

export default RegistrationScreen;