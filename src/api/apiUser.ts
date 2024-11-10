import axiosInstance from "./axiosInstance";

export const getUserStory = async () => {
  try {
    const { data: response } = await axiosInstance.get("users");
    const userWithStory = response.filter(
      (user: any) => user.story && user.story.hasStory === true
    );
    return userWithStory;
  } catch (error: any) {
    console.error(error.message);
  }
};
export const getTopTrending = async () => {
  try {
    const { data: response } = await axiosInstance.get("users");
    const usersWithHighViews = response.flatMap((user: any) => {
      return user.videos.map((video: any) => ({
        userId: user.id,
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
      }));
    });
    const sortedUsers = usersWithHighViews.sort(
      (a: any, b: any) => b.views - a.views
    );
    const topUsers = sortedUsers.slice(0, 4);
    return topUsers;
  } catch (error: any) {
    console.error(error.message);
  }
};
export const getUserStreaming = async () => {
  try {
    const { data: response } = await axiosInstance.get("users");
    const userWithStream = response.filter(
      (user: any) => user.liveStream && user.liveStream.isLive === true
    );
    return userWithStream;
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getCommentsFromVideo = async (videoId: string) => {
  try {
    const { data: response } = await axiosInstance.get("users");
    const comments = response.flatMap((user: any) => {
      return user.videos
        .filter((video: any) => video.videoId === videoId)
        .flatMap((video: any) => video.comments);
    });
    return comments;
  } catch (error: any) {
    console.error(error.message);
  }
};
