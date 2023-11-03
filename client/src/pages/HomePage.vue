<template>
<div class="container-fluid">
  <div class="row mt-2">
    <div class="col-12 bg-dark">
      <div class="justify-content-around mt-3  text-center bg-dark">
        <button class="btn btn-outline text-light" @click="changeType('')">
          All
        </button>
        <div class="justify-content-around my-2 text-center d-flex">
        <button class="btn btn-outline text-light  my-2"  @click="changeType(type)" v-for="type in types" :key="type " >
          {{ type }}
        </button>
      </div>
      </div>
      </div >
  </div>
    
  <div class="row">
    <div v-for="event in events" :key="event.id" class="col-12 col-md-3 my-3 p-3">
    <EventsCard :eventProp="event"/>
    </div>
  </div>

</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import{eventsService} from '../services/EventsService.js'
import { AppState } from '../AppState.js';
import EventsCard from '../components/EventsCard.vue';
import { logger } from '../utils/Logger.js';

export default {
    setup() {
      const types = ['concert', 'convention', 'sport', 'digital'] 
      const filterType = ref("")
        onMounted(() => {
            getEvents();
        });
        async function getEvents() {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                Pop.error;
            }
        }
        return {
          types,
          filterType,

            events: computed(() => {
              if(filterType.value){
                return AppState.events.filter(
                  (event) => event.type == filterType.value
                )
            } else {
              return AppState.events
            }
            }),

            changeType(category){
              logger.log(category)
              filterType.value = category
            }
        };
    },
    components: { EventsCard }
}
</script>

<style scoped lang="scss">

</style>
