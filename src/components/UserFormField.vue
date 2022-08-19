<template>
  <fieldset class="flex flex-col mb-5">
    <label class="mb-2">{{ title }}</label>
    <input
      type="text"
      :value="value"
      @input="handler($event)"
      class="border focus:outline-0 px-2 py-2 rounded-lg"
      :class="{
        'border-rose-600': error,
        'border-green-400	': valid,
      }"
      :placeholder="placeholder"
    />
    <span v-if="error" class="text-rose-600 mt-2">
      {{ errorText }}
    </span>
  </fieldset>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  title: { type: String, required: true },
  placeholder: { type: String, required: true },
  value: { type: String, required: true },
  valid: { type: Boolean, required: true },
  error: { type: Boolean, required: true },
  errorText: { type: String, required: true },
});

const emit = defineEmits(['onChange']);

const handler = (event: Event) => {
  emit('onChange', (event.target as HTMLInputElement).value, props.name);
};
</script>
