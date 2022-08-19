<template>
  <nav
    class="bg-sky-900 text-white px-4 py-6 flex justify-between items-center"
  >
    <router-link :to="{ name: 'users' }">
      <div class="text-2xl font-bold">
        Insane Tech App
      </div>
    </router-link>

    <ul class="flex">
      <li class="mr-5">
        <router-link :to="{ name: 'users' }" active-class="font-bold" exact
          >Home</router-link
        >
      </li>
      <li class="mr-5">
        <router-link :to="{ name: 'createUser' }" active-class="font-bold"
          >Add user</router-link
        >
      </li>
    </ul>
  </nav>
</template>
