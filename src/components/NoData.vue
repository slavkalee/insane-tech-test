<template>
  <div class="flex flex-col items-center">
    <div>
      <img
        class="w-[500px] h-[500px]"
        src="@/assets/images/nodata.svg"
        alt="no_data"
      />
    </div>
    <h1 class="text-3xl font-bold text-stone-600">
      There are no users. Add first
    </h1>
    <div>
      <router-link
        :to="{ name: 'createUser' }"
        class="w-[150px] h-[50px] flex items-center justify-center rounded-md bg-green-400 text-white hover:bg-green-500 disabled:bg-slate-200 mt-10"
      >
        Add user
      </router-link>
    </div>
  </div>
</template>
