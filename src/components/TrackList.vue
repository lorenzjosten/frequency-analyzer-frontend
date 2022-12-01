<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { sendRequest } from '@/api/client';
import * as Request from '@/api/track_requests';
import * as Events from '@/api/events';
import Track from '@/model/track';
import Spinner from '@/components/Spinner.vue';

let source: EventSource | undefined = undefined
const tracks = reactive(new Array<Track>());
const selected = ref<Track>();
const selectedClass = ref("active bg-success border-0")

onMounted(() => {
  source = Events.tracks((track: Track) => {
    if (!tracks.includes(track)) tracks.push(track)
  })
})

onBeforeUnmount(() => {
  tracks.splice(0, tracks.length)
  if (source) source.close()
})

const emit = defineEmits(['select']);

async function onSelectTrack() {
  emit('select', selected.value);
}

async function onDeleteTrack(track: Track) {
  sendRequest(new Request.Delete(track.id), () => tracks.splice(tracks.indexOf(track), 1));
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Track Selection</th>
      </tr>
    </thead>
    <div v-if="tracks.length == 0">
      <Spinner :msg="'Upload a track.'" />
    </div>
    <div v-else>
      <tbody class="list-group">
        <tr>
          <td class="list-group-item" v-for="track in tracks" :key="track.id"
            :class="(track === selected) ? selectedClass : ''">
            <input type="radio" name="trackSelection" class="btn-check" :value="track" v-model="selected"
              @change="onSelectTrack" :id="track.id.toString()" />
            <div class="d-grid gap-2">
              <label class="btn-block" :for="track.id.toString()">{{
                  track.name
              }}</label>
              <button type="button" class="btn-close" @click.self="onDeleteTrack(track)" />
            </div>
          </td>
        </tr>
      </tbody>
    </div>
  </table>
</template>

<style scoped>
.btn-close {
  position: absolute;
  top: auto;
  right: 0;
}

.list-group {
  max-height: 250px;
  margin-bottom: 10px;
  overflow: scroll;
}
</style>
