<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TrackList from '@/components/TrackList.vue';
import UploadForm from '@/components/UploadForm.vue';
import Player from '../components/Player.vue';
import Track from '@/model/track';
import PowerSpectrum from '@/components/PowerSpectrum.vue';

const trackId = ref<number | undefined>()
const trackName = ref<string | undefined>()
const trackPlayTime = ref(0.0) // [ms]

const startAnalysis = ref(false)
const stopAnalysis = ref(false)
const analysisStarted = ref(false)

onMounted(() => {
  trackId.value = undefined
  trackName.value = undefined
  trackPlayTime.value = 0.0
  startAnalysis.value = false
  stopAnalysis.value = false
  analysisStarted.value = false
})

async function onTrackSelected(track: Track) {
  trackId.value = track.id;
  trackName.value = track.name;

  stopAnalysis.value = true
}

async function onCanPlay() {
  stopAnalysis.value = false
  startAnalysis.value = true
}

async function onTrackEnded() {
  stopAnalysis.value = true
}

async function onAnalysisStarted(hasStarted: boolean) {
  if (hasStarted) startAnalysis.value = false
  analysisStarted.value = hasStarted;
}

async function onUpdateTrackPlayTime(time: number) {
  trackPlayTime.value = time;
}
</script>

<template>
  <div class="home flex-fill">
    <Player :track-id="trackId" :track-name="trackName" :analysis-started="analysisStarted" @can-play="onCanPlay"
      @update-time="onUpdateTrackPlayTime" @track-ended="onTrackEnded" />
    <PowerSpectrum :track-id="trackId" :start-analysis="startAnalysis" :stop-analysis="stopAnalysis"
      :track-play-time="trackPlayTime" @analysis-started="onAnalysisStarted" />
    <UploadForm />
    <TrackList @select="onTrackSelected" />
  </div>
</template>
