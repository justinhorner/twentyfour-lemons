<script setup>
    import { onMounted, reactive } from 'vue';
    import eventsJson from '../assets/events.json';
    
    const data = reactive({ events: [] });

    onMounted(() => {
        console.log('RaceEvents mounted');
        console.log(`Found ${eventsJson?.length} events in json`);
        data.events = eventsJson;
    })

    function eventClicked(event) {
        console.log(event.target);
    }
</script>

<template>
    <div id="eventsContainer">
        <div 
            class="eventItem" 
            @click="eventClicked"
            v-for="event in data.events">
            <span>{{ event.name }}</span>
        </div>
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