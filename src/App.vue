<script setup>
import RaceEvents from './components/RaceEvents.vue'
import Footer from './components/Footer.vue'
import IconLemon from './components/icons/IconLemon.vue';
</script>

<template>
  <header>
    <div class="header-logo">
      <!-- Todo: should this toggle map & list view? -->
      <IconLemon width="32" height="32"/>
    </div>
    <div class="header-title">
      <h1>24 Hours of Lemons Events</h1>
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

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
