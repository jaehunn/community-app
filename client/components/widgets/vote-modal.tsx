import { PostWriteFormValues } from '@/app/post/write'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Alert, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { colors } from '@/constants/colors.constant'
import { Feather } from '@expo/vector-icons'
import { VoteInput } from './vote-input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function VoteModal() {
  const formContext = useFormContext<PostWriteFormValues>()

  const isOpenVoteModal = formContext.watch('isOpenVoteModal')
  const voteOptions = formContext.watch('voteOptions')

  // fields.id 는 react-hook-form 에서 자동으로 생성해주는 것.
  const { fields, append, remove } = useFieldArray({
    control: formContext.control,
    name: 'voteOptions',
  })

  const handlePressHeaderLeftIcon = () => {
    formContext.setValue('isOpenVoteModal', false)
  }

  const handlePressRemoveVote = (index: number) => () => {
    remove(index)
  }

  const handlePressAddVote = () => {
    // 삭제하는 경우를 생각해보면 추가 priority 는 마지막 인덱스로 처리하면 안됨.
    // 수동으로 최댓값을 찾아서 설정하는 방식으로.

    const maxDisplayPriority = Math.max(...fields.map((field) => field.displayPriority))

    append({ content: '', displayPriority: maxDisplayPriority + 1 })
  }

  const handlePressRegisterVote = () => {
    if (voteOptions.length < 2) {
      Alert.alert('투표 항목을 최소 2개 이상 추가해주세요.')

      return
    }

    formContext.setValue('isVoteRegistered', true)
    formContext.setValue('isOpenVoteModal', false)
  }

  return (
    <Modal visible={isOpenVoteModal} animationType="slide">
      <SafeAreaView style={styles.container}>
        {/* 모달은 Header 를 직접 달아줘야함. */}
        <View style={styles.header}>
          <Pressable style={styles.headerLeftIconContainer} onPress={handlePressHeaderLeftIcon}>
            <Feather name="arrow-left" size={24} color={colors.black} />
          </Pressable>

          <Text style={styles.headerTitle}>투표</Text>
          <Text style={styles.headerRightText} onPress={handlePressRegisterVote}>
            투표 생성
          </Text>
        </View>

        {/* 많은 인풋을 대비해서 스크롤 뷰로 래핑. */}
        <KeyboardAwareScrollView>
          {fields.map((field, index) => {
            // index 는 몇 번째 인풋인지 확인하는 용도.
            return <VoteInput key={field.id} index={index} onRemove={() => handlePressRemoveVote(index)} />
          })}
        </KeyboardAwareScrollView>

        <Pressable onPress={handlePressAddVote}>
          <Text style={styles.addVoteText}>+ 항목 추가</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftIconContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.black,
  },
  headerRightText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.orange600,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addVoteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray500,
    textAlign: 'center',
  },
})
