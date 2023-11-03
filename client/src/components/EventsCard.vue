<template>
    <div class="card bg-dark">
        <router-link :to="{name:'Event', params: {eventId: eventProp.id}}">
            <img class="img-fluid eventImg rounded"  :src="eventProp.coverImg" alt="Cover Img">
        </router-link>
    <div class="d-flex justify-content-center shadow border" type="button">
</div>
<h1 class="text-center my-2 fs-3">{{ eventProp.name }}</h1>
</div>
</template>


<script>
import { RouterLink } from 'vue-router';
import { Event } from '../models/Event.js';
export default {
    props: { eventProp: { type: Event, required: true } },
    setup() {
        return {};
    },
    components: { RouterLink }
}; 
</script>


<style lang="scss" scoped>
.eventImg{
    height: 25vh;
    width: 100%;
    object-fit: cover;
    object-position: center;

}
</style>