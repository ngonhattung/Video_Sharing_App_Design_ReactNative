import { View, Text, Image, Pressable, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const suggestedAccountsDB = [
  {
    id: 1,
    img: 'https://i.pravatar.cc/36?img=6',
    name: 'Ruth Sanders',
    status: 'Follow'
  },
  {
    id: 2,
    img: 'https://i.pravatar.cc/36?img=7',
    name: 'Elaine Fisher',
    status: 'Follow'
  },
  {
    id: 3,
    img: 'https://i.pravatar.cc/36?img=8',
    name: 'Marie Johnson',
    status: 'Follow'
  },
  {
    id: 4,
    img: 'https://i.pravatar.cc/36?img=9',
    name: 'Tommy Lee',
    status: 'Follow'
  },
  {
    id: 5,
    img: 'https://i.pravatar.cc/36?img=11',
    name: 'Tommy Lee',
    status: 'Follow'
  },
]

const videosDB = [
  {
    id: 1,
    img: 'https://picsum.photos/id/71/120/160',
    views: 124910
  },
  {
    id: 2,
    img: 'https://picsum.photos/id/73/120/160',
    views: 224510
  },
  {
    id: 3,
    img: 'https://picsum.photos/id/69/120/160',
    views: 2300500
  },
  {
    id: 4,
    img: 'https://picsum.photos/id/58/120/160',
    views: 3200502
  },
  {
    id: 5,
    img: 'https://picsum.photos/id/89/120/160',
    views: 6689752
  },
]
const likedDB = [
  {
    id: 1,
    img: 'https://picsum.photos/id/51/120/160',
    views: 924910
  },
  {
    id: 2,
    img: 'https://picsum.photos/id/46/120/160',
    views: 248510
  },
  {
    id: 3,
    img: 'https://picsum.photos/id/79/120/160',
    views: 1360500
  },
  {
    id: 4,
    img: 'https://picsum.photos/id/98/120/160',
    views: 4200502
  },
  {
    id: 5,
    img: 'https://picsum.photos/id/19/120/160',
    views: 5689752
  },
]

interface ObjListVideoAndLiked {
  id: number;
  img: string;
  views: number;
}
const ListVideoAndLiked = ({ item }: { item: ObjListVideoAndLiked }) => {
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
      <Image style={styles.itemImage} source={{ uri: item.img }} />
      <View style={styles.viewsText}>
        <Ionicons name="play-outline" size={14} color="white" />
        <Text style={{
          color: 'white',
          fontWeight: 400,
          fontSize: 10,
        }}>{convertViews(item.views)} views</Text>
        <Ionicons name="heart-outline" size={14} color="white"
          style={{ marginLeft: 'auto' }} />
      </View>
    </Pressable>
  );
}

interface ObjItem {
  id: number;
  img: string;
  name: string;
  status: string;
}
const ItemSuggestForYou = ({ item }: { item: ObjItem }) => {
  return (
    <Pressable style={{
      marginHorizontal: 8,
      width: 110,
    }} >
      <Ionicons style={{ marginLeft: 'auto' }} name="close-outline" size={24} color="black" />
      <Image source={{ uri: item.img }}
        style={{ marginHorizontal: 'auto', width: 72, height: 72, borderRadius: 50, borderColor: '#1985ff', borderWidth: 1 }}
      />
      <Text style={{ marginHorizontal: 'auto', marginVertical: 10 }}>{item.name}</Text>
      <Pressable style={{
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f54c87',
        borderRadius: 5,
      }}>
        <Text style={{ fontSize: 15, color: 'white' }}>{item.status}</Text>
      </Pressable>
    </Pressable>
  );
}

const ProfileDetailScreen = ({ route }: { route: any }) => {
  const { user } = route.params;
  const [typeFilter, setTypeFilter] = useState('videos');
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Pressable>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </Pressable>
          <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
            <Pressable>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </Pressable>
            <Pressable style={{ marginLeft: 10 }}>
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Image source={{ uri: user.img }}
          style={{ width: 72, height: 72, borderRadius: 50, borderColor: '#1985ff', borderWidth: 1 }}
        />
        <Text style={{ fontWeight: '500', fontSize: 18 }}>{user.name}</Text>
        <Text style={{ color: '#444', marginVertical: 10 }}>{user.bio}</Text>
        <View style={styles.infoFollowContainer}>
          <Pressable style={styles.infoItem} onPress={() => navigation.navigate('FollowScreen', { user: 'Ruth Sanders', img: require('../assets/avatar.png') })}>
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
        <View style={{ flexDirection: 'row', marginVertical: 30 }}>
          <Pressable style={{ borderRadius: 5, padding: 10, width: 100, backgroundColor: '#fff0f5', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#f54c87', fontSize: 15, fontWeight: 500 }}>Follow</Text>
          </Pressable>
          <Pressable style={{ borderRadius: 5, marginLeft: 10, padding: 10, width: 100, backgroundColor: '#fff0f5', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#f54c87', fontSize: 15, fontWeight: 500 }}>Message</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16, fontWeight: 500, padding: 10 }}>Suggested accounts</Text>
        <Pressable style={{ marginLeft: 'auto', padding: 10 }}>
          <Text style={{ color: '#faa7c4', fontSize: 15 }}>View more</Text>
        </Pressable>
      </View>

      <View style={{ height: 175 }}>
        <FlatList
          data={suggestedAccountsDB}
          renderItem={({ item }) => <ItemSuggestForYou item={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
        />
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 10
      }}>
        <Pressable
          style={[{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 50,
            paddingVertical: 10,
            flexDirection: 'row',
          }, typeFilter === 'videos' && { borderBottomWidth: 3, borderBottomColor: '#F9A6C3' }]}
          onPress={() => setTypeFilter('videos')}>
          <Ionicons name="play-outline" size={24} color="black"
            style={[typeFilter === 'videos' && { color: '#F9A6C3' }]} />
          <Text style={[{ fontSize: 15, fontWeight: 500, color: '#aaa' }, typeFilter === 'videos' && { color: '#F9A6C3' }]}>Videos</Text>
        </Pressable>
        <Pressable
          style={[{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 50,
            paddingVertical: 10,
            flexDirection: 'row',
          }, typeFilter === 'liked' && { borderBottomWidth: 3, borderBottomColor: '#F9A6C3' }]}
          onPress={() => setTypeFilter('liked')}>
          <Ionicons name="heart-outline" size={24} color="black"
            style={[typeFilter === 'liked' && { color: '#F9A6C3' }]} />
          <Text style={[{ fontSize: 15, fontWeight: 500, color: '#aaa' }, typeFilter === 'liked' && { color: '#F9A6C3' }]}>Liked</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <FlatList
          data={typeFilter === 'videos' ? videosDB : likedDB}
          renderItem={({ item }) => <ListVideoAndLiked item={item} />}
          numColumns={3} />
      </View>
    </ScrollView >
  )
}

export default ProfileDetailScreen

const styles = StyleSheet.create({
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
  itemContainer: {
    width: 120,
    height: 160,
    margin: 3,
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
    flexDirection: 'row',
    width: 110,
  },
})