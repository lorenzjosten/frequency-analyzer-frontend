<script setup lang="ts">
import { sendRequest } from '@/api/client';
import * as Request from '@/api/track_requests'

async function upload(event: Event) {
  let fileForm = new FormData(event.target as HTMLFormElement);

  if (valid(fileForm)) {
    sendRequest(new Request.Create(fileForm));
  }
}

function valid(fileForm: FormData): boolean {
  const hasFile = (form: FormData) => form.get('file') instanceof File;
  const getFile = (form: FormData) => form.get('file') as File;
  const hasData = (file: File) => file.name.length > 0 && file.size > 0;

  return hasFile(fileForm) && hasData(getFile(fileForm));
}
</script>

<template>
  <form @submit.prevent="upload" enctype="multipart/form-data">
    <div class="form-group row">
      <div class="col-md-9">
        <input class="form-control" type="file" accept="audio/mpeg" name="file" capture />
      </div>
      <div class="col-md-3">
        <button class="btn btn-success form-control" type="submit">Upload</button>
      </div>
    </div>
  </form>
</template>
