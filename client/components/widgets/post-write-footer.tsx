import { colors } from '@/constants/colors.constant'
import { Alert, StyleSheet, View } from 'react-native'
import { PressableText } from '../pressable-text'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { useUploadImages } from '@/queries/use-upload-images.mutation'
import { createFormData } from '@/utils/image.util'
import { useFormContext } from 'react-hook-form'
import { PostWriteFormValues } from '@/app/post/write'
import { ImageUri } from '@/types/post.type'
export function PostWriteFooter() {
  const formContext = useFormContext<PostWriteFormValues>()
  const inset = useSafeAreaInsets()

  const { mutate: uploadImages } = useUploadImages()

  // 기본은 중복을 허용하는 상태.
  const addImageUris = (imageUris: ImageUri[]) => {
    // limits
    if (formContext.getValues('imageUris').length + imageUris.length > 5) {
      Alert.alert('이미지는 최대 5개까지 추가할 수 있습니다.')

      return
    }

    // getValues() vs. watch()
    formContext.setValue('imageUris', [...formContext.getValues('imageUris'), ...imageUris])
  }

  const handlePressImagePicker = async () => {
    /** @see https://docs.expo.dev/versions/latest/sdk/imagepicker/ */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // default, 안넣어도 됨.
      allowsMultipleSelection: true,
    })

    if (result.canceled) {
      return
    }

    const formData = createFormData(result.assets)

    uploadImages(formData, {
      onSuccess: (data) => {
        const imageUris = data.data.map((uri) => ({ uri }))

        addImageUris(imageUris)
      },
      onError: (error) => {
        // console.error(error)
      },
    })
  }

  const handlePressVoteIcon = () => {
    formContext.setValue('isOpenVoteModal', true)
  }

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <PressableText
        variant="standard"
        size="medium"
        style={styles.cameraIconContainer}
        onPress={handlePressImagePicker}
      >
        <Ionicons name="camera" size={20} color={colors.black} />
      </PressableText>

      <PressableText variant="standard" size="medium" style={styles.voteIconContainer} onPress={handlePressVoteIcon}>
        <MaterialCommunityIcons name="vote" size={20} color={colors.black} />
      </PressableText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray300,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  cameraIconContainer: {
    backgroundColor: colors.gray100,
    padding: 10,
    borderRadius: 5,
  },
  voteIconContainer: {
    backgroundColor: colors.gray100,
    padding: 10,
    borderRadius: 5,
  },
})
