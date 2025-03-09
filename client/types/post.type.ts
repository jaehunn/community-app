import { User } from './user.type'
import { VoteOption } from './vote.type'

interface CreatePostDto {
  title: string
  description: string
  imageUris: ImageUri[]
  voteTitle?: string
  voteOptions?: VoteOption[]
}

interface Post {
  id: number
  userId: number
  title: string
  description: string
  createdAt: string
  author: User
  imageUris: ImageUri[]
  likes: { userId: number }[]
  hasVote: boolean
  voteCount: number
  commentCount: number
  viewCount: number
  votes?: PostVote[]
  comments?: PostComment[]
}

interface ImageUri {
  id?: number
  uri: string
}

interface PostVote {
  id: number
  title: string
  options: PostVoteOption[]
}

type PostVoteOption = VoteOption & { userVotes: { userId: number }[] }

interface PostComment extends Comment {
  replies: Comment[]
}

export type { Post, CreatePostDto, PostVote, PostVoteOption, PostComment, ImageUri }
