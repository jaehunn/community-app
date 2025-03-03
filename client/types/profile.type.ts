import { User } from './user.type'

interface Profile extends User {
  email: string
  introduce?: string
  hatId: string
  handId: string
  skinId: string
  topId: string
  faceId: string
  bottomId: string
  background: string
}

export type { Profile }
