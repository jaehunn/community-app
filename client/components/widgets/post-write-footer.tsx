import { colors } from '@/constants/colors.constant'
import { StyleSheet, View } from 'react-native'
import { PressableText } from '../pressable-text'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { useUploadImages } from '@/queries/use-upload-images.mutation'
import { createFormData } from '@/utils/image.util'

export function PostWriteFooter() {
  const inset = useSafeAreaInsets()

  const { mutate: uploadImages } = useUploadImages()

  const handlePressImagePicker = async () => {
    /** @see https://docs.expo.dev/versions/latest/sdk/imagepicker/ */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // default, 안넣어도 됨.
      allowsMultipleSelection: true,
    })

    if (result.canceled) {
      return
    }

    const assetUris = result.assets.map((asset) => asset.uri)
    const formData = createFormData(assetUris)

    uploadImages(formData, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <PressableText
        variant="standard"
        size="medium"
        style={styles.footerIconContainer}
        onPress={handlePressImagePicker}
      >
        <Ionicons name="camera" size={20} color={colors.black} />
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
  footerIconContainer: {
    backgroundColor: colors.gray100,
    padding: 10,
    borderRadius: 5,
  },
})
