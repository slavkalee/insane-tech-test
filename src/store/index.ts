import { createStore } from 'vuex';
import users from '@/store/modules/users';
import { setItem } from '@/helpers/persistanceStorage';
import { IUser } from '@/models/index'
 
const store = createStore({
  state: {},
  mutations: {},
  getters: {},
  modules: {
    users,
  },
});

store.subscribe((mutation, state) => {
  setItem<IUser[]>('users', state.users.data);
});

export default store;
