import { colors } from '@/constants/colors.constant'
import { PostVoteOption } from '@/types/post.type'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface Props {
  option: PostVoteOption
  totalVoteCount: number
  isVoted: boolean
  isSelected: boolean
  onSelectOption: (optionId: number) => void
}

export function VoteOptions({ option, totalVoteCount, isVoted, isSelected, onSelectOption }: Props) {
  const percent = option.userVotes.length ? (option.userVotes.length / totalVoteCount) * 100 : 0

  const handleSelectOption = () => {
    onSelectOption(Number(option.id))
  }

  if (isVoted) {
    return (
      <View style={styles.votedContainer}>
        <View style={[styles.percent, { width: `${percent}%` }]} />

        <Text style={styles.content}>{option.content}</Text>
        <Text style={styles.percentText}>
          {percent}% ({option.userVotes.length})
        </Text>
      </View>
    )
  }

  return (
    <Pressable style={isSelected ? styles.selectedContainer : styles.container} onPress={handleSelectOption}>
      <Text style={styles.content}>{option.content}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  selectedContainer: {
    height: 44,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.orange600,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  votedContainer: {
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.orange200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  content: {
    marginLeft: 10,
  },
  percent: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 44,
    backgroundColor: colors.orange300,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  percentText: {
    marginRight: 10,
    fontWeight: 500,
  },
})
