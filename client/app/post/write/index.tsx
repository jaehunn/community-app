import { PressableText } from '@/components/pressable-text'
import { DescriptionInput } from '@/components/widgets/description-input'
import { ImagePreviewList } from '@/components/widgets/image-preview-list'
import { PostWriteFooter } from '@/components/widgets/post-write-footer'
import { RegisteredVote } from '@/components/widgets/registered-vote'
import { TitleInput } from '@/components/widgets/title-input'
import { VoteModal } from '@/components/widgets/vote-modal'
import { useCreatePost } from '@/queries/use-create-post.mutation'
import { ImageUri } from '@/types/post.type'
import { VoteOption } from '@/types/vote.type'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export type PostWriteFormValues = {
  title: string
  description: string
  imageUris: ImageUri[]
  isOpenVoteModal: boolean
  voteOptions: VoteOption[]
  isVoteRegistered: boolean
}

export default function PostWriteScreen() {
  const navigation = useNavigation()
  const postWriteForm = useForm<PostWriteFormValues>({
    defaultValues: {
      title: '',
      description: '',
      imageUris: [],
      isOpenVoteModal: false,
      voteOptions: [{ displayPriority: 0, content: '' }],
      isVoteRegistered: false,
    },
  })
  const { mutate: createPost } = useCreatePost()

  const onSubmit: SubmitHandler<PostWriteFormValues> = (formValues) => {
    createPost(formValues, {
      onSuccess: () => {
        router.replace('/')
      },
    })
  }

  // @see https://docs.expo.dev/router/advanced/stack/
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableText variant="standard" size="medium" onPress={postWriteForm.handleSubmit(onSubmit)}>
            저장
          </PressableText>
        )
      },
    })
  }, [])

  const imageUris = postWriteForm.watch('imageUris')

  return (
    <FormProvider {...postWriteForm}>
      {/* ScrollView, @see https://reactnative.dev/docs/scrollview */}
      {/* ScrollView 로 진행해도, 인풋이 많아지면 키패드가 마지막 인풋을 가린다. */}
      {/* react-native-keyboard-aware-scroll-view */}
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
        <RegisteredVote />
        <ImagePreviewList imageUris={imageUris} />
      </KeyboardAwareScrollView>

      <PostWriteFooter />

      <VoteModal />
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
})
