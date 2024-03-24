<template>
  <div class="quiz-question-container">
    <div class="input-with-button">
      <input
        type="text"
        name="question"
        placeholder="Question"
        class="quiz-question"
        :value="question.text"
        @change="handleQuestionTextChange"
      />
      <button type="button" @click="deleteQuestion(question.id)">x</button>
    </div>
    <div class="input-group">
      <select name="question-type" :value="question.type" @change="updateQuestionType">
        <option disabled value="">Please select question type</option>
        <option value="open">Open</option>
        <option value="single">Single choice</option>
        <option value="multiple">Multiple choice</option>
        <option value="likert">Likert scale</option>
      </select>
    </div>
    <QuestionMultiple
      v-if="question.type === 'single' || question.type === 'multiple'"
      :question="question"
      @onOptionAdded="handleOptionAdded"
      @onOptionRemoved="handleOptionRemoved"
      @onOptionUpdated="handleOptionUpdated"
    />
    <QuestionLikert
      v-if="question.type === 'likert'"
      :question="question"
      @onOptionAdded="handleOptionAdded"
      @onOptionRemoved="handleOptionRemoved"
      @onOptionUpdated="handleOptionUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import type Question from '../types/Question'

import QuestionMultiple from './QuestionMultiple.vue'
import QuestionLikert from './QuestionLikert.vue'
import type Option from '@/types/Option'

const _generateRandomId = (): number => {
  return Math.floor(Math.random() * 1000000)
}

const props = defineProps<{
  question: Question
}>()

const emit = defineEmits(['onDeleted', 'onUpdated'])

const deleteQuestion = (id: number) => {
  console.log('deleting question', id)
  emit('onDeleted', id)
}

const updateQuestionType = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const question = props.question
  question.type = target.value as 'open' | 'single' | 'multiple' | 'likert'
  emit('onUpdated', question)
}

const handleOptionAdded = (): void => {
  const question = props.question
  const option = {
    id: _generateRandomId(),
    value: ''
  }

  if (!question.options) {
    question.options = []
  }

  question.options.push(option)

  emit('onUpdated', question)
}

const handleOptionRemoved = (id: number): void => {
  const question = props.question

  if (question.options) {
    question.options = question.options.filter((option: Option) => option.id !== id)
  }

  emit('onUpdated', question)
}

const handleOptionUpdated = (updatedOption: Option): void => {
  const question = props.question

  if (question.options) {
    const optionIndex = question.options.findIndex(
      (option: Option) => option.id === updatedOption.id
    )
    question.options[optionIndex] = updatedOption
  }

  emit('onUpdated', question)
}

const handleQuestionTextChange = (e: Event): void => {
  const target = e.target as HTMLInputElement
  const question = props.question
  question.text = target.value

  emit('onUpdated', question)
}
</script>
