import { PressableText } from '@/components/pressable-text'
import { DescriptionInput } from '@/components/widgets/description-input'
import { RegisteredVote } from '@/components/widgets/registered-vote'
import { TitleInput } from '@/components/widgets/title-input'
import { useGetPost } from '@/queries/use-get-post.query'
import { useUpdatePost } from '@/queries/use-update-post.mutation'
import { ImageUri, VoteOption } from '@/types/post.type'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type FormValues = {
  title: string
  description: string
  imageUris: ImageUri[]
  isVoteRegistered: boolean
}

export default function PostEditScreen() {
  const navigation = useNavigation()

  /** @see https://docs.expo.dev/versions/latest/sdk/router/#uselocalsearchparams */
  const { id } = useLocalSearchParams()
  const { data: post } = useGetPost({ id: Number(id) })
  const postWriteForm = useForm<FormValues>({
    // stale-time 을 설정했다면, 초기 로드 이후 defaultValues 로 기본값 설정이 가능하다.
    // 단, 초기 로드 시에는 기본값이 비어있다.

    /** *비동기 값을 defaultValues + reset() 로 설정하는 것과 values 로 설정하는 것의 차이. */
    defaultValues: {
      title: '',
      description: '',
      imageUris: [],
      isVoteRegistered: false,
    },
  })

  const { mutate: updatePost } = useUpdatePost()

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    updatePost([{ id: Number(id) }, formValues], {
      onSuccess: () => {
        router.back()
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

  useEffect(() => {
    if (post?.data != null) {
      postWriteForm.reset({
        title: post.data.title,
        description: post.data.description,
        imageUris: post.data.imageUris,
        isVoteRegistered: post.data.hasVote,
      })
    }
  }, [postWriteForm.reset, post?.data])

  return (
    <FormProvider {...postWriteForm}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
        <RegisteredVote />
      </KeyboardAwareScrollView>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
})
