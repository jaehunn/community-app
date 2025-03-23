import { baseUrls } from '@/apis/http'
import { PrivateRoute } from '@/app/_layout'
import { Tab } from '@/components/widgets/tab'
import { UserFeedList } from '@/components/widgets/user-feed-list'
import { colors } from '@/constants/colors.constant'
import { useGetMe } from '@/queries/use-get-me.query'
import { useGetUserProfile } from '@/queries/use-get-user-profile.query'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'

const AVATAR_SIZE = 154

export default function ProfileScreen() {
  const navigation = useNavigation()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: profile } = useGetUserProfile({ id })
  const { data: me } = useGetMe()

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.orange200,
      },
    })
  }, [navigation])

  // 내 프로필
  if (id === `${me?.id}`) {
    return <Redirect href="/my" />
  }

  return (
    <PrivateRoute>
      <View style={styles.header}>
        <Image
          source={
            profile?.imageUri
              ? {
                  uri: `${Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android}/${profile.imageUri}`,
                }
              : require('@/assets/images/default-avatar.png')
          }
          style={styles.avatar}
        />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{profile?.nickname}</Text>
          <Text style={styles.introduce}>{profile?.introduce}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <Tab>게시글</Tab>
      </View>

      <UserFeedList id={id} />
    </PrivateRoute>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    backgroundColor: colors.orange200,
    width: '100%',
    height: AVATAR_SIZE / 2,
  },
  avatar: {
    position: 'absolute',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray500,
  },

  // profile
  profileContainer: {
    marginTop: AVATAR_SIZE / 2,
  },
  profile: {
    display: 'flex',
    rowGap: 16,
    padding: 16,
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  introduce: {
    fontSize: 14,
  },
  profileEditButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },

  // tab
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
})
