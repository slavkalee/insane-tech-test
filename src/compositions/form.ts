import { reactive, computed, watchEffect } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

import { IUser } from '../models/index';

type Values = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  email: string;
  tags: string;
};

export function useForm(initialValues: IUser) {
  const values: Values = reactive({
    id: initialValues.id + '',
    firstName: initialValues.firstName,
    lastName: initialValues.lastName,
    middleName: initialValues.middleName,
    phoneNumber: initialValues.phoneNumber,
    email: initialValues.email,
    tags: initialValues.tags.join(' '),
  });

  const rules = computed(() => ({
    id: {},
    firstName: { required },
    lastName: { required },
    middleName: { required },
    phoneNumber: { required, minLength: minLength(14) },
    email: { required, email },
    tags: { required },
  }));

  const v$ = useVuelidate(rules, values);

  const handleChange = (value: string, fieldName: string) => {
    values[fieldName as keyof Values] = value;
  };

  watchEffect(() => {
    values.phoneNumber = values.phoneNumber
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{3})(\d{2})(\d{3})(\d{2})/g, '+$1($2)$3$4');
  });

  return {
    values,
    v$,
    handleChange,
  };
}
