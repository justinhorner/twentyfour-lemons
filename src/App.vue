<script setup>
import RaceEvents from './components/RaceEvents.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <header>
    <h1>24 Hours of Lemons Events</h1>
  </header>
  <div id="container">
    <RaceEvents />
  </div>
  <Footer />
</template>

<style scoped>

header {
  line-height: 3;
  max-height: 100vh;
  padding: 2vh 0vh;
  align-items: center;
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
