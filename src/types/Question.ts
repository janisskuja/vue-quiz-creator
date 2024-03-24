import type Option from '@/types/Option'
import type QuestionType from '@/types/QuestionType'

export default interface Question {
  id: number
  type?: 'open' | 'single' | 'multiple' | 'likert'
  text?: string
  options?: Option[]
}
