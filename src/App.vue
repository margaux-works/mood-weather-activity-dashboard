<script setup>
import Weather from './components/Weather.vue';
import Mood from './components/Mood.vue';
import Activity from './components/Activity.vue';
import { ref } from 'vue';

const selectedMood = ref('');
const weather = ref('');

console.log('⏳ App.vue - Initial Weather State:', weather.value);

const updateWeather = (description) => {
  weather.value = description; // ✅ Store only the description
  console.log('✅ App.vue - Weather Updated:', weather.value);
};

const updateMood = (mood) => {
  selectedMood.value = mood;
  console.log('✅ App.vue - Mood Updated:', selectedMood.value);
};
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-200">
    <h1 class="text-4xl font-bold text-red-500 p-2">Activity Generator 🚀</h1>

    <Weather @updateWeather="updateWeather" />
    <Mood @updateMood="updateMood" />
    <Activity :weather="weather" :mood="selectedMood" />
  </div>
</template>
