<template>
  <form class="my-5">
    <UserFormField
      name="firstName"
      title="First name"
      placeholder="Enter first name"
      :value="values.firstName"
      :valid="v$.firstName.$dirty && !v$.firstName.required.$invalid"
      :error="v$.firstName.$error"
      :errorText="v$.firstName.required.$message"
      @onChange="handleChange"
    />

    <UserFormField
      name="lastName"
      title="Last name"
      placeholder="Enter last name"
      :value="values.lastName"
      :valid="v$.lastName.$dirty && !v$.lastName.required.$invalid"
      :error="v$.lastName.$error"
      :errorText="v$.lastName.required.$message"
      @onChange="handleChange"
    />

    <UserFormField
      name="middleName"
      title="Middle name"
      placeholder="Enter middle name"
      :value="values.middleName"
      :valid="v$.middleName.$dirty && !v$.middleName.required.$invalid"
      :error="v$.middleName.$error"
      :errorText="v$.middleName.required.$message"
      @onChange="handleChange"
    />

    <UserFormField
      name="phoneNumber"
      title="Phone number"
      placeholder="+998(9X)XXXXXXX"
      :value="values.phoneNumber"
      :valid="v$.phoneNumber.$dirty && !v$.phoneNumber.required.$invalid"
      :error="v$.phoneNumber.$error"
      :errorText="v$.phoneNumber.required.$message"
      @onChange="handleChange"
    />

    <UserFormField
      name="email"
      title="Email"
      placeholder="JohnDoe@mail.ru"
      :value="values.email"
      :valid="v$.email.$dirty && !v$.email.required.$invalid"
      :error="v$.email.$error"
      :errorText="
        v$.email.email.$invalid
          ? v$.email.email.$message
          : v$.email.required.$message
      "
      @onChange="handleChange"
    />

    <UserFormField
      name="tags"
      title="Enter tags"
      placeholder="Enter tags"
      :value="values.tags"
      :valid="v$.tags.$dirty && !v$.tags.required.$invalid"
      :error="v$.tags.$error"
      :errorText="v$.tags.required.$message"
      @onChange="handleChange"
    />

    <div class="flex justify-end">
      <button
        type="button"
        class="w-[150px] h-[50px] flex items-center justify-center rounded-md bg-green-400 text-white hover:bg-green-500 disabled:bg-slate-200"
        :disabled="(v$.$invalid && v$.$dirty) || isSubmitting"
        @click="submit"
      >
        <Spinner v-if="isSubmitting" />
        <span v-else>{{ submitTitle }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, computed } from 'vue';
import { useStore } from 'vuex';
import { useForm } from '@/compositions/form';

import { IUser } from '@/models/index';
import Spinner from '@/components/Spinner.vue';
import UserFormField from '@/components/UserFormField.vue';

const { initialValues } = defineProps({
  initialValues: { type: Object as PropType<IUser>, required: true },
  submitTitle: { type: String, required: false, default: 'Submit' },
});

const emit = defineEmits(['onSubmit']);

const store = useStore();

const { values, v$, handleChange } = useForm(initialValues);

const isSubmitting = computed(() => store.state.users.isSubmitting);

const submit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  const formValues = {
    id: values.id,
    firstName: values.firstName,
    lastName: values.lastName,
    middleName: values.middleName,
    phoneNumber: values.phoneNumber,
    email: values.email,
    tags: values.tags.split(' '),
  };

  emit('onSubmit', formValues);
};
</script>
