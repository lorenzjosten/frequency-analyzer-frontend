<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { sendRequest } from '@/api/client';
import * as Request from '@/api/file_requests';
import * as Response from '@/api/file_responses';
import TrackList from '@/components/TrackList.vue';
import UploadForm from '@/components/UploadForm.vue';
import Track from '@/model/track';

const tracks = ref<Track[]>();
const current = ref<Track>();

onMounted(() => getTracks());

async function getTracks() {
  sendRequest(new Request.FindAll(), (resp: Response.FindAll) => {
    tracks.value = resp.data;
  });
}

async function deleteTrack(track: Track) {
  tracks.value = tracks.value?.filter((t) => t !== track);
  sendRequest(new Request.Delete(track.id), () => getTracks());
}

async function uploadFile(fileForm: FormData) {
  sendRequest(new Request.Create(fileForm), () => getTracks());
}

async function setCurrent(track: Track) {
  current.value = track;
}
</script>

<template>
  <div class="home">
    <UploadForm @upload="uploadFile" />
    <TrackList :tracks="tracks" @select="setCurrent" @delete="deleteTrack" />
  </div>
</template>
