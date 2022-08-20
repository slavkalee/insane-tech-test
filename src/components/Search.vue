<template>
  <div class="py-4 px-4">
    <input
      type="text"
      class="w-full border focus:outline-0 px-2 py-2 rounded-lg"
      :value="value"
      @input="debouncedHandler($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { debounce } from 'lodash';

const props = defineProps({
  value: { type: String, required: true },
});

const emit = defineEmits(['onChange']);

const debouncedHandler = debounce((event: Event) => {
  emit('onChange', (event.target as HTMLInputElement).value);
}, 1000);
</script>
