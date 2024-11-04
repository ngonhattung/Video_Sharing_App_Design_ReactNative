interface StoryContent {
  contentType: string;
  contentUrl: string;
  postedAt: string;
}

interface UserStoryType {
  id: string;
  name: string;
  avatar: string;
  story: {
    hasStory: boolean;
    storyContent: StoryContent[];
  };
}
interface VideoTopTrendingType {
  userId: string;
  avatar: string;
  userName: string;
  videoId: string;
  title: string;
  hashtag: string[];
  content: string;
  audio: string;
  views: number;
  likes: number;
  comments: number;
}
interface TopicType {
  topicID: string;
  name: string;
  image: string;
}
interface UserStreamingType {
  id: string;
  name: string;
  avatar: string;
  liveStream: {
    isLive: boolean;
    streamTitle: string;
    content: string;
    viewers: number;
    minutesAgo: number;
  };
}
interface AudioType {
  audioID: string;
  title: string;
  catalog: string;
  image: string;
}
export interface UserStoryProps {
  userStory: UserStoryType;
}
export interface UserStoryListProps {
  userStorys: UserStoryType[];
}
export interface TopTrendingProps {
  videoTopTrending: VideoTopTrendingType;
}
export interface TopTrendingListProps {
  videoTopTrendings: VideoTopTrendingType[];
}
export interface TopicProps {
  topic: TopicType;
}
export interface TopicListProps {
  topics: TopicType[];
}
export interface UserStreamingProps {
  userStreaming: UserStreamingType;
}
export interface UserStreamingListProps {
  userStreamings: UserStreamingType[];
}
export interface AudioProps {
  audio: AudioType;
}
export interface AudioListProps {
  audios: AudioType[];
}
export type RootStackParamList = {
  VideoWatchingScreen: { videoTopTrending: VideoTopTrendingType };
  VideoStreamingScreen: { userStreaming: UserStreamingType };
};
