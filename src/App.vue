<script setup>
import { ref } from 'vue';
import RaceEvents from './components/RaceEvents.vue'
import Footer from './components/Footer.vue'
import ImageButton from './components/ImageButton.vue'
import IconLemon from './components/icons/IconLemon.vue';
import IconLocate from './components/icons/IconLocate.vue';

const isMobileDevice = screen.width < 1024;
const logoIconSize = isMobileDevice ? 20 : 32;

const geoCoords = ref({latitude: null, longitude: null});

function requestLocation() {
  const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;

    geoCoords.value = {
      latitude: crd.latitude,
      longitude: crd.longitude
    };
  }

  function error(err) {
    alert('Oops, we failed to get the geolocation information.  Please try again later');
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

</script>

// TODO: add dark / light mode support
<template>
  <header>
    <div class="header-logo">
      <IconLemon :width="logoIconSize" :height="logoIconSize"/>
    </div>
    <div class="header-title">
      <h1>24hrs of Lemons Events</h1>
    </div>
    <div class="header-logo" >
      <ImageButton @click="requestLocation">
        <IconLocate :width="logoIconSize" :height="logoIconSize" color="white"/>
      </ImageButton>
    </div>
  </header>
  <div id="container">
    <RaceEvents :geoCoords="geoCoords" />
  </div>
  <Footer />
</template>

<style scoped>

header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 2vh 0 4vh 0;
    border-bottom: 1px solid var(--accent-color);
}

header .header-logo {
  padding: 0 2vw;
}

header .header-title {
  flex-grow: 1;
  text-align: center;
}

header .header-chunk {
	width: 160px;
}

#container {
  display: flex;
  width: 100%;
}

@media (max-width: 960px) and (max-width:480px) {
  header {
    display: flex;
    padding: 0;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  body {
    max-height: 100vh;
    overflow-y: hidden;
    overflow-x: hidden;
  }
}
</style>
