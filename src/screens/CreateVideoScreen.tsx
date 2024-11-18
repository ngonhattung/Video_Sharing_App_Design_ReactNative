import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/interfaces";
import { useDispatch } from "react-redux";
import { setHideTabBar } from "../redux/tabBarSlice";
import * as apiAudio from "../api/apiAudio";
import * as apiFilter from "../api/apiFilter";
import { Modal } from "react-native";
import AudioList from "../components/AudioList/AudioList";
import FilterList from "../components/FilterList/FilterList";
import * as ImagePicker from "expo-image-picker";
type PostVideoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PostVideoScreen"
>;
const CreateVideoScreen = ({ route }: any) => {
  const navigation = useNavigation<PostVideoScreenNavigationProp>();
  const dispatch = useDispatch();
  const [audio, setAudio] = useState([]);
  const [filter, setFilter] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFilterVisible, setModalFilterVisible] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);
  const [btnChangeType, setBtnChangeType] = useState("for you");
  const { audioName } = route.params || {};

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const toggleModalFilter = () => {
    setModalFilterVisible(!modalFilterVisible);
  };
  const toggleClearFilter = () => {
    setClearFilter(true);
  };
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
      const uri = result.assets[0].uri;
      setImageUri(uri); // Lưu đường dẫn ảnh đã chọn
    }
  };

  useEffect(() => {
    dispatch(setHideTabBar(true));
    const fetchUserAudio = async () => {
      try {
        const results = await apiAudio.fetchAudioByType(btnChangeType);
        setAudio(results);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUserFilter = async () => {
      try {
        const results = await apiFilter.fetchFilterByType(btnChangeType);
        setFilter(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserFilter();
    fetchUserAudio();
  }, [btnChangeType]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          imageUri ? { uri: imageUri } : require("../assets/bgcreate.png")
        }
        style={styles.background}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.bottomSheet}>
              <View style={styles.headerModal}>
                <Text style={styles.headerText}>Add audio</Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Image source={require("../assets/closeb.png")} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => setBtnChangeType("for you")}
                  style={
                    btnChangeType === "for you"
                      ? [styles.btnType, { backgroundColor: "#F44A86" }]
                      : styles.btnType
                  }
                >
                  <Text
                    style={
                      btnChangeType === "for you"
                        ? [styles.textType, { color: "white" }]
                        : styles.textType
                    }
                  >
                    For you
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBtnChangeType("trending")}
                  style={
                    btnChangeType === "trending"
                      ? [styles.btnType, { backgroundColor: "#F44A86" }]
                      : styles.btnType
                  }
                >
                  <Text
                    style={
                      btnChangeType === "trending"
                        ? [styles.textType, { color: "white" }]
                        : styles.textType
                    }
                  >
                    Trending
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBtnChangeType("saved")}
                  style={
                    btnChangeType === "saved"
                      ? [styles.btnType, { backgroundColor: "#F44A86" }]
                      : styles.btnType
                  }
                >
                  <Text
                    style={
                      btnChangeType === "saved"
                        ? [styles.textType, { color: "white" }]
                        : styles.textType
                    }
                  >
                    Saved
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.audioContainer}>
                <AudioList audios={audio} />
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalFilterVisible}
          onRequestClose={toggleModalFilter}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.bottomSheetFilter}>
              <View style={styles.headerModal}>
                <Text style={styles.headerText}>Add filter</Text>
                <TouchableOpacity onPress={toggleModalFilter}>
                  <Image source={require("../assets/closeb.png")} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={toggleClearFilter}>
                  <Image
                    source={require("../assets/noneFilter.png")}
                    style={{ marginHorizontal: 15 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setBtnChangeType("for you")}
                  style={
                    btnChangeType === "for you"
                      ? [
                          [styles.btnType, { width: "30%" }],
                          { backgroundColor: "#F44A86" },
                        ]
                      : [styles.btnType, { width: "30%" }]
                  }
                >
                  <Text
                    style={
                      btnChangeType === "for you"
                        ? [styles.textType, { color: "white" }]
                        : styles.textType
                    }
                  >
                    For you
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBtnChangeType("trending")}
                  style={
                    btnChangeType === "trending"
                      ? [
                          [styles.btnType, { width: "30%" }],
                          { backgroundColor: "#F44A86" },
                        ]
                      : [styles.btnType, { width: "30%" }]
                  }
                >
                  <Text
                    style={
                      btnChangeType === "trending"
                        ? [styles.textType, { color: "white" }]
                        : styles.textType
                    }
                  >
                    Trending
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBtnChangeType("saved")}
                  style={
                    btnChangeType === "saved"
                      ? [
                          [styles.btnType, { width: "30%" }],
                          { backgroundColor: "#F44A86" },
                        ]
                      : [styles.btnType, { width: "30%" }]
                  }
                >
                  <Text
                    style={
                      btnChangeType === "saved"
                        ? [styles.textType, { color: "white" }]
                        : styles.textType
                    }
                  >
                    Saved
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.filterContainer}>
                <FilterList filters={filter} clearFilter={clearFilter} />
              </ScrollView>
            </View>
          </View>
        </Modal>
        {!modalVisible || audioName !== undefined ? (
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setHideTabBar(false));
                navigation.goBack();
              }}
              style={{
                position: "absolute",
                top: 30,
                left: 15,
                zIndex: 10,
              }}
            >
              <Image source={require("../assets/close.png")} />
            </TouchableOpacity>
            <View style={styles.header}>
              <TouchableOpacity onPress={toggleModal}>
                <View
                  style={
                    modalFilterVisible
                      ? {
                          backgroundColor: "#706E6E",
                          padding: 10,
                          borderRadius: 20,
                          flexDirection: "row",
                          alignItems: "center",
                        }
                      : {
                          backgroundColor: "white",
                          padding: 10,
                          borderRadius: 20,
                          flexDirection: "row",
                          alignItems: "center",
                        }
                  }
                >
                  <Image
                    source={require("../assets/notemcden.png")}
                    style={{ marginBottom: 5 }}
                  />
                  {audioName !== undefined ? (
                    <Text style={{ color: "gray" }}>{audioName}</Text>
                  ) : (
                    <Text style={{ color: "gray" }}>Add audio</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.toolCon}>
              <View
                style={{
                  marginBottom: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/flip.png")}
                  style={{ marginBottom: 5 }}
                />
                <Text style={{ color: "white" }}>Flip</Text>
              </View>

              <TouchableOpacity onPress={toggleModalFilter}>
                <View
                  style={{
                    marginBottom: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/filter.png")}
                    style={{ marginBottom: 5 }}
                  />
                  <Text style={{ color: "white" }}>Filter</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginBottom: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/timer.png")}
                  style={{ marginBottom: 5 }}
                />
                <Text style={{ color: "white" }}>Timer</Text>
              </View>

              <View
                style={{
                  marginBottom: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="bolt"
                  size={20}
                  color="white"
                  style={{ marginBottom: 5 }}
                />
                <Text style={{ color: "white" }}>Flash</Text>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.footerContent}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={require("../assets/effect.png")}
                    style={{ marginBottom: 5 }}
                  />
                  <Text style={{ color: "white" }}>Effect</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PostVideoScreen", {
                      uriImage: imageUri,
                      audioName: audioName,
                    });
                  }}
                >
                  <Image source={require("../assets/create.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={selectImage}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Image
                      source={require("../assets/upload.png")}
                      style={{ marginBottom: 5 }}
                    />
                    <Text style={{ color: "white" }}>Upload</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
  },
  toolCon: {
    justifyContent: "flex-end",
    position: "absolute",
    right: 25,
    top: "15%",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomSheet: {
    width: "100%",
    height: "65%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetFilter: {
    width: "100%",
    height: "40%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  audioContainer: {
    maxHeight: "90%",
  },
  filterContainer: {
    maxHeight: "90%",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  btnType: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    width: "35%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textType: {
    color: "#F891B6",
    fontSize: 16,
  },
});
export default CreateVideoScreen;
