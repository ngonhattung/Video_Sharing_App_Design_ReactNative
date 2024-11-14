import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import * as apiUser from "../api/apiUser";
import { RootStackParamList } from "../types/interfaces";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { setHideTabBar } from "../redux/tabBarSlice";
type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomePage"
>;
const PostVideoScreen = ({ route }: any) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledFB, setIsEnabledFB] = useState(false);
  const [isEnabledX, setIsEnabledX] = useState(false);
  const [isEnabledIG, setIsEnabledIG] = useState(false);
  const [hashtag, setHashtag] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const handleTextChange = (text: any) => {
    if (!text.startsWith("#")) {
      text = `#${text}`;
    }
    setHashtag(text);
  };
  const addHashTags = () => {
    if (hashtag.trim() === "") {
      Alert.alert("Hashtag is empty", "Please input hashtag");
      return;
    }
    setHashtags([...hashtags, hashtag]);
    setHashtag("");
  };
  const removeHashTag = (index: number) => {
    const newHashtags = hashtags.filter((_, i) => i !== index);
    setHashtags(newHashtags);
  };
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const { uriImage, audioName } = route.params || {};

  const options = [
    { key: "All", value: "All" },
    { key: "Only you", value: "Only you" },
    { key: "Friends", value: "Friends" },
  ];
  const [selected, setSelected] = useState("");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitchFB = () =>
    setIsEnabledFB((previousState) => !previousState);
  const toggleSwitchX = () => setIsEnabledX((previousState) => !previousState);
  const toggleSwitchIG = () =>
    setIsEnabledIG((previousState) => !previousState);
  const [imageUri, setImageUri] = useState<any>(null);

  const selectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Quyền truy cập bị từ chối",
        "Ứng dụng cần quyền truy cập để chọn ảnh."
      );
      return;
    }
    // Mở thư viện ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Chỉ chọn ảnh
      allowsEditing: true, // Cho phép chỉnh sửa ảnh
      aspect: [4, 3], // Tỉ lệ khung hình khi chỉnh sửa
      quality: 1, // Chất lượng ảnh (1 là cao nhất)
    });

    if (!result.canceled) {
      //const uri = result.assets[0].uri;
      setImageUri(result.assets[0].uri); // Lưu đường dẫn ảnh đã chọn
    }
  };

  const postVideo = async () => {
    try {
      const newVideo = {
        title: title,
        description: description,
        hashtags: hashtags,
        image: imageUri !== null ? imageUri : uriImage,
        audio: audioName,
      };

      await apiUser.postVideo(newVideo);
      window.alert("Post video successfully");
      dispatch(setHideTabBar(false));
      navigation.navigate("HomePage");
    } catch (error) {
      console.log("error", error);
    }
  };
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
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: 200,
                height: 300,
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
          ) : (
            <Image
              source={{ uri: uriImage !== undefined ? uriImage : imageUri }}
              style={{
                width: 200,
                height: 300,
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
          )}
          <TouchableOpacity onPress={selectImage}>
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
              onChangeText={(text) => setTitle(text)}
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
              onChangeText={(text) => setDescription(text)}
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
              value={hashtag}
              onChangeText={handleTextChange}
            />
            <TouchableOpacity onPress={addHashTags}>
              <Icon name="plus" size={25} />
            </TouchableOpacity>
          </View>
        </View>

        {hashtags.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => removeHashTag(index)}>
              <Icon name="times" size={20} />
            </TouchableOpacity>
          </View>
        ))}

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
          <SelectList
            setSelected={(val: any) => setSelected(val)}
            data={options}
            defaultOption={options[0]}
            search={false}
          />
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
            onPress={postVideo}
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
    borderColor: "#E6E6E6",
    paddingVertical: 5,
    borderBottomWidth: 1,
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
