<script setup lang="ts">
import HeaderBar from "@/components/header-bar.vue";
import NavBar from "@/components/nav-bar.vue";
</script>

<template>
  <div id="app">
    <HeaderBar />
    <div class="section columns">
      <NavBar />
      <main class="column">
        <router-view />
      </main>
    </div>
  </div>
</template>
