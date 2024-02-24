<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ArcMap from './components/ArcMap.vue'
import RaceEvents from './components/RaceEvents.vue'
</script>

<template>
  <header>
    <h1>24 Hours of Lemons Events</h1>
  </header>
  <div id="container">
    <div id="mapContainer">
      <RaceEvents />
      <ArcMap />
    </div>
    
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

#container {
  display: flex;
  width: 100%;
}

#mapContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
