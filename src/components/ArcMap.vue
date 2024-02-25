<script setup>
import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import MapView from '@arcgis/core/views/MapView.js';
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import { onMounted } from "vue";

onMounted(() => {
  console.log(`the component is now mounted.`);
    // TODO: do we really need the API key???
    esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;

    const map = new Map({
        basemap: 'osm/standard',
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80500,34.02700], //Longitude, latitude
        zoom: 13,
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