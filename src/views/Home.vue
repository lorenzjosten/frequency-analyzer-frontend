<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { sendRequest } from '@/api/client';
import * as Events from '@/api/events';
import * as Request from '@/api/track_requests';
import * as Response from '@/api/track_responses';
import TrackList from '@/components/TrackList.vue';
import UploadForm from '@/components/UploadForm.vue';
import Track from '@/model/track';
import TrackData from '@/model/track_data';
import Player from '../components/Player.vue';

const trackList = ref(new Array<Track>());
const currentData = ref<TrackData>();
const currentTrack = ref<Track>();

Events.allFiles((track: Track) => trackList.value.push(track));

async function deleteTrack(track: Track) {
  sendRequest(
    new Request.Delete(track.id),
    () => (trackList.value = trackList.value.filter((t) => t !== track))
  );
}

async function uploadFile(fileForm: FormData) {
  sendRequest(new Request.Create(fileForm));
}

async function loadData(track: Track) {
  sendRequest(new Request.Data(track.id), (response: Response.Data) => {
    currentData.value = response.data;
    currentTrack.value = track;
  });
}
</script>

<template>
  <div class="home">
    <Player :currentData="currentData" :currentTrack="currentTrack" />
    <UploadForm @upload="uploadFile" />
    <TrackList :tracks="trackList" @select="loadData" @delete="deleteTrack" />
  </div>
</template>
