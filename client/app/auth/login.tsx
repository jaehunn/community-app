import { colors } from '@/constants/colors.constant'
import { InputField } from '@/components/input-field'
import { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { FixedBottomCta } from '@/components/widgets/fixed-bottom-cta'

export default function LoginScreen() {
  // const insets = useSafeAreaInsets()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <InputField
        label="이메일"
        placeholder="이메일을 입력해주세요."
        variant="fill"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <InputField
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        variant="fill"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <FixedBottomCta
        onPress={() => {
          // ...
        }}
      >
        로그인하기
      </FixedBottomCta>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
})
