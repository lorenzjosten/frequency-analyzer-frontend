<script setup lang="ts">
import TrackData from '@/model/track_data';
import Track from '@/model/track';
import { computed, ref } from '@vue/reactivity';
import { PropType, watch } from 'vue';

const audio = ref<HTMLAudioElement>();

const props = defineProps({
  currentData: {
    type: Object as PropType<TrackData>
  },
  currentTrack: {
    type: Object as PropType<Track>
  }
});

const file = computed(() => {
  if (props.currentData) {
    return new Blob([props.currentData.data], { type: 'audio/mpeg' });
  }
});

watch(file, () => playTrack());

function playTrack() {
  if (audio.value && file.value) {
    audio.value.src = URL.createObjectURL(file.value);
    audio.value.play();
  }
}
</script>

<template>
  <div class="player">
    <b>Player</b>
    <audio ref="audio" />
  </div>
</template>
