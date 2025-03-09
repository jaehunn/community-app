import { colors } from '@/constants/colors.constant'
import { ComponentProps, forwardRef } from 'react'
import { Text, TextInput, View } from 'react-native'

import { StyleSheet } from 'react-native'

interface Props extends ComponentProps<typeof TextInput> {
  label?: string
  variant: 'fill' | 'standard' | 'outline'
  error?: string
  rightSlot?: React.ReactNode
}

export const InputField = forwardRef<TextInput, Props>(function InputField(
  { label, variant, error, rightSlot: RightSlot, ...props },
  forwardedRef
) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.container,
          styles[variant],
          // ...
          Boolean(error) ? styles.inputError : null,

          // ...
          props.multiline ? styles.multiline : null,
        ]}
      >
        <TextInput
          ref={forwardedRef}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          placeholderTextColor={colors.gray500}
          style={styles.input}
          {...props}
        />

        {RightSlot}
      </View>

      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    color: colors.gray700,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },

  // variant
  fill: {
    backgroundColor: colors.gray100,
  },
  standard: {
    // ...
  },
  outline: {
    // ...
  },

  // error
  error: {
    fontSize: 12,
    marginTop: 5,
    color: colors.red500,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.red500,
  },

  // multiline
  multiline: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingVertical: 10,
    height: 200,
  },
})
