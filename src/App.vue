<template>
  <div class="quiz-container">
    <h1>Quiz creator!</h1>
    <p>Create awesome quizes right here, right now!</p>
    <div class="questions-container">
      <div class="input-group">
        <label for="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          :value="quiz.title"
          placeholder="Enter the title of the quiz"
          @change="handleQuizTitleChange"
        />
      </div>
      <QuizQuestion
        v-for="question in quiz.questions"
        :question="question"
        :key="question.id"
        @onDeleted="handleQuestionDeleted"
        @onUpdated="handleQuestionUpdated"
      />
      <button type="button" @click="handleAddQuestion" class="btn-add">Add Question</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Quiz from './types/Quiz'

import { onMounted, ref, type Ref } from 'vue'

import QuizQuestion from './components/QuizQuestion.vue'
import Question from './types/Question'

const _generateRandomId = (): number => {
  return Math.floor(Math.random() * 1000000)
}

const _saveQuiz = (): void => {
  localStorage.setItem('quiz', JSON.stringify(quiz.value))
}

onMounted((): void => {
  const quizFromLocalStorage: string | null = localStorage.getItem('quiz')
  if (quizFromLocalStorage) {
    quiz.value = JSON.parse(quizFromLocalStorage)
    return
  }
  _saveQuiz()
})

const quiz: Ref<Quiz> = ref({
  id: _generateRandomId(),
  title: '',
  questions: [
    {
      id: _generateRandomId()
    }
  ]
})

const handleQuizTitleChange = (e: Event): void => {
  const target = e.target as HTMLInputElement
  quiz.value.title = target.value
  _saveQuiz()
}

const handleAddQuestion = (): void => {
  const question: Question = {
    id: _generateRandomId()
  }

  quiz.value.questions.push(question)
  _saveQuiz()
}

const handleQuestionDeleted = (id: number): void => {
  const questions: Question[] = quiz.value.questions.filter(
    (question: Question) => question.id !== id
  )
  quiz.value.questions = questions
  _saveQuiz()
}

const handleQuestionUpdated = (updatedQuestion: Question): void => {
  const questionIndex: number = quiz.value.questions.findIndex(
    (question: Question) => question.id === updatedQuestion.id
  )
  quiz.value.questions[questionIndex] = updatedQuestion
  _saveQuiz()
}
</script>
