import { colors } from '@/constants/colors.constant'
import React, { ReactNode } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import dayjs from '@/utils/dayjs'

interface Props {
  nickname: string
  imageUri?: string
  createdAt: string
  option?: ReactNode
  onPress: () => void
}

export function Profile({ imageUri, nickname, createdAt, option, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer} onPress={onPress}>
        <Image
          source={imageUri ? { uri: imageUri } : require('@/assets/images/default-avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.createdAt}>{dayjs(createdAt).fromNow()}</Text>
        </View>
      </Pressable>
      {option}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray300,
  },
  infoContainer: {
    gap: 4,
  },
  nickname: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.black,
  },
  createdAt: {
    fontSize: 14,
    color: colors.gray500,
  },
})
