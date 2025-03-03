interface VoteOption {
  id?: number
  displayPriority: number
  content: string
}

interface CreateVoteDto {
  postId: number
  voteOptionId: number
}

export type { VoteOption, CreateVoteDto }
