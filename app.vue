<template>
  <div>
    <iframe v-if="isWithinRadius" src="https://pinclick.formstack.com/forms/rosarito_test"></iframe>
    <div v-else>
      <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">No estás en Rosarito.</h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">Tienes que estar dentro de un radio de 10 km de Rosarito para acceder a esta encuesta.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Realizar otra encuesta</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">ver más <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const rosaritoCoords = { latitude: 32.36044, longitude: -117.04645 };
const RADIUS_KM = 10; // Radius in kilometers

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const isWithinRadius = ref(false);

function success(pos) {
  const crd = pos.coords;
  const distance = getDistanceFromLatLonInKm(crd.latitude, crd.longitude, rosaritoCoords.latitude, rosaritoCoords.longitude);
  console.log(`Distance from Rosarito: ${distance} km`);

  if (distance <= RADIUS_KM) {
    isWithinRadius.value = true;
  } else {
    isWithinRadius.value = false;
  }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  isWithinRadius.value = false; // Assume out of radius on error
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

onMounted(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {
    console.log("Geolocation is not supported by this browser.");
    isWithinRadius.value = false;
  }
});
</script>

<style>
body {
    margin: 0; /* Reset default margin */
}
iframe {
    display: block; /* iframes are inline by default */
    background: #000;
    border: none; /* Reset default border */
    height: 100vh; /* Viewport-relative units */
    width: 100vw;
}
</style>
