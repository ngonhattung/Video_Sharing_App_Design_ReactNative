import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setHideTabBar } from "../redux/tabBarSlice";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/interfaces";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, setDoc } from "firebase/firestore";
type SignInNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;
const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<SignInNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const signUp = async () => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      alert("User registered and data saved successfully.");
      // Lưu thêm dữ liệu của người dùng vào Firestore
      await setDoc(doc(collection(db, "users"), userId), {
        email: email,
        videos: [], // Initialize with an empty video list
      });
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
      alert("Register failed");
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
          onPress={signUp}
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
          <Text style={{ color: "white", fontSize: 18 }}>Create User</Text>
        </TouchableOpacity>
      )}
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
export default RegisterScreen;
