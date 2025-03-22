import { baseUrls } from '@/apis/http'
import { PrivateRoute } from '@/app/_layout'
import { PressableText } from '@/components/pressable-text'
import { LikedFeedList } from '@/components/widgets/liked-feed-list'
import { MyFeedList } from '@/components/widgets/my-feed-list'
import { Tab } from '@/components/widgets/tab'
import { colors } from '@/constants/colors.constant'
import { useGetMe } from '@/queries/use-get-me.query'
import { useRef, useState } from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import PagerView from 'react-native-pager-view'

const AVATAR_SIZE = 154

type TabIndexType = 0 | 1

export default function MyScreen() {
  const pagerViewRef = useRef<PagerView | null>(null)
  const { data: me } = useGetMe()
  const [selectedTab, setSelectedTab] = useState<TabIndexType>(0)

  const handleTabPress = (tabIndex: TabIndexType) => {
    setSelectedTab(tabIndex)

    // Swipe 동기화
    pagerViewRef.current?.setPage(tabIndex)
  }

  return (
    <PrivateRoute>
      <View style={styles.header}>
        <Image
          source={
            me?.imageUri
              ? {
                  uri: `${Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android}/${me.imageUri}`,
                }
              : require('@/assets/images/default-avatar.png')
          }
          style={styles.avatar}
        />

        <PressableText variant="outline" size="medium" style={styles.profileEditButton}>
          프로필 편집
        </PressableText>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          <Text style={styles.nickname}>{me?.nickname}</Text>
          <Text style={styles.introduce}>{me?.introduce}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <Tab isActive={selectedTab === 0} onPress={() => handleTabPress(0)}>
          게시글
        </Tab>
        <Tab isActive={selectedTab === 1} onPress={() => handleTabPress(1)}>
          좋아한 게시물
        </Tab>
      </View>

      <PagerView
        ref={pagerViewRef}
        initialPage={0}
        style={styles.tabContentContainer}
        onPageSelected={(event) => {
          const position = event.nativeEvent.position as TabIndexType

          // Tab 동기화
          setSelectedTab(position)
        }}
      >
        <MyFeedList key="my-feed-list" />
        <LikedFeedList key="liked-feed-list" />
      </PagerView>
    </PrivateRoute>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    backgroundColor: colors.orange200,
    width: '100%',
    height: AVATAR_SIZE,
  },
  avatar: {
    position: 'absolute',
    top: AVATAR_SIZE / 2,
    left: 15,
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
  tabContentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
  },
})
