import { StyleSheet, View } from 'react-native'
import { PressableText } from '../pressable-text'
import { colors } from '@/constants/colors.constant'
import { ComponentProps, PropsWithChildren } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type PressableTextProps = ComponentProps<typeof PressableText>

interface Props extends Pick<PressableTextProps, 'onPress'> {
  // ...
}

export function FixedBottomCta({ children, ...props }: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { bottom: insets.bottom }]}>
      <PressableText size="large" variant="fill" {...props}>
        {children}
      </PressableText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray300,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
})
