import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import { useGetAvatarItems } from '@/queries/use-get-avatar-items.queries'
import { Tab } from '@/components/widgets/tab'
import { Fragment, useEffect, useRef, useState } from 'react'
import PagerView from 'react-native-pager-view'
import { AvatarItem } from '@/components/widgets/avatar-item'
import { FixedBottomCta } from '@/components/widgets/fixed-bottom-cta'
import { useGetMe } from '@/queries/use-get-me.query'
import { router, useNavigation } from 'expo-router'
import { colors } from '@/constants/colors.constant'
import { useUpdateProfile } from '@/queries/use-update-profile.mutation'
import Toast from 'react-native-toast-message'
import { AvatarItemType } from '@/apis/update-profile.patch'
import Svg, { SvgUri } from 'react-native-svg'
import { baseUrls } from '@/apis/http'

const defaultTabIndex = 0

export default function AvatarScreen() {
  const navigation = useNavigation()
  const pagerRef = useRef<PagerView | null>(null)
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems()
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(defaultTabIndex)
  const { mutate: updateProfile } = useUpdateProfile()
  const { data: me } = useGetMe()
  const [avatarItems, setAvatarItems] = useState<AvatarItemType>({
    hatId: me?.hatId ?? '',
    faceId: me?.faceId ?? '',
    topId: me?.topId ?? '',
    bottomId: me?.bottomId ?? '',
    handId: me?.handId ?? '',
    skinId: me?.skinId ?? '01',
  })

  function extractIdFromPath(path: string) {
    const [, filename] = path.split('/')
    const [id] = filename.split('.')

    return id
  }

  function createAvatarUri(type: string, id?: string) {
    const baseUrl = Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android

    if (type === 'default' || id == null) {
      return `${baseUrl}/default/frame.svg`
    }

    return `${baseUrl}/items/${type}/${id}.svg`
  }

  function handlePressTab(index: number) {
    pagerRef.current?.setPage(index)
    setCurrentTabIndex(index)
  }

  function handlePressAvatarItem(type: keyof AvatarItemType, item: string) {
    setAvatarItems({
      ...avatarItems,
      [type]: extractIdFromPath(item),
    })
  }

  function handlePressSave() {
    updateProfile(avatarItems, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: '프로필이 저장되었습니다.',
        })

        router.back()
      },
    })
  }

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.orange200,
      },
    })
  }, [navigation])

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            {avatarItems.hatId && (
              <SvgUri uri={createAvatarUri('hats', avatarItems.hatId)} style={[styles.avatar, { zIndex: 70 }]} />
            )}
            {avatarItems.faceId && (
              <SvgUri uri={createAvatarUri('faces', avatarItems.faceId)} style={[styles.avatar, { zIndex: 60 }]} />
            )}
            {avatarItems.topId && (
              <SvgUri uri={createAvatarUri('tops', avatarItems.topId)} style={[styles.avatar, { zIndex: 50 }]} />
            )}
            {avatarItems.bottomId && (
              <SvgUri uri={createAvatarUri('bottoms', avatarItems.bottomId)} style={[styles.avatar, { zIndex: 40 }]} />
            )}
            <SvgUri uri={createAvatarUri('default')} style={[styles.avatar, { zIndex: 30 }]} />
            {avatarItems.skinId && (
              <SvgUri uri={createAvatarUri('skins', avatarItems.skinId)} style={[styles.avatar, { zIndex: 20 }]} />
            )}
            {avatarItems.handId && (
              <SvgUri uri={createAvatarUri('hands', avatarItems.handId)} style={[styles.avatar, { zIndex: 10 }]} />
            )}
          </View>
        </View>

        <View style={styles.tabContainer}>
          {['모자', '얼굴', '상의', '하의', '양손', '피부'].map((tab, index) => {
            return (
              <Tab key={tab} isActive={currentTabIndex === index} onPress={() => handlePressTab(index)}>
                {tab}
              </Tab>
            )
          })}
        </View>
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={defaultTabIndex}
          onPageSelected={({ nativeEvent }) => {
            setCurrentTabIndex(nativeEvent.position)
          }}
        >
          <FlatList
            data={hats}
            keyExtractor={(_, index) => `${index}`}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => {
              return (
                <AvatarItem
                  uri={item}
                  isSelected={avatarItems.hatId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('hatId', item)}
                />
              )
            }}
          />
          <FlatList
            data={faces}
            keyExtractor={(_, index) => `${index}`}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => {
              return (
                <AvatarItem
                  uri={item}
                  isSelected={avatarItems.faceId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('faceId', item)}
                />
              )
            }}
          />
          <FlatList
            data={tops}
            keyExtractor={(_, index) => `${index}`}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => {
              return (
                <AvatarItem
                  uri={item}
                  isSelected={avatarItems.topId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('topId', item)}
                />
              )
            }}
          />
          <FlatList
            data={bottoms}
            keyExtractor={(_, index) => `${index}`}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => {
              return (
                <AvatarItem
                  uri={item}
                  isSelected={avatarItems.bottomId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('bottomId', item)}
                />
              )
            }}
          />
          <FlatList
            data={hands}
            keyExtractor={(_, index) => `${index}`}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => {
              return (
                <AvatarItem
                  uri={item}
                  isSelected={avatarItems.handId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('handId', item)}
                />
              )
            }}
          />
          <FlatList
            data={skins}
            keyExtractor={(_, index) => `${index}`}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => {
              return (
                <AvatarItem
                  uri={item}
                  isSelected={avatarItems.skinId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('skinId', item)}
                />
              )
            }}
          />
        </PagerView>
      </View>

      <FixedBottomCta onPress={handlePressSave}>
        <Text>저장</Text>
      </FixedBottomCta>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // header
  headerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.orange200,
    height: 115,
    marginBottom: 115,
  },

  avatarContainer: {
    width: 229,
    height: 229,
    borderRadius: 229,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
  },

  avatar: {
    width: 229,
    height: 229,
    position: 'absolute',
  },

  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  // pagerView
  pagerView: {
    flex: 1,
  },

  // tabContent
  tabContent: {
    flex: 1,
  },

  // list
  listContainer: {
    paddingBottom: 120,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
  },
})
