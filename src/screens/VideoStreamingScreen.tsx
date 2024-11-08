import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setHideTabBar } from "../redux/tabBarSlice";
const VideoStreamingScreen = ({ route }: any) => {
  const { userStreaming } = route.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [emotions, setEmotions] = useState<
    { emotion: Emotion; index: number }[]
  >([]);
  const [index, setIndex] = useState(0); // Đếm số lần nhấn để tạo chỉ số cho icon
  const handlePress = (emotion: string) => {
    // Kiểm tra tính hợp lệ của emotion
    if (isEmotion(emotion)) {
      // Thêm emotion mới vào mảng và tăng chỉ số
      setEmotions((prev) => [...prev, { emotion, index }]);
      setIndex((prev) => prev + 1);

      // Xóa emotion cũ sau 2 giây
      setTimeout(() => {
        setEmotions((prev) => prev.slice(1)); // Xóa emotion đầu tiên trong mảng
      }, 2000);
    }
  };
  const isEmotion = (emotion: string): emotion is Emotion => {
    return emotion === "like" || emotion === "love" || emotion === "haha";
  };
  const formatViews = (views: any) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    } else {
      return views.toString();
    }
  };
  return (
    <ImageBackground
      source={{ uri: userStreaming.liveStream.content }}
      style={styles.background}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={{ color: "white", fontSize: 20 }}>
            {userStreaming.name}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                marginRight: 20,
                backgroundColor: "red",
                padding: 5,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/usergr.png")}
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: "white" }}>
                {formatViews(userStreaming.liveStream.viewers)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                dispatch(setHideTabBar(false));
                navigation.goBack();
              }}
            >
              <Image source={require("../assets/close.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productCon}>
          {userStreaming.liveStream.products.map((product: any) => (
            <View key={product.productId} style={styles.product}>
              <Image
                source={{ uri: product.productImage }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
              />

              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {product.productName}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "gray", fontWeight: 700 }}>
                    {product.productPrice}$
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#F0F6FF",
                      padding: 5,
                      marginLeft: 20,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: "#7DB1FF" }}>
                      {product.sold} sold
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#F44B87",
                  borderRadius: 5,
                  marginLeft: "auto",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                  width: 100,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    padding: 8,
                    fontSize: 18,
                  }}
                >
                  Buy now
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <TextInput
            placeholder="Leave comment..."
            style={{
              backgroundColor: "#323842",
              borderRadius: 3,
              color: "gray",
              height: 40,
              width: "80%",
              paddingLeft: 20,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => handlePress("like")}
              style={{ marginHorizontal: 10 }}
            >
              <Image source={emotionSource.like} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress("love")}
              style={{ marginRight: 10 }}
            >
              <Image source={emotionSource.love} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("haha")}>
              <Image source={emotionSource.haha} />
            </TouchableOpacity>
          </View>
        </View>
        {emotions.map((emotionObj, idx) => (
          <AnimatedEmotion key={idx} emotion={emotionObj.emotion} index={idx} />
        ))}
      </View>
    </ImageBackground>
  );
};
type Emotion = "like" | "love" | "haha";

const emotionSource: Record<Emotion, any> = {
  like: require("../assets/like.png"),
  love: require("../assets/tim.png"),
  haha: require("../assets/haha.png"),
};

const AnimatedEmotion: React.FC<{ emotion: Emotion; index: number }> = ({
  emotion,
  index,
}) => {
  const translateY = new Animated.Value(0);
  const opacity = new Animated.Value(1);

  React.useEffect(() => {
    // Animate lên và giảm độ mờ
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -50,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: `${70 + index * 10}%`, // Tính toán cho vị trí bottom
        [index % 2 === 0 ? "right" : "left"]: 20 + index * 40, // Khoảng cách trái phải luân phiên
        transform: [{ translateX: -25 }, { translateY }],
        opacity: opacity,
      }}
    >
      <Image source={emotionSource[emotion]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  background: {
    flex: 1,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    position: "absolute",
    top: 40,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  productCon: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    paddingHorizontal: 20,
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  emotionContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});
export default VideoStreamingScreen;
