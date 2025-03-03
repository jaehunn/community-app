import { User } from './user.type'

interface Comment {
  id: number
  content: string
  createdAt: string
  user: User
  isDeleted: boolean
}

interface CreateCommentDto {
  content: string
  postId: number
  parentCommentId?: number
}

export type { Comment }
