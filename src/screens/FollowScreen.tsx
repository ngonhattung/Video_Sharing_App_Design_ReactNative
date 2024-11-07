import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native'
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { getFollowing, getFollower, updateFollowing } from "../api/apiFollowing";

interface ObjItem {
  id: number;
  img: string;
  name: string;
  status: string;
}
const ItemFollowing = ({ item }: { item: ObjItem }) => {

  const updateFollow = async (id: number, status: string) => {
    if (status === 'Follow') {
      status = 'Following';
    } else {
      status = 'Follow';
    }
    const response = await updateFollowing(id, status);
    console.log(response);
  }


  return (
    <View style={{ flexDirection: 'row', padding: 15 }}>
      <Image source={{ uri: item.img }}
        style={{ width: 36, height: 36, borderRadius: 50, marginRight: 10 }}
      />
      <Text>{item.name}</Text>
      <Pressable style={[{
        marginLeft: 'auto',
        borderWidth: 1,
        borderColor: '#555',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
      }, item.status === 'Follow' && { width: 80, backgroundColor: '#379AE6', borderWidth: 0 }]}
        onPress={() => updateFollow(item.id, item.status)}
      >
        <Text style={[{ color: '#555' }, item.status === 'Follow' && { color: 'white' }]}>{item.status}</Text>
      </Pressable>
    </View>
  );
}

const ItemFollower = ({ item }: { item: ObjItem }) => {
  return (
    <View style={{ flexDirection: 'row', padding: 15 }}>
      <Image source={{ uri: item.img }}
        style={{ width: 36, height: 36, borderRadius: 50, marginRight: 10 }}
      />
      <Text>{item.name}</Text>
      <Pressable style={[{
        marginLeft: 'auto',
        backgroundColor: '#eee',
        borderColor: '#555',
        padding: 10,
        borderRadius: 5,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
      }, item.status === 'Follow lại' && { width: 100, backgroundColor: '#de3c41', borderWidth: 0 }]}>
        <Text style={[{ color: '#555' }, item.status === 'Follow lại' && { color: 'white' }]}>{item.status}</Text>
      </Pressable>
    </View>
  );
}

const FollowScreen = ({ route }: { route: any }) => {
  const [typeFilter, setTypeFilter] = useState('followers');
  const { user, img } = route.params;

  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const response = await getFollowing();
      setList(response);
    };

    const fetchFollower = async () => {
      const response = await getFollower();
      setList(response);
    };

    if (typeFilter === 'followers') {
      fetchFollower();
    } else {
      fetchFollowing();
    }
  }, [list]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userLeft}>
          <Image source={img}
            style={{ width: 36, height: 36, borderRadius: 50, marginRight: 10 }}
          />
          <Text
            style={{ fontSize: 15, fontWeight: 600 }}>{user}</Text>
        </View>
        <View style={styles.userRight}>
          <Pressable style={{ marginRight: 5 }}>
            <Ionicons name="search-outline" size={24} color="black" />
          </Pressable>
          <Pressable>
            <Ionicons name="filter-outline" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', padding: 10 }}>
        <Pressable
          style={[{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,
            paddingVertical: 10
          }, typeFilter === 'followers' && { borderBottomWidth: 3, borderBottomColor: '#F9A6C3' }]}
          onPress={() => setTypeFilter('followers')}>
          <Text style={[{ fontSize: 15, fontWeight: 500, color: '#aaa' }, typeFilter === 'followers' && { color: '#F9A6C3' }]}>368 followers</Text>
        </Pressable>
        <Pressable
          style={[{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30,
            paddingVertical: 10
          }, typeFilter === 'following' && { borderBottomWidth: 3, borderBottomColor: '#F9A6C3' }]}
          onPress={() => setTypeFilter('following')}>
          <Text style={[{ fontSize: 15, fontWeight: 500, color: '#aaa' }, typeFilter === 'following' && { color: '#F9A6C3' }]}>456 following</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={list}
          renderItem={({ item }) => typeFilter === 'following' ? <ItemFollowing item={item} /> : <ItemFollower item={item} />}
        />
      </View>
    </View>

  )
}

export default FollowScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRight: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },

})