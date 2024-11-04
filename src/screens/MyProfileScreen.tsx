import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native'
import React from 'react';
import { useState, useEffect } from 'react';
import { getVideo } from "../api/apiVideo";
import { getImage } from "../api/apiImage";

interface ObjItem {
  id: number;
  user_id: number;
  url: string;
  views: number;
  comment_id: number;
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
  return (
    <Pressable style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{ uri: item.url }} />
      <View style={styles.viewsText}>
        <Image source={require('../assets/play-view.png')} />
        <Text style={{
          color: 'white',
          fontWeight: 400,
        }}>{convertViews(item.views)} views</Text>
      </View>
    </Pressable>
  );
}


const MyProfileScreen = () => {
  const [selectedList, setSelectedList] = useState('videos');
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await getVideo();
      setList(response);
    };

    const fetchImages = async () => {
      const response = await getImage();
      setList(response);
    };

    if (selectedList === 'videos') {
      fetchVideos();
    } else {
      fetchImages();
    }
  }, [list]);


  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <View style={styles.navLeft}>
          <Pressable>
            <Image source={require('../assets/toggle.png')} />
          </Pressable>
          <Pressable style={{ marginLeft: 15 }}>
            <Image source={require('../assets/add-friend.png')} />
          </Pressable>
        </View>
        <View style={styles.navRight}>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../assets/edit-profile.png')} />
            <Text style={{ color: '#F9A6C3', marginLeft: 5 }}>Edit profile</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Image source={require('../assets/avatar.png')} />
        <Text style={{ fontWeight: '500', fontSize: 18 }}>Ruth Sanders</Text>
        <View style={styles.infoFollowContainer}>
          <Pressable style={styles.infoItem}>
            <Text>203</Text>
            <Text>Following</Text>
          </Pressable>
          <Pressable style={styles.infoItem}>
            <Text>628</Text>
            <Text>Followers</Text>
          </Pressable>
          <Pressable style={styles.infoItem}>
            <Text>2634</Text>
            <Text>Like</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.listButtonContainer}>
        <Pressable style={[styles.listButton, selectedList === 'videos' && styles.activeFilter]} onPress={() => setSelectedList('videos')}>
          <Image source={require('../assets/play.png')} />
          <Text style={{ marginLeft: 5 }}>My Videos</Text>
        </Pressable>
        <Pressable style={[styles.listButton, selectedList === 'images' && styles.activeFilter]} onPress={() => setSelectedList('images')}>
          <Image source={require('../assets/image.png')} />
          <Text style={{ marginLeft: 5 }} >My Images</Text>
        </Pressable>
        <Pressable style={[styles.listButton, selectedList === 'liked' && styles.activeFilter]} onPress={() => setSelectedList('liked')}>
          <Image source={require('../assets/tim.png')} />
          <Text style={{ marginLeft: 5 }}>Liked</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <FlatList
          data={list}
          renderItem={({ item }) => <Item item={item} />}
          numColumns={3}
        />
      </View>
    </View>
  )
}

export default MyProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  }
  ,
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navRight: {
    marginLeft: 'auto',
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoFollowContainer: {
    flexDirection: 'row',
  },
  infoItem: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  listButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '33%',
    justifyContent: 'center',
  },
  itemContainer: {
    width: 120,
    height: 160,
    margin: 5,
  },
  itemImage: {
    resizeMode: 'contain',
    width: 120,
    height: 160,
    borderRadius: 5,
    margin: "auto",
  },

  viewsText: {
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  activeFilter: {
    borderBottomWidth: 4,
    borderBottomColor: '#F9A6C3',
  }
})