<script setup>
import { onMounted, ref } from 'vue';

const emit = defineEmits(['updateWeather']);
const weather = ref('');

onMounted(() => {
  console.log('⏳ Weather.vue - Fetching weather data...'); // Debugging: Step 1

  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by your browser');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      console.log(
        '✅ Weather.vue - Got user location:',
        position.coords.latitude,
        position.coords.longitude
      ); // Debugging: Step 2

      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`;

      try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();

        weather.value = data;
        const weatherDescription = weather.value.weather[0].description;
        console.log('✅ Weather.vue - Weather Data Fetched:', weather.value); // Debugging: Step 3
        console.log(
          '✅ Weather.vue - Weather Description:',
          weather.value.weather[0].description
        );

        emit('updateWeather', weatherDescription); //  Emit to App.vue
        console.log(
          '✅ Weather.vue - Emitting weather data to App.vue:',
          weatherDescription
        ); // Debugging: Step 4
      } catch (error) {
        console.error('❌ Weather.vue - Error fetching weather:', error);
      }
    },
    (err) => {
      console.error('❌ Weather.vue - Error getting geolocation:', err.message);
    }
  );
});
</script>

<template>
  <div id="weather-output"></div>
</template>

<style></style>
