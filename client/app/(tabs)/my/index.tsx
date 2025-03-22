import { baseUrls } from '@/apis/http'
import { PrivateRoute } from '@/app/_layout'
import { PressableText } from '@/components/pressable-text'
import { Tab } from '@/components/widgets/tab'
import { colors } from '@/constants/colors.constant'
import { useGetMe } from '@/queries/use-get-me.query'
import { useState } from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'

const AVATAR_SIZE = 154

export default function MyScreen() {
  const { data: me } = useGetMe()
  const [selectedTab, setSelectedTab] = useState<0 | 1>(0)

  const handleTabPress = (tab: 0 | 1) => {
    setSelectedTab(tab)
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
})
