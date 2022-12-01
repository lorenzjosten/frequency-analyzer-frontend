<script setup lang="ts"></script>

<template>

  <header>
    <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"><img id="brand" src="@/assets/spectrum.png" alt="Power Spectrum" /></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/">home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/about">about</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="flex-shrink-0">
    <div class="container">
      <router-view />
    </div>
  </main>

  <footer class="footer mt-auto py-5 bg-dark">
    <div class="container d-flex justify-content-end">
      <a href="https://gitlab.com/lj-work-sample" class="text-white text-decoration-underline">sources on gitlab</a>
    </div>
  </footer>

</template>

<style scoped>
#brand {
  width: 30px;
  height: auto;
}

.router-link-active.nav-link {
  color: #22ba58 !important;
  font-weight: bold;
}

.router-view {
  align-items: center;
  text-align: center;
}

body {
  height: 100%;
}

header {
  margin-bottom: 1em;
}
</style>
