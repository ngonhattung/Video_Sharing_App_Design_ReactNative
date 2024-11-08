import { View, Text, TextInput, Image, Pressable, StyleSheet, FlatList, ScrollView } from 'react-native'
import React from 'react';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';


const videosDB = [
  {
    id: 1,
    username: 'John Doe',
    avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    video: 'https://picsum.photos/id/71/150/200',
    videoname: 'Video 1',
    views: 124910,
    likes: 124910
  },
  {
    id: 2,
    username: 'John Doe',
    avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    video: 'https://picsum.photos/id/71/150/200',
    videoname: 'Video 1',
    views: 124910,
    likes: 124910
  },
  {
    id: 3,
    username: 'John Doe',
    avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    video: 'https://picsum.photos/id/71/150/200',
    videoname: 'Video 1',
    views: 124910,
    likes: 124910
  },
  {
    id: 4,
    username: 'John Doe',
    avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    video: 'https://picsum.photos/id/71/150/200',
    videoname: 'Video 1',
    views: 124910,
    likes: 124910
  },
  {
    id: 5,
    username: 'John Doe',
    avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    video: 'https://picsum.photos/id/71/150/200',
    videoname: 'Video 1',
    views: 124910,
    likes: 124910
  },
  {
    id: 6,
    username: 'John Doe',
    avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    video: 'https://picsum.photos/id/71/150/200',
    videoname: 'Video 1',
    views: 124910,
    likes: 124910
  },
  {
    id: 7,
    username: 'John Doe',
    avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    video: 'https://picsum.photos/id/71/150/200',
    videoname: 'Video 1',
    views: 124910,
    likes: 124910
  },


]

interface ObjItem {
  id: number;
  username: string;
  avatar: string;
  video: string;
  videoname: string;
  views: number;
  likes: number;
}
const Item = ({ item }: { item: ObjItem }) => {
  const convertViews = (views: number) => {
    if (views > 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views > 1000) {
      return (views / 1000).toFixed(1) + "K";
    } else {
      return views;
    }
  }

  const convertLikes = (likes: number) => {
    if (likes > 1000000) {
      return (likes / 1000000).toFixed(1) + "M";
    } else if (likes > 1000) {
      return (likes / 1000).toFixed(1) + "K";
    } else {
      return likes;
    }
  }
  return (
    <Pressable style={styles.itemContainer}>
      <View>
        <Image style={styles.itemImage} source={{ uri: item.video }} />
        <View style={styles.viewsText}>
          <Ionicons name="play-outline" size={14} color="white" />
          <Text style={{
            color: 'white',
            fontWeight: 400,
            fontSize: 10
          }}>{convertViews(item.views)} views</Text>
          <Ionicons name="heart-outline" size={14} color="white"
            style={{ marginLeft: 'auto' }} />
          <Text style={{
            color: 'white',
            fontWeight: 400,
            fontSize: 10
          }}>{convertLikes(item.likes)}</Text>
        </View>
      </View>
      <Text style={{
        fontSize: 15,
        fontWeight: 600,
        color: '#777',
        marginVertical: 10
      }}>{item.videoname}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: item.avatar }} style={{ width: 36, height: 36, borderRadius: 50, marginRight: 10 }} />
        <Text style={{ fontSize: 12, fontWeight: 600, color: '#777' }}>{item.username}</Text>
      </View>
    </Pressable>
  );
}


const SearchVideoScreen = () => {
  const [selectedList, setSelectedList] = useState('trending');
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center' }}>
          <Ionicons name="close-outline" size={24} color="black"
            style={{ position: 'absolute', right: 10 }} />
          <TextInput
            style={{
              backgroundColor: '#f2f3f5',
              paddingLeft: 10, paddingRight: 32,
              paddingVertical: 10,
              width: '100%',
            }} placeholder='Search' />
        </View>
        <Ionicons name="filter-outline" size={24} color="black"
          style={{ marginLeft: 'auto' }} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Pressable style={[styles.filterButton, selectedList === 'trending' && { backgroundColor: '#f54c87' }]} onPress={() => setSelectedList('trending')}>
          <Text style={[styles.textFilter, selectedList === 'trending' && { color: 'white' }]}>Trending</Text>
        </Pressable>
        <Pressable style={[styles.filterButton, selectedList === 'accounts' && { backgroundColor: '#f54c87' }]} onPress={() => setSelectedList('accounts')}>
          <Text style={[styles.textFilter, selectedList === 'accounts' && { color: 'white' }]} >Accounts</Text>
        </Pressable>
        <Pressable style={[styles.filterButton, selectedList === 'streaming' && { backgroundColor: '#f54c87' }]} onPress={() => setSelectedList('streaming')}>
          <Text style={[styles.textFilter, selectedList === 'streaming' && { color: 'white' }]}>Streaming</Text>
        </Pressable>
        <Pressable style={[styles.filterButton, selectedList === 'audio' && { backgroundColor: '#f54c87' }]} onPress={() => setSelectedList('audio')}>
          <Text style={[styles.textFilter, selectedList === 'audio' && { color: 'white' }]}>Audio</Text>
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <FlatList style={{ alignSelf: 'center' }}
          data={videosDB}
          renderItem={({ item }) => <Item item={item} />}
          numColumns={2}
        />
      </ScrollView>
      <View style={{ marginHorizontal: 'auto' }}>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 400, color: '#f54c87' }}>Show more</Text>
          <Ionicons name="chevron-down-outline" size={24} color="#f54c87" />
        </Pressable>
      </View>
    </View>
  )
}

export default SearchVideoScreen
const styles = StyleSheet.create({
  filterButton: {
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  textFilter: {
    textAlign: 'center',
    color: '#f54c87',
    fontSize: 15,
    fontWeight: 400
  },
  itemContainer: {
    width: 150,
    margin: 15,
  },
  itemImage: {
    resizeMode: 'contain',
    width: 150,
    height: 200,
    borderRadius: 5,
    margin: "auto",
  },
  viewsText: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    flexDirection: 'row',
    width: '90%',
  },
})