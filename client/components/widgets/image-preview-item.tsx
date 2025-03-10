import { Image, StyleSheet } from 'react-native'
import { PressableText } from '../pressable-text'
import { router } from 'expo-router'

interface Props {
  imageUri: string
}

export function ImagePreviewItem({ imageUri }: Props) {
  return (
    <PressableText
      style={styles.container}
      size="small"
      variant="standard"
      onPress={() => {
        router.push({ pathname: '/image', params: { uri: imageUri } })
      }}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
    </PressableText>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
