<template>
  <v-app>
    <!-- <default-bar /> -->
    <default-navigation />

    <default-view class="px-0"/>
  </v-app>
</template>

<script setup>
  // import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import DefaultNavigation from './Nav.vue'
  import { ref, provide } from 'vue';

const currentSection = ref('home');

provide('currentSection', currentSection);
  
</script>
<style scoped>

</style>
