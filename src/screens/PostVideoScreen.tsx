import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const PostVideoScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledFB, setIsEnabledFB] = useState(false);
  const [isEnabledX, setIsEnabledX] = useState(false);
  const [isEnabledIG, setIsEnabledIG] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitchFB = () =>
    setIsEnabledFB((previousState) => !previousState);
  const toggleSwitchX = () => setIsEnabledX((previousState) => !previousState);
  const toggleSwitchIG = () =>
    setIsEnabledIG((previousState) => !previousState);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={25} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "700", marginLeft: 20 }}>
            Post on social
          </Text>
        </View>

        <TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "#F44A86" }}>
            Review
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.uploadImgCon}>
          <Image
            source={require("../assets/bgcreate.png")}
            style={{
              width: 200,
              height: 300,
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
          <TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "#F44A86" }}>
              Change cover photo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={{ marginBottom: 20 }}>
            <Text>Title</Text>
            <TextInput
              style={{
                height: 30,
                width: "100%",
                paddingLeft: 15,
                backgroundColor: "#F3F4F6",
                borderRadius: 5,
                marginTop: 5,
              }}
              placeholder="Input title"
              placeholderTextColor="#D1D5DB"
            />
          </View>
          <View>
            <Text>Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={5}
              style={{
                width: "100%",
                paddingLeft: 15,
                backgroundColor: "#F3F4F6",
                borderRadius: 5,
                marginTop: 5,
              }}
              placeholder="Input Description"
              placeholderTextColor="#D1D5DB"
            />
          </View>
        </View>
        <View style={styles.hashtagCon}>
          <Text>Add hashtag</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={{
                height: 30,
                width: "90%",
                paddingLeft: 15,
                backgroundColor: "#F3F4F6",
                borderRadius: 5,
                marginTop: 5,
              }}
              placeholder="Input hashtag"
              placeholderTextColor="#D1D5DB"
            />
            <Icon name="plus" size={25} />
          </View>
        </View>

        <View style={styles.tagPeopleCon}>
          <View>
            <Text>Tag someone</Text>
          </View>
          <Icon name="chevron-right" size={25} />
        </View>

        <View style={styles.isCommentCon}>
          <Text>Comments</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#FDC8DA" }}
            thumbColor={isEnabled ? "#F44B87" : "#f4f3f4"}
            ios_backgroundColor="#767577"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.optionWatchCon}>
          <Text>Who can watch</Text>
        </View>

        <View style={styles.fbCon}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/fb.png")}
              style={{ marginRight: 10 }}
            />
            <Text>Facebook</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#FDC8DA" }}
            thumbColor={isEnabledFB ? "#F44B87" : "#f4f3f4"}
            ios_backgroundColor="#767577"
            onValueChange={toggleSwitchFB}
            value={isEnabledFB}
          />
        </View>

        <View style={styles.xCon}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/x.png")}
              style={{ marginRight: 10 }}
            />
            <Text>Twitter</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#FDC8DA" }}
            thumbColor={isEnabledX ? "#F44B87" : "#f4f3f4"}
            ios_backgroundColor="#767577"
            onValueChange={toggleSwitchX}
            value={isEnabledX}
          />
        </View>

        <View style={styles.igCon}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/ig.png")}
              style={{ marginRight: 10 }}
            />
            <Text>Instagram</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#FDC8DA" }}
            thumbColor={isEnabledIG ? "#F44B87" : "#f4f3f4"}
            ios_backgroundColor="#767577"
            onValueChange={toggleSwitchIG}
            value={isEnabledIG}
          />
        </View>
        <View style={styles.btnCon}>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              width: "45%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#FDC8DA",
              borderRadius: 5,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name="download" size={20} color={"#FDC8DA"} />
              <Text style={{ color: "#FDC8DA", marginLeft: 10, fontSize: 16 }}>
                Save draft
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#F44B87",
              width: "45%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name="paper-plane" size={20} color={"#fff"} />
              <Text style={{ color: "#fff", marginLeft: 10, fontSize: 16 }}>
                Post on social
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  uploadImgCon: {
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  hashtagCon: {
    marginTop: 30,
  },
  tagPeopleCon: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  isCommentCon: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginVertical: 5,
    width: 150,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  optionText: {
    color: "#333",
  },
  optionWatchCon: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fbCon: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xCon: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  igCon: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnCon: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default PostVideoScreen;
