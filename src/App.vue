<script setup lang="ts"></script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"
          ><img id="brand" src="@/assets/spectrum.png" alt="Power Spectrum"
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <body>
    <router-view />
  </body>
</template>

<style>
#brand {
  width: 30px;
  height: auto;
}
.router-link-active.nav-link {
  font-weight: bold;
}
.router-view {
  align-items: center;
  text-align: center;
}
</style>
