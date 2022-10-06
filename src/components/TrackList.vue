<script setup lang="ts">
import { watch, ref } from 'vue';
import Track from '@/model/track';
import Spinner from '@/components/Spinner.vue';

const props = defineProps({
  tracks: {
    type: Array<Track>,
    required: true,
    default: []
  }
});

const emit = defineEmits(['select', 'delete']);

const select = ref<Track>();

watch(select, (track) => {
  emit('select', track);
});

async function drop(track: Track) {
  emit('delete', track);
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
      <Spinner />
    </div>
    <div v-else>
      <tbody class="list-group">
        <tr>
          <td
            class="list-group-item"
            v-for="track in tracks"
            :key="track.id"
            :class="{ active: track === select }"
          >
            <input
              type="radio"
              name="trackSelection"
              class="btn-check"
              :value="track"
              v-model="select"
              :id="track.id.toString"
            />
            <div class="d-grid gap-2">
              <label class="btn-block" :for="track.id.toString">{{
                track.name
              }}</label>
              <button
                type="button"
                class="btn-close"
                @click.self="drop(track)"
              ></button>
            </div>
          </td>
        </tr>
      </tbody>
    </div>
  </table>
</template>

<style>
.btn-close {
  position: absolute;
  top: auto;
  right: 0;
}
</style>
