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
        content: video.content,
        views: video.views,
      }));
    });
    const sortedUsers = usersWithHighViews.sort(
      (a: any, b: any) => b.views - a.views
    );
    console.log(sortedUsers);
    const topUsers = sortedUsers.slice(0, 4);
    console.log(topUsers);
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
