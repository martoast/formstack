<template>
  <div>
    <iframe v-if="isWithinRadius" src="https://pinclick.formstack.com/forms/rosarito_test"></iframe>
    <div v-else>
      <p>You must be within a 10km radius of Rosarito to access this page.</p>
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
