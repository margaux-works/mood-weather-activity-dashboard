<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['weather', 'mood']); // accept props from parent

// reactive variable
const activity = ref('');
const prompt = ref('');

// Debugging logs
console.log('⏳ Activity.vue - Received weather prop:', props.weather);
console.log('⏳ Activity.vue - Received mood prop:', props.mood);

// watch for changes of weather and mood
watch(
  [() => props.weather, () => props.mood],
  async ([newWeather, newMood]) => {
    console.log(
      '✅ Activity.vue - Watch triggered! New values:',
      newWeather,
      newMood
    );

    if (newWeather && newMood) {
      console.log('✅ Activity.vue - Valid weather and mood detected!');

      prompt.value = `Based on the ${newWeather} weather and the ${newMood} user's mood, suggest an activity in 2 sentences.`;

      console.log('🛠️ Activity.vue - Prompt set:', prompt.value);

      // ✅ Ensure prompt is valid before calling fetchActivity()
      if (prompt.value.trim() !== '') {
        console.log('🚀 Activity.vue - Calling fetchActivity()...'); // Debug log before calling API
        await fetchActivity();
      } else {
        console.error('❌ Activity.vue - Prompt is empty! Skipping API call.');
      }
    } else {
      console.log(
        '⚠️ Activity.vue - Waiting for valid weather and mood data...'
      );
    }
  }
);

async function fetchActivity() {
  console.log(
    '✅ Activity.vue  - Fetching activity with prompt:',
    prompt.value
  ); // Debug log

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiURL = 'https://api.openai.com/v1/chat/completions';
  const requestBody = JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant who suggests activities to do based on the weather and mood of the user. Activities should be original and specific. Use cultural & trendy references.',
      },
      {
        role: 'user',
        content: prompt.value,
      },
    ],
    max_tokens: 100,
  });

  console.log('🛠️ Activity.vue - Final JSON Request Body:', requestBody); // Debug log

  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: requestBody,
    });

    console.log('✅ Activity.vue - API Response received:', response.status); // Check if API responds

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Activity.vue - API Error:', data.error);
      throw new Error(
        `API Error: ${data.error?.message || response.statusText}`
      );
    }
    console.log('✅ Activity.vue - OpenAI Response:', data); // Debug log to check response content
    activity.value = data.choices[0].message.content.trim();
  } catch (error) {
    console.error('❌ Activity.vue - Error fetching activity:', error);
    activity.value =
      "⚠️ Sorry, we couldn't generate an activity at this moment. Please try again later.";
  }
}
</script>

<template>
  <div id="activity-container">
    <div>
      <h2 class="text-xl font-bold">Activity Suggestion</h2>
      <!-- Show the loading state while waiting for OpenAI response -->
      <p v-if="!activity && weather && mood" class="text-gray-500">
        Generating activity based on your mood and weather...
      </p>

      <!-- Show the suggested activity -->
      <p
        v-if="activity"
        class="mt-4 p-4 bg-green-100 border border-green-400 rounded"
      >
        {{ activity }}
      </p>
    </div>
  </div>
</template>
