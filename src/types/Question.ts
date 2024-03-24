import type Option from '@/types/Option'

export default interface Question {
  id: number
  type?: 'open' | 'single' | 'multiple' | 'likert'
  text?: string
  options?: Option[]
}
