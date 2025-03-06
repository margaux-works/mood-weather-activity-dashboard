<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['weather', 'mood']); // accept props from parent

// reactive variable
const activity = ref('');
const isLoading = ref(false);

// Watch for changes in mood and weather to fetch activity
watch(
  [() => props.weather, () => props.mood],
  async ([newWeather, newMood]) => {
    if (!newWeather || !newMood) return;

    isLoading.value = true; // Show loading animation

    setTimeout(async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        const apiURL = 'https://api.openai.com/v1/chat/completions';
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content:
                  'You are a helpful assistant who suggests activities to do based on the weather and mood of the user. Activities should be original and specific and fit in one sentence.',
              },
              {
                role: 'user',
                content: `Based on the ${newWeather} weather and the ${newMood} user's mood, suggest an activity.`,
              },
            ],
            max_tokens: 100,
          }),
        });

        const data = await response.json();
        activity.value =
          data.choices[0]?.message?.content ||
          '⚠️ Sorry, we couldn’t generate an activity at this moment.';
      } catch (error) {
        activity.value =
          '⚠️ Sorry, we couldn’t generate an activity at this moment.';
      } finally {
        isLoading.value = false; // Hide loading spinner after fetching
      }
    }, 1000); // 1-second delay to show loading animation
  }
);
</script>

<template>
  <div
    class="bg-grisLight text-white p-6 rounded-lg shadow-lg w-full max-w-2xl text-center mt-8 mx-auto justify-center min-h-[200px]"
  >
    <p class="text-md mb-4 text-center text-green uppercase tracking-widest">
      Suggestion of the Day
    </p>

    <!-- Dynamic Messages -->
    <p v-if="!props.mood" class="text-gray-400 mt-4">
      Select a mood and I will suggest an activity for you.
    </p>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="flex justify-center items-center mt-4">
      <svg
        class="animate-spin h-6 w-6 text-green"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2zm2 5.291A8.001 8.001 0 014 12H2a10.001 10.001 0 008 9.874v-2.083A8.003 8.003 0 016 17.291z"
        ></path>
      </svg>
    </div>

    <!-- (Only hidden while loading) -->
    <p v-else class="mt-4 text-lg font-semibold text-white">
      {{ activity }}
    </p>

    <!-- Decorative Separator -->
    <div
      class="border-t border-gray-700 mt-6 mx-auto w-2/3 flex items-center justify-center"
    >
      <span class="bg-grisLight px-2 -mt-3 text-xl text-gray-400"> 🔮 </span>
    </div>
  </div>
</template>
