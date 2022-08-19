<template>
  <div>
    <UserProfile
      v-if="user"
      :data="user"
      @onRemove="removeUser"
      @onClickEdit="navigateToEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useCurrentUser } from '@/compositions/currentUser';

import UserProfile from '@/components/UserProfile.vue';

const router = useRouter();
const route = useRoute();
const { user, removeUser } = useCurrentUser(+route.params.id);

const navigateToEdit = () => {
  router.push({ name: 'editUser', params: { id: +route.params.id } });
};
</script>

<style lang="scss"></style>
