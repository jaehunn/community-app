import { colors } from '@/constants/colors.constant'
import React, { ReactNode } from 'react'
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'

interface Props extends PressableProps {
  title: string
  icon?: ReactNode
}

function ListItem({ title, icon = null, ...props }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressedContainer]} {...props}>
      {icon}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    backgroundColor: colors.white,
    borderColor: colors.gray200,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  pressedContainer: {
    backgroundColor: colors.gray200,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
})

export default ListItem
