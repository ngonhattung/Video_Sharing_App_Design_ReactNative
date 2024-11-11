import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import axiosInstance from "./axiosInstance";
import { FIREBASE_AUTH, FIREBASE_DB } from "../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
const db = FIREBASE_DB;
const auth = FIREBASE_AUTH;
// export const getUserStory = async () => {
//   try {
//     const { data: response } = await axiosInstance.get("users");
//     const userWithStory = response.filter(
//       (user: any) => user.story && user.story.hasStory === true
//     );
//     return userWithStory;
//   } catch (error: any) {
//     console.error(error.message);
//   }
// };
export const getUserStory = async () => {
  try {
    // Truy vấn bảng 'users' trong Firestore
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("stories.hasStory", "==", true));

    // Lấy dữ liệu từ Firestore
    const querySnapshot = await getDocs(q);
    const userWithStory: any = [];

    querySnapshot.forEach((doc) => {
      // Lấy dữ liệu người dùng và thêm vào mảng
      userWithStory.push({ id: doc.id, ...doc.data() });
    });

    // Thêm thông tin của người dùng đăng nhập vào mảng, bất kể hasStory
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserId = currentUser.uid;
      const currentUserExists = userWithStory.some(
        (user: any) => user.id === currentUserId
      );

      if (!currentUserExists) {
        const userDoc = await getDoc(doc(db, "users", currentUserId));
        const userData = userDoc.data();

        if (userData) {
          userWithStory.unshift({ id: currentUserId, ...userData });
        }
      }
    }

    return userWithStory;
  } catch (error) {
    console.error("Error fetching user stories: ", error);
  }
};

// export const getTopTrending = async () => {
//   try {
//     const { data: response } = await axiosInstance.get("users");
//     const usersWithHighViews = response.flatMap((user: any) => {
//       return user.videos.map((video: any) => ({
//         userId: user.id,
//         avatar: user.avatar,
//         userName: user.name,
//         videoId: video.videoId,
//         title: video.title,
//         hashtag: video.hashtag,
//         content: video.content,
//         audio: video.audio,
//         views: video.views,
//         likes: video.likes,
//         comments: video.comments,
//       }));
//     });
//     const sortedUsers = usersWithHighViews.sort(
//       (a: any, b: any) => b.views - a.views
//     );
//     const topUsers = sortedUsers.slice(0, 4);
//     return topUsers;
//   } catch (error: any) {
//     console.error(error.message);
//   }
// };
export const getTopTrending = async () => {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    const usersWithHighViews: any = [];

    querySnapshot.forEach((doc) => {
      const user = doc.data();
      const userId = doc.id;

      // Kiểm tra xem user.videos có phải là một mảng hay không
      if (Array.isArray(user.videos)) {
        // Nếu là mảng, lặp qua mảng video
        user.videos.forEach((video: any) => {
          usersWithHighViews.push({
            userId,
            avatar: user.avatar,
            userName: user.name,
            videoId: video.videoId,
            title: video.title,
            hashtag: video.hashtag,
            content: video.content,
            audio: video.audio,
            views: video.views,
            likes: video.likes,
            comments: video.comments,
          });
        });
      } else {
        console.error(
          "User does not have videos or videos is not an array",
          userId
        );
      }
    });

    // Sắp xếp video theo lượt xem giảm dần
    const sortedUsers = usersWithHighViews.sort(
      (a: any, b: any) => b.views - a.views
    );

    // Lấy 6 video có lượt xem cao nhất
    const topUsers = sortedUsers.slice(0, 6);

    return topUsers;
  } catch (error: any) {
    console.error("Error fetching top trending users:", error.message);
  }
};
// export const getUserStreaming = async () => {
//   try {
//     const { data: response } = await axiosInstance.get("users");
//     const userWithStream = response.filter(
//       (user: any) => user.liveStream && user.liveStream.isLive === true
//     );
//     return userWithStream;
//   } catch (error: any) {
//     console.error(error.message);
//   }
// };
export const getUserStreaming = async () => {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    const userWithStream: any = [];

    querySnapshot.forEach((doc) => {
      const user = doc.data();

      if (user.liveStream && user.liveStream.isLive === true) {
        userWithStream.push({
          id: doc.id, // Lấy ID của người dùng từ Firestore
          avatar: user.avatar,
          name: user.name,
          liveStream: user.liveStream,
        });
      }
    });

    return userWithStream;
  } catch (error: any) {
    console.error("Error fetching users with live stream:", error.message);
  }
};
// export const getCommentsFromVideo = async (videoId: string) => {
//   try {
//     const { data: response } = await axiosInstance.get("users");
//     const comments = response.flatMap((user: any) => {
//       return user.videos
//         .filter((video: any) => video.videoId === videoId)
//         .flatMap((video: any) => video.comments);
//     });
//     return comments;
//   } catch (error: any) {
//     console.error(error.message);
//   }
// };
export const getCommentsFromVideo = async (videoId: string) => {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    const comments: any = [];

    querySnapshot.forEach((doc) => {
      const user = doc.data();

      user.videos?.forEach((video: any) => {
        if (video.videoId === videoId) {
          comments.push(...video.comments);
        }
      });
    });

    return comments;
  } catch (error: any) {
    console.error("Error fetching comments from video:", error.message);
  }
};
export const postComment = async (
  userId: string,
  videoId: string,
  comment: string,
  targetUserId: string
) => {
  try {
    // Lấy thông tin người dùng đăng bình luận
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();

    if (!userData) {
      console.error("User not found");
      return;
    }

    const avatar: string = userData.avatar;
    const commenter: string = userData.name;
    const commentId = uuidv4();
    const timeAgo = "Just now";
    const like = false;

    const newComment = {
      commentId,
      avatar,
      comment,
      commenter,
      timeAgo,
      like,
    };

    // Lấy tài liệu người dùng mục tiêu để cập nhật video
    const targetUserDocRef = doc(db, "users", targetUserId);
    const targetUserDoc = await getDoc(targetUserDocRef);
    const targetUserData = targetUserDoc.data();

    if (!targetUserData) {
      console.error("Target user not found");
      return;
    }

    // Cập nhật mảng videos với bình luận mới
    const updatedVideos = targetUserData.videos.map((video: any) => {
      if (video.videoId === videoId) {
        return {
          ...video,
          comments: [...video.comments, newComment], // Thêm bình luận vào mảng comments
        };
      }
      return video;
    });

    console.log("Updated videos:", updatedVideos);
    // Ghi lại toàn bộ mảng videos đã cập nhật vào Firestore (Firebase không hỗ trợ thêm trực tiếp vào mảng)
    await updateDoc(targetUserDocRef, {
      videos: updatedVideos,
    });

    return newComment;
  } catch (error: any) {
    console.error("Error posting comment:", error.message);
  }
};

