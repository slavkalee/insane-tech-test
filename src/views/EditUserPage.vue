<template>
  <UserForm
    :initialValues="initialValues"
    submitTitle="Save"
    @onSubmit="editUser"
  />
</template>

<script setup lang="ts">
import { reactive } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useCurrentUser } from '../compositions/currentUser';

import UserForm from '@/components/UserForm.vue';

const route = useRoute();
const { user, editUser } = useCurrentUser(+route.params.id);

const initialValues = reactive({
  id: user.value.id,
  firstName: user.value.firstName,
  lastName: user.value.lastName,
  middleName: user.value.middleName,
  phoneNumber: user.value.phoneNumber,
  email: user.value.email,
  tags: user.value.tags,
});
</script>
