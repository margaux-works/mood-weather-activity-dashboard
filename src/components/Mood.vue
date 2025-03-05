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
  { name: 'Lazy', emoji: '🦥' },
  { name: 'Frustrated', emoji: '💢' },
  { name: 'Calm', emoji: '🌿' },
  { name: 'Energetic', emoji: '⚡' },
  { name: 'Party Mood', emoji: '💃' },
  { name: 'Inspired', emoji: '🌠' },
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
  <div
    id="mood-container"
    class="grid grid-cols-3 md:grid-cols-4 gap-2 w-full max-w-2xl mx-auto justify-center text-center"
  >
    <!-- v-for to loop through moods and display each -->
    <p
      v-for="mood in moods"
      :key="mood.name"
      class="border-1 border-green px-4 py-2 text-center rounded cursor-pointer transition-all duration-300"
      @click="selectMood(mood.name)"
      :class="{
        'bg-green text-[#202733]': selectedMood === mood.name,
        'hover:bg-green hover:text-gris': selectedMood !== mood.name,
      }"
    >
      {{ mood.emoji }} {{ mood.name }}
    </p>
  </div>
</template>
