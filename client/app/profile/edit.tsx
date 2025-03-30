import { baseUrls } from '@/apis/http'
import { PressableText } from '@/components/pressable-text'
import { FixedBottomCta } from '@/components/widgets/fixed-bottom-cta'
import { IntroduceInput } from '@/components/widgets/introduce-input'
import { NicknameInput } from '@/components/widgets/nickname-input'
import { colors } from '@/constants/colors.constant'
import { useGetMe } from '@/queries/use-get-me.query'
import { useUpdateProfile } from '@/queries/use-update-profile.mutation'
import { router } from 'expo-router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Image, Platform, StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message'

const AVATAR_SIZE = 154

type FormValues = {
  nickname: string
  introduce: string
}

export default function ProfileEditScreen() {
  const { data: me } = useGetMe()

  const editForm = useForm<FormValues>({
    defaultValues: {
      nickname: me?.nickname,
      introduce: me?.introduce,
    },
  })

  const { mutate: updateProfile } = useUpdateProfile()

  const submitValid: SubmitHandler<FormValues> = (values) => {
    // TODO: 프로필 업데이트 안되는 이슈 해결 필요.
    updateProfile(values, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: '프로필이 수정되었습니다.',
        })
      },
    })
  }

  return (
    <FormProvider {...editForm}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              me?.imageUri
                ? { uri: `${Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android}/${me.imageUri}` }
                : require('@/assets/images/default-avatar.png')
            }
          />

          <PressableText
            size="medium"
            variant="outline"
            style={styles.profileEditButton}
            onPress={() => {
              router.push('/profile/avatar')
            }}
          >
            프로필 이미지 변경
          </PressableText>
        </View>

        <View style={styles.formContainer}>
          <NicknameInput />
          <IntroduceInput />
        </View>

        <FixedBottomCta onPress={editForm.handleSubmit(submitValid)}>저장</FixedBottomCta>
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },

  // profile image
  avatarContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginTop: 16,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray500,
  },
  profileEditButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  // form
  formContainer: {
    // ...
  },
})
