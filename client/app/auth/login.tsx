import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FixedBottomCta } from '@/components/widgets/fixed-bottom-cta'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { EmailInput } from '@/components/widgets/email-input'
import { PasswordInput } from '@/components/widgets/password-input'
import { useLogin } from '@/queries/use-login.mutation'
import { router } from 'expo-router'

type FormValues = {
  email: string
  password: string
}

export default function LoginScreen() {
  const { mutate: login } = useLogin()

  const loginForm = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    login(formValues, {
      onSuccess: () => {
        router.replace('/')
      },
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <FormProvider {...loginForm}>
        <View style={styles.formContainer}>
          <EmailInput />
          <PasswordInput />
        </View>
        <FixedBottomCta onPress={loginForm.handleSubmit(onSubmit)}>로그인하기</FixedBottomCta>
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
