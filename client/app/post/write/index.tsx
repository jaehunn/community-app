import { DescriptionInput } from '@/components/widgets/description-input'
import { TitleInput } from '@/components/widgets/title-input'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

type FormValues = {
  title: string
  description: string
}

export default function PostWriteScreen() {
  const postWriteForm = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  })

  return (
    <FormProvider {...postWriteForm}>
      {/* ScrollView, @see https://reactnative.dev/docs/scrollview */}
      {/* ScrollView 로 진행해도, 인풋이 많아지면 키패드가 마지막 인풋을 가린다. */}
      {/* react-native-keyboard-aware-scroll-view */}
      <View style={styles.container}>
        <TitleInput />
        <DescriptionInput />
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
})
