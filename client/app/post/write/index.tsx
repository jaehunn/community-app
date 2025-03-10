import { PressableText } from '@/components/pressable-text'
import { DescriptionInput } from '@/components/widgets/description-input'
import { PostWriteFooter } from '@/components/widgets/post-write-footer'
import { TitleInput } from '@/components/widgets/title-input'
import { useCreatePost } from '@/queries/use-create-post.mutation'
import { ImageUri } from '@/types/post.type'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type FormValues = {
  title: string
  description: string

  // TOOD:
  imageUris: ImageUri[]
}

export default function PostWriteScreen() {
  const navigation = useNavigation()
  const postWriteForm = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',

      // TODO:
      imageUris: [],
    },
  })
  const { mutate: createPost } = useCreatePost()

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
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

  return (
    <FormProvider {...postWriteForm}>
      {/* ScrollView, @see https://reactnative.dev/docs/scrollview */}
      {/* ScrollView 로 진행해도, 인풋이 많아지면 키패드가 마지막 인풋을 가린다. */}
      {/* react-native-keyboard-aware-scroll-view */}
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
      </KeyboardAwareScrollView>

      <PostWriteFooter />
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
})
