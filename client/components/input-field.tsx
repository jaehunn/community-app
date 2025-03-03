import { colors } from '@/constants/colors.constant'
import { ComponentProps } from 'react'
import { Text, TextInput, View } from 'react-native'

import { StyleSheet } from 'react-native'

interface Props extends ComponentProps<typeof TextInput> {
  label?: string
  variant: 'fill' | 'standard' | 'outline'
}

export function InputField({ label, variant, ...props }: Props) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.container, styles[variant]]}>
        <TextInput placeholderTextColor={colors.gray500} style={styles.input} {...props} />
      </View>
    </View>
  )
}

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
})
