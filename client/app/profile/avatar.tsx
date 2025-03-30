import { FlatList, StyleSheet, Text, View } from 'react-native'
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

const defaultTabIndex = 0

export default function AvatarScreen() {
  const navigation = useNavigation()
  const pagerRef = useRef<PagerView | null>(null)
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems()
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(defaultTabIndex)
  const { mutate: updateProfile } = useUpdateProfile()
  const { data: me } = useGetMe()
  const [avatarItems, setAvatarItems] = useState<AvatarItemType>({
    hatsId: me?.hatId ?? '',
    facesId: me?.faceId ?? '',
    topsId: me?.topId ?? '',
    bottomsId: me?.bottomId ?? '',
    handsId: me?.handId ?? '',
    skinsId: me?.skinId ?? '',
  })

  function extractIdFromPath(path: string) {
    const [, filename] = path.split('/')
    const [id] = filename.split('.')

    return id
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
  }, [])

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>{/* ... */}</View>
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
                  isSelected={avatarItems.hatsId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('hatsId', item)}
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
                  isSelected={avatarItems.facesId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('facesId', item)}
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
                  isSelected={avatarItems.topsId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('topsId', item)}
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
                  isSelected={avatarItems.bottomsId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('bottomsId', item)}
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
                  isSelected={avatarItems.handsId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('handsId', item)}
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
                  isSelected={avatarItems.skinsId === extractIdFromPath(item)}
                  onPress={() => handlePressAvatarItem('skinsId', item)}
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
