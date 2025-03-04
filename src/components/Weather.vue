<script>
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  console.log(`Latitude: ${lat}, Longitude: ${lon}`);
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

navigator.geolocation.getCurrentPosition(success, error);

const apiUrl =
  'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={apiKey}';
</script>

<template></template>

<style></style>
