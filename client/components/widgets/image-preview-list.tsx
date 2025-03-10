import { Platform, ScrollView, StyleSheet } from 'react-native'
import { ImagePreviewItem } from './image-preview-item'
import { baseUrls } from '@/apis/http'
import { ImageUri } from '@/types/post.type'

interface Props {
  imageUris: ImageUri[]
}

export function ImagePreviewList({ imageUris }: Props) {
  return (
    // showsHorizontalScrollIndicator: false
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
      {imageUris.map(({ uri }, index) => {
        const imageUri = Platform.OS === 'ios' ? `${baseUrls.ios}/${uri}` : `${baseUrls.android}/${uri}`

        return <ImagePreviewItem key={`${imageUri}-${index}`} imageUri={imageUri} />
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    flexGrow: 1,
  },
})
