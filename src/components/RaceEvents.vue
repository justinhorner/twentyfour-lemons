<script setup>
    import { onMounted, reactive } from 'vue';
    import eventsJson from '../assets/events.json';
    import esriConfig from "@arcgis/core/config.js";
    import Map from "@arcgis/core/Map.js";
    import MapView from '@arcgis/core/views/MapView.js';
    import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
    import Graphic from "@arcgis/core/Graphic.js";
    
    const data = reactive({ events: [], positions: [] });

    onMounted(() => {
        console.log('RaceEvents mounted');
        console.log(`Found ${eventsJson?.length} events in json`);
        data.events = eventsJson;

        console.log(`the component is now mounted.`);
        // TODO: do we really need the API key???
        esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;

        const map = new Map({
            basemap: 'osm/standard',
        });

        const graphicsLayer = new GraphicsLayer();

        map.add(graphicsLayer);

        const centerLong = data.events[0].location.coordinates.longitude;
        const centerLat = data.events[0].location.coordinates.latitude;

        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [centerLong, centerLat], //Longitude, latitude
            zoom: 9,
        });

        //build points for map graphics
        data.events.forEach((e) => {
            const point = buildMapPointGraphic(e);
            graphicsLayer.add(point);
        });

    })

    function eventClicked(event) {
        console.log(event.target);
    }

    function buildMapPointGraphic(eventItem) {
        const point = { //Create a point
            type: "point",
            longitude: eventItem.location.coordinates.longitude,
            latitude: eventItem.location.coordinates.latitude
        };
        const simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40],  // Orange
            outline: {
                color: [255, 255, 255], // White
                width: 1
            }
        };

        const popupTemplate = {
            title: "{Name}",
            content: "{Description}"
        }
        const attributes = {
            Name: eventItem.name,
            Description: `${eventItem.eventCourse} | ${eventItem.dateInfo}`
        }

        const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
            attributes: attributes,
            popupTemplate: popupTemplate
        });

        return pointGraphic;
    }

    // function loadPositions() {
    //     let temps = [];
    //     data.events.forEach(event => {
    //         let tempData = event.location.coordinates;
    //         tempData.name = event.name;
    //         temps.push(tempData);
    //     });
    //     data.positions = temps;
    // }
</script>

<template>
    <div id="mapContainer">
        <div id="eventsContainer">
            <div 
                class="eventItem" 
                @click="eventClicked"
                v-for="event in data.events">
                <span>{{ event.name }}</span>
            </div>
        </div>
        <div id="viewDiv"></div>
    </div>
</template>

<style scoped>
@import "https://js.arcgis.com/4.28/@arcgis/core/assets/esri/themes/light/main.css";

#viewDiv {
        padding: 0;
        margin: 0;
        height: 500px;
        width: calc(100vw / 2);
    }

#mapContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#eventsContainer {
    padding: 0;
    margin: 0;
    height: 500px;
    overflow-y: scroll;
    width: 500px;
    direction: rtl;
}

.eventItem {
    direction: ltr;
    padding-left: 3%;
}
</style>