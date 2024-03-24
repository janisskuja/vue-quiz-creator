<template>
  <div class="question-likert-scale-column">
    <div class="question-likert-scale-row">
      <div class="likert-scale"></div>
      <div class="question-options-container">
        <div class="input-with-button" v-for="option in question.options" :key="option.id">
          <input
            type="text"
            name="option"
            placeholder="Option"
            class="quiz-question"
            :value="option.value"
            @change="(e) => onOptionUpdated(e, option)"
          />
          <button type="button" class="btn-delete" @click="onRemoveOption(option.id)">x</button>
        </div>
      </div>
    </div>
    <button type="button" class="btn-add" @click="onAddOption">Add option</button>
  </div>
</template>

<script setup lang="ts">
import type Question from '../types/Question'

defineProps<{
  question: Question
}>()

const emit = defineEmits(['onOptionAdded', 'onOptionRemoved', 'onOptionUpdated'])

const onAddOption = (): void => {
  emit('onOptionAdded')
}

const onRemoveOption = (id: number): void => {
  emit('onOptionRemoved', id)
}

const onOptionUpdated = (e: Event, option: Option): void => {
  const target = e.target as HTMLInputElement;
  option.value = target.value;
  emit('onOptionUpdated', option)
}
</script>
