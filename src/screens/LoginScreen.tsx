import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHideTabBar } from "../redux/tabBarSlice";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/interfaces";
import { setUserId } from "../redux/authSlice";
type SignUpNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RegisterScreen"
>;
type HomeNavigationProp = StackNavigationProp<RootStackParamList, "HomePage">;
type CombinedNavigationProp = CompositeNavigationProp<
  SignUpNavigationProp,
  HomeNavigationProp
>;
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<CombinedNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const signIn = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      dispatch(setUserId(userId));
      navigation.navigate("HomePage");
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(setHideTabBar(true));
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../assets/Logo.png")}
          style={{ width: 50, height: 50, resizeMode: "contain" }}
        />
        <Text
          style={{
            color: "#F44B87",
            fontSize: 22,
            marginLeft: 10,
            fontWeight: "bold",
          }}
        >
          Sharing Video
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          onPress={signIn}
          style={{
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F44B87",
            marginVertical: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Log In</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("RegisterScreen")}
        style={{
          width: "100%",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E1E7EB",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "black", fontSize: 18 }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  formContainer: {
    marginTop: 20,
    width: "100%",
  },
  textInput: {
    height: 50,
    width: "100%",
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    marginVertical: 10,
  },
});
export default LoginScreen;
