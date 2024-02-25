<script setup>
    import { onMounted, reactive, ref, watch } from 'vue';
    import eventsJson from '../assets/events.json';
    import esriConfig from "@arcgis/core/config.js";
    import Map from "@arcgis/core/Map.js";
    import MapView from '@arcgis/core/views/MapView.js';
    import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
    import Graphic from "@arcgis/core/Graphic.js";
    
    const data = reactive({ events: [], center: { longitude: 0.0, latitude: 0.0} });
    const mapCenter = ref([0, 0]);

    /** 
     * TODOs:
     * - [ ] get consumable dates added to the events (start / end)
     * - [ ] improve UI of events
     *   - [ ] make each event a div and include metadata about the event 
     *     - metadata should expand when 'selected' and be collapsed when !selected
     *   - [ ] gray-out items that are in the past
     *   - [ ] ensure the current / next event is the one selected
     * - [ ] add location button and support finding nearest event
     *   - https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
     *   - https://stackoverflow.com/questions/40560949/find-the-closest-coordinate-from-a-set-of-coordinates
     */

    onMounted(() => {
        console.log('RaceEvents mounted');
        console.log(`Found ${eventsJson?.length} events in json`);
        data.events = eventsJson;

        // TODO: do we really need the API key???
        esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;

        const map = new Map({
            basemap: 'osm/standard',
        });

        const graphicsLayer = new GraphicsLayer();

        map.add(graphicsLayer);

        const centerLong = data.events[0].location.coordinates.longitude;
        const centerLat = data.events[0].location.coordinates.latitude;

        mapCenter.value = [centerLong, centerLat];

        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: mapCenter.value, //Longitude, latitude
            zoom: 7,
        });

        // Watch for changes in the mapCenter value and update the map view
        watch(mapCenter, (newCenter) => {
            if (view) {
                view.goTo({
                    center: newCenter
                });
            }
        });

        //build points for map graphics
        data.events.forEach((e) => {
            const point = buildMapPointGraphic(e);
            graphicsLayer.add(point);
        });
    });

    function eventClicked(event) {
        const element = event.target;
        console.log(element.innerText);
        const selectedName = element.innerText;
        let selectedEvent = data.events.find(e => {
            return e.name === selectedName;
        });
        
        if (selectedEvent) {
            const long = selectedEvent.location.coordinates.longitude;
            const lat = selectedEvent.location.coordinates.latitude;
            mapCenter.value = [long, lat];
        }
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