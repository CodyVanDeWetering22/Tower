<template>
    
    <div class="modal fade" id="createEventModal" tabindex="-1" aria-labelledby="createEventModal" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="createEventModal">Create Event</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="modal-body">
        <form @submit.prevent="createEvent()">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="editable.name"  type="text" class="form-control" id="name" required maxlength="500">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">description</label>
            <input v-model="editable.description"  type="text" class="form-control" id="description" required maxlength="500">
        </div>
        <div class="mb-3">
            <label for="coverImg" class="form-label">Cover Image</label>
            <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg" required maxlength="500">
        </div>
        <div class="mb-3">
            <label for="startDate">Start Date</label>
            <input v-model="editable.startDate" id="startDate" class="form-control" type="date" />
        </div>
        <div class="mb-3">
            <label for="location" class="form-label">location</label>
            <input v-model="editable.location" type="text" class="form-control" id="location" required maxlength="500">
        </div>
        <div class="mb-3">
            <select v-model="editable.type" class="form-select" aria-label="Default select example">
                <option  v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>
        </div>
        <div class="mb-3">
            <label for="capacity" class="form-label">Capacity</label>
            <input v-model="editable.capacity"  type="text" class="form-control" id="capacity" required>
        </div>
        <div class="mb-3">
            <label class="form-check-label text-center" for="flexCheckDefault">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                Canceled?
            </label>
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
        </form>
        </div>
        </div>
    </div>
    </div>
    </div>
</template>


<script>
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';
import { ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import { router } from '../router.js';
import { useRouter } from 'vue-router';


export default {
    setup(){
        const router = useRouter()
        const editable = ref({})

    return { 
        types: ['sport', 'concert', 'digital', 'convention'],
        editable,

    async createEvent() {
    try {
        const eventData = editable.value
        await eventsService.createEvent(eventData)
        
        editable.value = {}
        
        Modal.getOrCreateInstance('#createEventModal').hide()
        router.push({ name: "Event", params: { eventId: event.Id } });
    } catch (error) {
        Pop.error(error)
    }
    }
};
    }
}
</script>


<style lang="scss" scoped>

</style>