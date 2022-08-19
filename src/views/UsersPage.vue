<template>
  <div>
    <div v-if="usersAreAvailable" class="table-container border rounded-lg">
      <Search :value="searchValue" @onChange="setSearchValue" />
      <UsersTable :data="users" />
    </div>
    <div class="flex justify-center items-center" v-else-if="isLoading">
      <Loader />
    </div>
    <div v-else>
      <NoData />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useSearch } from '@/compositions/search';

import UsersTable from '@/components/UsersTable.vue';
import Search from '@/components/Search.vue';
import Loader from '@/components/Loader.vue';
import NoData from '@/components/NoData.vue';

import { actionTypes } from '../store/modules/users';
import { getItem } from '../helpers/persistanceStorage';

const store = useStore();
const { searchValue, setSearchValue } = useSearch();

onMounted(() => {
  store.dispatch(actionTypes.getUsers, getItem('users') || []);
});

const isLoading = computed(() => store.state.users.isLoading);

const users = computed(() => {
  return store.getters.getDisplayData(searchValue.value);
});

const usersAreAvailable = computed(() => !!store.state.users.data.length);
</script>

<style lang="scss"></style>
