<script setup>
import RaceEvents from './components/RaceEvents.vue'
import Footer from './components/Footer.vue'
import IconLemon from './components/icons/IconLemon.vue';

const isMobileDevice = screen.width < 1024;
const logoIconSize = isMobileDevice ? 20 : 32;

</script>

<template>
  <header>
    <div class="header-logo">
      <IconLemon :width="logoIconSize" :height="logoIconSize"/>
    </div>
    <div class="header-title">
      <h1>24hrs of Lemons Events</h1>
    </div>
    <!-- Todo: add Location icon and support finding nearest event -->
  </header>
  <div id="container">
    <RaceEvents />
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
