import { PostWriteFormValues } from '@/app/post/write'
import { Controller, useFormContext } from 'react-hook-form'
import { Pressable, StyleSheet, TextInput } from 'react-native'
import { InputField } from '../input-field'
import { Ionicons } from '@expo/vector-icons'
import { PressableText } from '../pressable-text'
import { colors } from '@/constants/colors.constant'

interface Props {
  index: number
  onRemove: () => void
}

export function VoteInput({ index, onRemove }: Props) {
  const { control } = useFormContext<PostWriteFormValues>()

  return (
    <Controller
      control={control}
      name={`voteOptions.${index}.content`}
      rules={{
        validate: (value) => {
          if (value.length === 0) {
            return '내용을 입력해주세요.'
          }
        },
      }}
      render={({ field, fieldState }) => {
        return (
          <InputField
            placeholder="투표 항목을 입력해주세요."
            variant="standard"
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
            rightSlot={
              <Pressable onPress={onRemove}>
                <Ionicons name="close" size={20} color={colors.black} />
              </Pressable>
            }
          />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})
