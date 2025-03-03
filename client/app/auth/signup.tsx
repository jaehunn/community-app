import { InputField } from '@/components/input-field'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/colors.constant'
import { FixedBottomCta } from '@/components/widgets/fixed-bottom-cta'

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <InputField label="이메일" placeholder="이메일을 입력해주세요." variant="fill" />
      <InputField label="비밀번호" placeholder="비밀번호를 입력해주세요." variant="fill" />
      <InputField label="비밀번호 확인" placeholder="비밀번호를 입력해주세요." variant="fill" />

      <FixedBottomCta
        onPress={() => {
          // ...
        }}
      >
        회원가입하기
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
