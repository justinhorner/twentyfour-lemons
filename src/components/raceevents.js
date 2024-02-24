import { ref } from 'vue'
import raceEvents from './assets/events.json';

export default {
    setup() {
        const events = ref(raceEvents);
        return { events }
    },
    data() {
        return {
            events: events
        }
    }
}