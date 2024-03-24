import type Question from '@/types/Question'

export default interface Quiz {
  id: number
  title?: string
  questions: Question[]
}
