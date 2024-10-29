interface StoryContent {
  contentType: string;
  contentUrl: string;
  postedAt: string;
}

interface UserStoryType {
  id: number;
  name: string;
  avatar: string;
  story: {
    hasStory: boolean;
    storyContent: StoryContent[];
  };
}
interface VideoTopTrendingType {
  userId: number;
  avatar: string;
  userName: string;
  videoId: string;
  title: string;
  content: string;
  views: number;
}
interface TopicType {
  id: number;
  name: string;
  image: string;
}
interface UserStreamingType {
  id: number;
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
  id: number;
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
