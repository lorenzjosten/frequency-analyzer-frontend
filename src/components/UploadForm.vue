<script setup lang="ts">
const emit = defineEmits(['upload']);

async function upload(event: Event) {
  let fileForm = new FormData(event.target as HTMLFormElement);

  if (valid(fileForm)) {
    emit('upload', fileForm);
  }
}

function valid(fileForm: FormData): boolean {
  const hasFile = (form: FormData) => form.get('file') instanceof File;
  const getFile = (form: FormData) => form.get('file') as File;
  const validFile = (file: File) => file.name.length > 0 && file.size > 0;

  return hasFile(fileForm) && validFile(getFile(fileForm));
}
</script>
<template>
  <div class="mb-3">
    <form @submit.prevent="upload" enctype="multipart/form-data">
      <input
        class="form-control"
        type="file"
        accept="audio/mpeg"
        name="file"
        capture
      />
      <button type="submit" class="btn btn-primary">Upload</button>
    </form>
  </div>
</template>
