<script setup>
    import { onMounted, reactive, ref, watch } from 'vue';
    import eventsJson from '../assets/events.json';
    import esriConfig from "@arcgis/core/config.js";
    import Map from "@arcgis/core/Map.js";
    import MapView from '@arcgis/core/views/MapView.js';
    import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
    import Graphic from "@arcgis/core/Graphic.js";
    import IconExternalLink from './icons/IconExternalLink.vue';
    import IconMapPoint from './icons/IconMapPoint.vue';

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
        const tempEvents = buildEventObjects();
        const sortedEvents = [...tempEvents].sort(e => e.startDate);
        data.events = sortedEvents;

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

    function getEventByName(eventName) {
        let selectedEvent = data.events.find(e => {
            return e.name === eventName;
        });
        return selectedEvent;
    }


    function processEventSelection(eventItem) {
        const long = eventItem.location.coordinates.longitude;
        const lat = eventItem.location.coordinates.latitude;
        mapCenter.value = [long, lat];
    }

    function eventClicked(event) {
        const element = event.target;
        console.log(element.innerText);
        const selectedEvent = getEventByName(element.innerText);
        
        if (selectedEvent) {
            processEventSelection(selectedEvent);
        }
    }

    function eventIconClicked(eventName, event) {
        console.log(`You clicked and icon. ${eventName}`);
        const selectedEvent = getEventByName(eventName);
        
        if (selectedEvent) {
            processEventSelection(selectedEvent);
        }
    }

    /**
     * Builds the raceEvent and adds start and end Date()
     */
    function buildEventObjects() {
        let raceEvents = [];
        eventsJson.forEach(event => {
            const re = /([A-Za-z]{3})\s(\d+)\s-\s([A-Za-z]{3})\s(\d+),\s(\d+)/g;
            let dateInfoStr = event.dateInfo;
            const matches = [...dateInfoStr.matchAll(re)][0];
            let startDate = new Date(`${matches[1]} ${matches[2]} ${matches[5]}`);
            let endDate = new Date(`${matches[3]} ${matches[4]} ${matches[5]}`);
            let temp = JSON.parse(JSON.stringify(event));
            temp.dates = {
                startDate: startDate,
                endDate: endDate
            };


            raceEvents.push(temp);
        })
        return raceEvents;
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
                <h5>{{ event.name }}</h5>
                <div class="eventMetadata">
                    <div>When: {{ event.dateInfo }}</div>
                    <div>Where: {{ event.eventCourse }}</div>
                    <div class="mapPointLink" @click="eventIconClicked(event.name, $event)">
                        <IconMapPoint width="32" height="32" />
                    </div>
                    <div class="externalLink">
                        <a 
                            :href="event.url" 
                            target="_blank"
                            alt="Link to race on 24 Hours of Lemon site">
                            <IconExternalLink width="32" height="32" />
                        </a>
                    </div>
                </div>
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
    padding: 10px 0px 10px 3%;
    border: 1px solid lightgray;
    border-radius: 5px;
    margin: 0 5px 5px 0;
    margin-bottom: 10px;
    position: relative;
}

.eventMetadata {
    padding-left: 5%;
}

.externalLink {
    position: absolute;
	bottom: 0;
    right:0;
}

.mapPointLink {
    position: absolute;
	top: 5px;
    right:0;
}

h5 { 
    font-size: 20px;
    font-weight: 700;
}
</style>