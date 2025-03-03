import { colors } from '@/constants/colors.constant'
import { ComponentProps, PropsWithChildren, useCallback } from 'react'
import { GestureResponderEvent, Pressable, PressableProps, StyleSheet, Text } from 'react-native'

interface Props extends PropsWithChildren<ComponentProps<typeof Pressable>> {
  size: 'small' | 'medium' | 'large'
  variant: 'fill' | 'outline'
}

/**
 * variant 스타일을 Pressable, Text 에 두 번 적용하고 있음.
 * variant 에 대한 스타일을 분리해낼 수 있을지.
 */

export function PressableText({ children, size, variant, onPress, ...props }: Props) {
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event)
    },
    [onPress]
  )

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],

        // pressed style
        pressed ? styles['pressed'] : null,
      ]}
      onPress={handlePress}
      {...props}
    >
      <Text style={styles[variant]}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // ...
  },

  // size
  small: {
    //  ...
  },
  medium: {
    // ...
  },
  large: {
    width: '100%',
    height: 44,
  },

  // variant
  fill: {
    backgroundColor: colors.orange600,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  outline: {
    // ...
  },

  // pressed
  pressed: {
    opacity: 0.8,
  },
})
