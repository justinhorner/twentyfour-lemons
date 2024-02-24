<script setup>
import Map from "@arcgis/core/Map.js";
import MapView from '@arcgis/core/views/MapView.js';
import { onMounted } from "vue";

onMounted(() => {
  console.log(`the component is now mounted.`);

    const map = new Map({
        center: [-56.049, 38.485],
        zoom: 3,
        basemap: 'gray',
    });

    const view = new MapView({
    container: "viewDiv",
    map: map
    });
})

</script>

<template>
    <div id="viewDiv"></div>
</template>

<style scoped>
@import "https://js.arcgis.com/4.28/@arcgis/core/assets/esri/themes/light/main.css";

#viewDiv {
        padding: 0;
        margin: 0;
        height: 500px;
        width: 500px;
      }
</style>