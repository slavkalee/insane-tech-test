import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { ActionTypes } from '../store/index';
import { IUser } from '../models/index';

export function useCurrentUser(id: number) {
  const store = useStore();
  const router = useRouter();

  const user = computed(() => store.getters.getUser(id));

  const removeUser = () => {
    store.dispatch(ActionTypes.REMOVE_USER, id).then(() => {
      router.push({ name: 'users' });
    });
  };

  const editUser = (values: IUser) => {
    store
      .dispatch(ActionTypes.EDIT_USER, values)
      .then(() => router.push({ name: 'user', params: { id } }));
  };

  return {
    user,
    removeUser,
    editUser,
  };
}