export const saveVideo = async (videoLiked: any) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserId = currentUser.uid;
      const userDocRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (!userData) {
        console.error("User not found");
        return;
      }
      await updateDoc(userDocRef, {
        saved: [...userData.saved, videoLiked],
      });
      console.log("Video saved ", [...userData.saved, videoLiked]);
    }
  } catch (error: any) {
    console.error("Error posting comment:", error.message);
  }
};
export const unSaveVideo = async (videoUnLiked: any) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserId = currentUser.uid;
      const userDocRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (!userData) {
        console.error("User not found");
        return;
      }
      await updateDoc(userDocRef, {
        saved: userData.saved.filter(
          (video: any) => video.videoId !== videoUnLiked.videoId
        ),
      });
      console.log(
        "Video unsaved ",
        userData.saved.filter(
          (video: any) => video.videoId !== videoUnLiked.videoId
        )
      );
    }
  } catch (error: any) {
    console.error("Error posting comment:", error.message);
  }
};

export const getVideoSaved = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserId = currentUser.uid;
      const userDocRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (!userData) {
        console.error("User not found");
        return;
      }
      return userData.saved;
    }
  } catch (error: any) {
    console.error("Error posting comment:", error.message);
  }
};

export const handleSaveFowllow = async (targetUserId: string) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserId = currentUser.uid;
      const userDocRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      const name = userData?.name;
      const avatar = userData?.avatar;
      if (!userData) {
        console.error("User not found");
        return;
      }

      const targetUserDocRef = doc(db, "users", targetUserId);
      const targetUserDoc = await getDoc(targetUserDocRef);
      const targetUserData = targetUserDoc.data();
      const userNameTarget = targetUserData?.name;
      const avatarTarget = targetUserData?.avatar;

      if (!targetUserData) {
        console.error("Target user not found");
        return;
      }

      const newFollowing = {
        userId: targetUserId,
        name: userNameTarget,
        avatar: avatarTarget,
      };
      await updateDoc(userDocRef, {
        following: [...userData.following, newFollowing],
      });

      const newFollower = {
        userId: currentUserId,
        name,
        avatar,
      };
      await updateDoc(targetUserDocRef, {
        followers: [...targetUserData.followers, newFollower],
      });
    }
  } catch (error: any) {
    console.error("Error posting comment:", error.message);
  }
};

export const handleUnSaveFowllow = async (targetUserId: string) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserId = currentUser.uid;
      const userDocRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (!userData) {
        console.error("User not found");
        return;
      }

      const targetUserDocRef = doc(db, "users", targetUserId);
      const targetUserDoc = await getDoc(targetUserDocRef);
      const targetUserData = targetUserDoc.data();

      if (!targetUserData) {
        console.error("Target user not found");
        return;
      }

      await updateDoc(userDocRef, {
        following: userData.following.filter(
          (user: any) => user.userId !== targetUserId
        ),
      });

      await updateDoc(targetUserDocRef, {
        followers: targetUserData.followers.filter(
          (user: any) => user.userId !== currentUserId
        ),
      });
    }
  } catch (error: any) {
    console.error("Error posting comment:", error.message);
  }
};

export const getFollower = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserId = currentUser.uid;
      const userDocRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (!userData) {
        console.error("User not found");
        return;
      }
      return userData.followers;
    }
  } catch (error: any) {
    console.error("Error posting comment:", error.message);
  }
};

export const getFollowing = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUserId = currentUser.uid;
      const userDocRef = doc(db, "users", currentUserId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      if (!userData) {
        console.error("User not found");
        return;
      }
      return userData.following;
    }
  } catch (error: any) {
    console.error("Error posting comment:", error.message);
  }
};
