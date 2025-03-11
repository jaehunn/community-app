import { PostWriteFormValues } from '@/app/post/write'
import { useFormContext } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

import { StyleSheet } from 'react-native'
import { InputField } from '../input-field'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/colors.constant'

export function RegisteredVote() {
  const formContext = useFormContext<PostWriteFormValues>()

  const isVoteRegistered = formContext.watch('isVoteRegistered')

  if (!isVoteRegistered) {
    return null
  }

  const handlePressRemoveVote = () => {
    formContext.setValue('isVoteRegistered', false)

    // reset
    formContext.resetField('voteOptions')
  }

  return (
    <InputField
      variant="outline"
      editable={false}
      rightSlot={
        <Pressable onPress={handlePressRemoveVote}>
          <Ionicons name="close" size={24} color={colors.black} />
        </Pressable>
      }
    >
      투표가 첨부되었습니다.
    </InputField>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})
