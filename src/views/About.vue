<template>
  <div class="about d-flex h-100 flex-column">
    <h1 id="title">Work sample</h1>
    <p class="text-start">
      This work sample consists of a reactive Spring Boot backend application with a vue.js frontend. It can be used to
      upload and play a mp3 media file. Also, the power spectrum of the current track is shown.
      Uploaded media files are persisted in a file based h2 database in your local app folder. It can be deleted safely
      once the app has shut down. Used technologies include:
    </p>

    <ul class="list-group text-start">
      <li class="list-group-item">reactive programming</li>
      <li class="list-group-item">data streaming</li>
      <li class="list-group-item">server sent events</li>
      <li class="list-group-item">spring boot</li>
      <li class="list-group-item">kotlin</li>
      <li class="list-group-item">vue.js</li>
      <li class="list-group-item">typescript</li>
      <li class="list-group-item">gitlab pipelining</li>
      <li class="list-group-item">liquibase</li>
    </ul>
  </div>
</template>

<style scoped>
#title {
  color: #22ba58;
}
</style>