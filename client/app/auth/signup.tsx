import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { EmailInput } from '@/components/widgets/email-input'
import { PasswordInput } from '@/components/widgets/password-input'
import { PasswordConfirmInput } from '@/components/widgets/password-confirm-input'
import { FixedBottomCta } from '@/components/widgets/fixed-bottom-cta'

type FormValues = {
  email: string
  password: string
  passwordConfirm: string
}

export default function SignupScreen() {
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    console.log('formValues', formValues)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FormProvider {...signupForm}>
        <View style={styles.formContainer}>
          <EmailInput />
          {/* submitBehavior="submit" 으로 키패드를 유지 */}
          <PasswordInput submitBehavior="submit" />
          <PasswordConfirmInput />
        </View>

        <FixedBottomCta onPress={signupForm.handleSubmit(onSubmit)}>회원가입하기</FixedBottomCta>
      </FormProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    margin: 16,
    gap: 16,
  },
})
