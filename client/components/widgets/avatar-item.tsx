import { baseUrls } from '@/apis/http'
import { colors } from '@/constants/colors.constant'
import { Dimensions, Image, Platform, Pressable, PressableProps, StyleSheet, View } from 'react-native'

interface Props extends PressableProps {
  uri: string
  isSelected: boolean
}

export function AvatarItem({ uri, isSelected, ...props }: Props) {
  return (
    <Pressable style={[styles.container, isSelected ? styles.selectedContainer : null]} {...props}>
      <Image
        source={{ uri: `${Platform.OS === 'ios' ? baseUrls.ios : baseUrls.android}/${uri}` }}
        style={styles.image}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.gray200,
  },
  selectedContainer: {
    borderColor: colors.orange200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
