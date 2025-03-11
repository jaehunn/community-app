import { colors } from '@/constants/colors.constant'
import { useGetMe } from '@/queries/use-get-me.query'
import { PostVote } from '@/types/post.type'
import { Feather } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import { PressableText } from '../pressable-text'
import { VoteOptions } from './vote-options'
import { useCreateVote } from '@/queries/use-create-vote.mutation'

interface Props {
  postId: number
  postVotes: PostVote[]
  voteCount: number
}

export function Vote({ postId, postVotes, voteCount }: Props) {
  const { data: user } = useGetMe()

  const [selectedVoteId, setSelectedVoteId] = useState<number | null>(null)

  const { mutate: createVote } = useCreateVote()

  const handleSelectOption = (voteId: number) => {
    setSelectedVoteId(voteId)
  }

  const handleCreateVote = () => {
    if (selectedVoteId == null) return

    createVote(
      { postId, optionId: selectedVoteId },
      {
        onSuccess: () => {
          setSelectedVoteId(null)
        },
        onError: (error) => {
          //
        },
      }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelTitle}>투표</Text>
        <View style={styles.labelCountContainer}>
          <Feather name="user" size={14} color={colors.black} />
          <Text style={styles.labelCountText}>{voteCount}명 참여</Text>
        </View>
      </View>

      {postVotes.map((vote) => {
        const voteUserIds = vote.options.flatMap((option) => option.userVotes.map((user) => user.userId))

        const isVotedMe = voteUserIds.includes(Number(user?.id))

        return (
          <React.Fragment key={vote.id}>
            {vote.options.map((option) => {
              return (
                <VoteOptions
                  key={option.id}
                  option={option}
                  totalVoteCount={voteCount}
                  isVoted={isVotedMe}
                  isSelected={selectedVoteId === option.id}
                  onSelectOption={handleSelectOption}
                />
              )
            })}

            {!isVotedMe && (
              <PressableText variant="fill" size="large" disabled={selectedVoteId == null} onPress={handleCreateVote}>
                투표하기
              </PressableText>
            )}
          </React.Fragment>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    padding: 16,
    gap: 15,
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labelTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.orange600,
  },
  labelCountContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  labelCountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.black,
  },
})
