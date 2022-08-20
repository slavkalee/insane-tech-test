<template>
  <div>
    <table class="border-collapse w-full">
      <thead class="bg-slate-50">
        <tr class="border-y">
          <th class="py-4 px-4 text-start">First name</th>
          <th class="py-4 px-4 text-start">Last name</th>
          <th class="py-4 px-4 text-start">Middle name</th>
          <th class="py-4 px-4 text-start">Phone number</th>
          <th class="py-4 px-4 text-start">Email</th>
          <th class="py-4 px-4 text-start">Tags</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in data"
          :key="item.id"
          @click="onClickRow(+item.id)"
          class="border-b hover:bg-gray-100 hover:cursor-pointer"
        >
          <td class="py-4 px-4">{{ item.firstName }}</td>
          <td class="py-4 px-4">{{ item.lastName }}</td>
          <td class="py-4 px-4">{{ item.middleName }}</td>
          <td class="py-4 px-4">{{ item.phoneNumber }}</td>
          <td class="py-4 px-4">{{ item.email }}</td>
          <td class="py-4 px-4">
            <div class="flex flex-wrap">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="py-1 px-1 bg-sky-400 text-xs text-white rounded-md mr-1 my-1"
              >
                {{ tag }}
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { useRouter } from 'vue-router';

import { IUser } from '../models/index';

const router = useRouter();

const props = defineProps({
  data: { type: Array as PropType<IUser[]>, required: true },
});

const onClickRow = (id: number) => {
  router.push({ name: 'user', params: { id } });
};
</script>
