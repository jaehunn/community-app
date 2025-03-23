import { colors } from '@/constants/colors.constant'
import { PropsWithChildren } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface Props extends PropsWithChildren {
  isActive?: boolean
  onPress?: () => void
}

export function Tab({ children, isActive = false, onPress }: Props) {
  function handlePress() {
    onPress?.()
  }

  return (
    <Pressable style={[styles.container, isActive ? styles.activeContainer : null]} onPress={handlePress}>
      <Text style={[styles.text, isActive ? styles.activeText : null]}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 38,
    flex: 1,
    paddingVertical: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 14,
    color: colors.gray500,
  },

  // active
  activeContainer: {
    borderBottomColor: colors.black,
  },
  activeText: {
    color: colors.black,
    fontWeight: 700,
  },
})
