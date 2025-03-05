<script setup>
import { ref } from 'vue';

// define emited event
const emit = defineEmits(['updateMood']);
// reactive variable to track selected mood
const selectedMood = ref('');

// array of moods (stored in reactive ref)
const moods = ref([
  { name: 'Tired', emoji: '🥱' },
  { name: 'Sad', emoji: '🌧️' },
  { name: 'Angry', emoji: '🔥' },
  { name: 'Sick', emoji: '🤒' },
  { name: 'Frustrated', emoji: '💢' },
  { name: 'Calm', emoji: '🌿' },
  { name: 'Energetic', emoji: '⚡' },
  { name: 'Party Mood', emoji: '💃' },
  { name: 'Happy', emoji: '🌻' },
  { name: 'Restless', emoji: '🌪️' },
]);

// function to update selected mood when user clicks
const selectMood = (mood) => {
  selectedMood.value = mood; // updates reactive state
  emit('updateMood', selectedMood.value); // emit to parent component
  console.log('User selected mood:', selectedMood.value);
};
</script>

<template>
  <div id="mood-container" class="flex flex-wrap items-center justify-center">
    <!-- v-for to loop through moods and display each -->
    <p
      v-for="mood in moods"
      :key="mood.name"
      class="border-2 border-amber-400 p-2 m-1 rounded cursor-pointer"
      @click="selectMood(mood.name)"
      :class="{ 'bg-amber-400': selectedMood === mood.name }"
    >
      {{ mood.emoji }} {{ mood.name }}
    </p>
  </div>

  <!-- use v-if to display selectedMood when chosen -->
  <p v-if="selectedMood" class="mt-4 text-lg font-semibold text-blue-500">
    You selected: {{ selectedMood }}
  </p>
</template>
