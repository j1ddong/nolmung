import React, {Dispatch, SetStateAction} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import {otherPostListType} from '@pages/Community';
import Squre from '@atoms/Squre';
import CommUserInfo from '@molecules/CommUserInfo';
import CommMainInfo from '@molecules/CommMainInfo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CommunityParamList} from '@pages/Community';
import {useNavigation} from '@react-navigation/native';

interface Props {
  otherPostList: otherPostListType[];
  loadMore: () => void;
  refreshing: boolean;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  refresh: (pgNum: number, isRefresh?: boolean) => void;
}
type CommScreenProp = NativeStackNavigationProp<
  CommunityParamList,
  'Community'
>;

function CommOtherPost({
  otherPostList,
  loadMore,
  refreshing,
  setRefreshing,
  refresh,
}: Props) {
  const navigation = useNavigation<CommScreenProp>();

  const naviOtherDetail = (postIdx: number) => {
    navigation.navigate('CommDetail', {postIdx});
  };

  const onRefresh = () => {
    if (!refreshing) {
      refresh(0, true);
    }
  };

  return (
    <FlatList
      data={otherPostList}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={item => String(item.postIdx)}
      renderItem={({item}) => (
        <TouchableHighlight
          onPress={() => naviOtherDetail(item.postIdx)}
          underlayColor="#E2E2E2"
          style={styles.fullContainer}>
          <View style={styles.container}>
            <View style={styles.imgContainer}>
              <Squre
                imageSource={item.thumbnailUrl}
                width={88}
                height={88}
                borderRadius={5}
              />
            </View>
            <View style={styles.infoContainer}>
              <CommMainInfo
                subject={item.subject}
                location={item.location}
                modifyDate={item.modifyDate}
              />
              <Text style={styles.payText}>
                {item.pay?.toLocaleString('ko-KR')}원
              </Text>
              <CommUserInfo
                writer={item.writer}
                chatCnt={item.chatCnt}
                userImgUrl={item.userImgUrl}
              />
            </View>
          </View>
        </TouchableHighlight>
      )}
      onEndReached={() => loadMore()}
    />
  );
}
const styles = StyleSheet.create({
  fullContainer: {
    backgroundColor: 'white',
    marginTop: 2,
  },
  container: {
    flexDirection: 'row',
    height: 120,
    marginBottom: 4,
    marginHorizontal: 15,
  },
  imgContainer: {
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 13,
    justifyContent: 'space-between',
  },
  payText: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 0,
  },
});

export default CommOtherPost;
