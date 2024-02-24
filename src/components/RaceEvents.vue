<script setup>
    import { onMounted, reactive } from 'vue';
    import eventsJson from '../assets/events.json';
    
    const data = reactive({ events: [] });

    onMounted(() => {
        console.log('RaceEvents mounted');
        console.log(`Found ${eventsJson?.length} events in json`);
        data.events = eventsJson;
    })
</script>

<template>
    <div id="eventsContainer">
        <li v-for="event in data.events">
            {{ event.name }}
        </li>
    </div>
</template>

<style scoped>
    #eventsContainer {
        padding: 0;
        margin: 0;
        height: 500px;
        overflow-y: scroll;
        width: 500px;
      }
</style>