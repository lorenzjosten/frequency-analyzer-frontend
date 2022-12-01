<script setup lang="ts">
import { ref, computed } from '@vue/reactivity';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import TimeFormatter from '@/util/time_formatter';
import Spinner from '@/components/Spinner.vue';

const API_URL: string = import.meta.env.VITE_API_URL
const TIME_UPDATE_INTERVAL: number = import.meta.env.VITE_TIME_UPDATE_INTERVAL;

const props = defineProps({
  trackId: {
    type: Number,
    required: false
  },
  trackName: {
    type: String,
    required: false
  },
  analysisStarted: {
    type: Boolean,
    required: true
  }
});

const audio = new Audio();
const canPlay = ref(false)
const isPlaying = ref(false)
const formatter = new TimeFormatter();
const formattedTime = ref(formatter.format(0))
const playBtnIcon = computed(() => (
  {
    'bi-pause-circle': isPlaying.value,
    'bi-play-circle': !isPlaying.value
  }
))
const spinnerMsg = computed(() => {
  if (!props.trackId) {
    return "Select a track to analyse..."
  } else if (!canPlay.value) {
    return "Loading mp3..."
  } else if (!props.analysisStarted) {
    return "Analysing..."
  }
})

const emit = defineEmits(['update-time', 'track-ended', 'can-play'])

watch(() => props.trackId, (newTrack) => {
  if (newTrack) {
    stop()
    canPlay.value = false;
    audio.src = `${API_URL}/track/${newTrack}/data`;
  }
})

onMounted(() => {
  audio.onplay = onPlay
  audio.onpause = onPause
  audio.onended = onEnded
  audio.oncanplay = onCanPlay
})

onBeforeUnmount(() => stop())

async function onPlayBtnPressed() {
  if (!isPlaying.value && canPlay.value && props.analysisStarted) {
    audio.play()
  } else if (isPlaying.value) {
    audio.pause()
  }
}

let timeUpdate: NodeJS.Timer | undefined = undefined;

async function onPlay() {
  timeUpdate = setInterval(() => {
    const currentTime = isNaN(audio.currentTime) ? 0.0 : audio.currentTime * 1000;
    formattedTime.value = formatter.format(currentTime);
    emit('update-time', currentTime),
      TIME_UPDATE_INTERVAL
  })
  isPlaying.value = true;
}

async function onPause() {
  clearInterval(timeUpdate)
  isPlaying.value = false;
}

async function onEnded() {
  stop()
  emit('track-ended')
}

async function onCanPlay() {
  canPlay.value = true
  emit('can-play')
}

async function stop() {
  isPlaying.value = false
  audio.load()
}
</script>

<template>
  <div class="player border border-success d-flex justify-content-start flex-fill">
    <div class="p-2 controls">
      <button class="btn btn-success border-0" @click.prevent="onPlayBtnPressed">
        <i class="bi" :class="playBtnIcon"></i>
      </button>
    </div>
    <div v-if="spinnerMsg" class="flex-fill d-inline-flex justify-content-evenly align-items-center">
      <Spinner :msg="spinnerMsg" />
    </div>
    <div v-else class="flex-fill d-inline-flex justify-content-evenly align-items-center">
      <div class="track-name">
        {{ trackName }}
      </div>
      <div class="track-time">
        {{ formattedTime }}
      </div>
    </div>
  </div>
</template>
