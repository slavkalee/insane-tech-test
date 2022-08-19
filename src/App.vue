<template>
  <div class="min-h-[100vh]	 overflow-x-hidden">
    <Topbar />
    <div class="w-[900px] my-[50px] mx-auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Topbar from '@/components/Topbar.vue';
</script>
