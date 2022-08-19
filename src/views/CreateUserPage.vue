<template>
  <UserForm :initialValues="initialValues" submitTitle="Add user" @onSubmit="onSubmit" />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import UserForm from '@/components/UserForm.vue';
import { IUser } from '@/models/index';
import { actionTypes } from '../store/modules/users';


const store = useStore();
const router = useRouter();

const initialValues = reactive({
  id: Date.now(),
  firstName: '',
  lastName: '',
  middleName: '',
  phoneNumber: '',
  email: '',
  tags: [],
});

const onSubmit = (values: IUser) => {
  store
    .dispatch(actionTypes.addUser, values)
    .then(() => router.push({ name: 'users' }));
};
</script>
