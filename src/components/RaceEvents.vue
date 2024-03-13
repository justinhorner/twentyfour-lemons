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
    const selectedEventName = ref('');

    /** 
     * TODOs:
     * - [ ] add location button and support finding nearest event
     *   - https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
     *   - https://stackoverflow.com/questions/40560949/find-the-closest-coordinate-from-a-set-of-coordinates
     */

    onMounted(() => {
        //console.log('RaceEvents mounted');
        //console.log(`Found ${eventsJson?.length} events in json`);
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

        const initialIndex = getInitialSelectedEventIndex();
        const centerLong = data.events[initialIndex].location.coordinates.longitude;
        const centerLat = data.events[initialIndex].location.coordinates.latitude;

        processEventSelection(centerLong, centerLat, data.events[initialIndex].name);

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

        view.on('click', function(event) {
            let screenPoint = {
                x: event.x,
                y: event.y
            };

            // find graphics at the location
            view.hitTest(screenPoint)
                .then((response) => {
                    if (response.results.length) {
                        let graphic = response.results.filter((result) => 
                            result.graphic.layer === graphicsLayer)[0].graphic;
                        handleMapPointClick(graphic.attributes.Name);
                    }
                })
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

    function processEventSelection(longitude, latitude, eventName) {
        // TODO: add re-zoom when this happens
        mapCenter.value = [longitude, latitude];
        selectedEventName.value = eventName;
    }

    function eventClicked(event) {
        const element = event.target;
        //console.log(element.innerText);
        const selectedEvent = getEventByName(element.innerText);
        
        if (selectedEvent) {
            processEventSelection(
                selectedEvent.location.coordinates.longitude,
                selectedEvent.location.coordinates.latitude,
                selectedEvent.name);
        }
    }

    function eventIconClicked(eventName, event) {
        event.preventDefault();
        console.log(`You clicked and icon. ${eventName}`);
        const selectedEvent = getEventByName(eventName);
        
        if (selectedEvent) {
            processEventSelection(
                selectedEvent.location.coordinates.longitude,
                selectedEvent.location.coordinates.latitude,
                selectedEvent.name);
        }
    }

    function handleMapPointClick(eventName) {
        const selectedEvent = getEventByName(eventName);
        if (selectedEvent) {
            processEventSelection(
                selectedEvent.location.coordinates.longitude,
                selectedEvent.location.coordinates.latitude,
                selectedEvent.name);

            document.getElementById(selectedEvent.key).scrollIntoView();
        }
    }

    /**
     * Builds the raceEvent and adds start and end Date()
     */
    function buildEventObjects() {
        let raceEvents = [];
        eventsJson.forEach((eventItem, i) => {
            const re = /([A-Za-z]{3})\s(\d+)\s-\s([A-Za-z]{3})\s(\d+),\s(\d+)/g;
            let dateInfoStr = eventItem.dateInfo;
            const matches = [...dateInfoStr.matchAll(re)][0];
            let startDate = new Date(`${matches[1]} ${matches[2]} ${matches[5]}`);
            let endDate = new Date(`${matches[3]} ${matches[4]} ${matches[5]}`);
            let temp = JSON.parse(JSON.stringify(eventItem));
            temp.dates = {
                startDate: startDate,
                endDate: endDate
            };
            // add a key for uniqueness & id
            temp.key = `eventItem_${i}`;

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

    function getEventClass(eventItem) {
        return eventItem.name === selectedEventName.value
            ? 'eventItem eventItemSelected'
            : 'eventItem';
    }

    function getInitialSelectedEventIndex() {
        let index = 0;
        for (let i = 0; i < data.events.length; i++) {
            if (new Date(Date.now()) < data.events[i].dates.endDate) {
                index = i;
                break;
            }
        }
        return index;
    }
</script>

<template>
    <div id="mapContainer">
        <div id="eventsContainer">
            <div 
                @click="eventClicked"
                v-for="eventItem in data.events"
                :key="eventItem.key"
                :id="eventItem.key"
                :class="getEventClass(eventItem)">
                <h5>{{ eventItem.name }}</h5>
                <div class="eventMetadata">
                    <div>When: {{ eventItem.dateInfo }}</div>
                    <div>Where: {{ eventItem.eventCourse }}</div>
                    <div class="mapPointLink" @click="eventIconClicked(eventItem.name, $event)">
                        <IconMapPoint width="32" height="32" />
                    </div>
                    <div class="externalLink">
                        <a 
                            :href="eventItem.url" 
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
    border: 1px solid rgb(72, 72, 72);
    border-radius: 5px;
    margin: 0 5px 5px 0;
    margin-bottom: 10px;
    position: relative;
    cursor: pointer;
}

.eventItemSelected {
    border: 2px solid var(--accent-color);
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