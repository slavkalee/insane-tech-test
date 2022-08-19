<template>
  <div class="my-5">
    <div class="flex flex-col mb-5">
      <div class="mb-2">First name</div>
      <div class="font-bold">{{ data.firstName }}</div>
    </div>

    <div class="flex flex-col mb-5">
      <div class="mb-2">Last name</div>
      <div class="font-bold">{{ data.lastName }}</div>
    </div>

    <div class="flex flex-col mb-5">
      <div class="mb-2">Middle name</div>
      <div class="font-bold">{{ data.middleName }}</div>
    </div>

    <div class="flex flex-col mb-5">
      <div class="mb-2">Phone number</div>
      <div class="font-bold">{{ data.phoneNumber }}</div>
    </div>

    <div class="flex flex-col mb-5">
      <div class="mb-2">Email</div>
      <div class="font-bold">{{ data.email }}</div>
    </div>

    <div class="flex flex-col mb-5">
      <div class="mb-2">Tags</div>
      <div>
        <span
          v-for="tag in data.tags"
          :key="tag"
          class="py-1 px-1 bg-sky-400 text-xs text-white rounded-md mr-1"
          >{{ tag }}</span
        >
      </div>
    </div>

    <div class="flex justify-end">
      <button
        class="w-[150px] h-[50px] flex items-center justify-center rounded-md bg-yellow-500 text-white mr-2 hover:bg-yellow-600 disabled:bg-slate-200"
        @click="edit"
        :disabled="isSubmitting"
      >
        Edit user
      </button>
      <button
        class="w-[150px] h-[50px] flex items-center justify-center rounded-md bg-red-700 text-white hover:bg-red-800 disabled:bg-slate-200"
        @click="remove"
        :disabled="isSubmitting"
      >
        <Spinner v-if="isSubmitting" />
        <span v-else>Delete user</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, computed } from 'vue';
import { useStore } from 'vuex';

import { IUser } from '@/models/index';
import Spinner from '@/components/Spinner.vue';

const props = defineProps({
  data: { type: Object as PropType<IUser>, required: true },
});

const emit = defineEmits(['onRemove', 'onClickEdit']);

const store = useStore();

const isSubmitting = computed(() => store.state.users.isSubmitting);

const remove = () => {
  emit('onRemove');
};

const edit = () => {
  emit('onClickEdit');
};
</script>
