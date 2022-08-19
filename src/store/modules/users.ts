import { IUser } from '@/models/index';

const state = {
  isSubmitting: false,
  isLoading: false,
  data: [],
};

export const actionTypes = {
  getUsers: '[users] Get users',
  addUser: '[users] Add user',
  removeUser: '[users] Remove user',
  editUser: '[users] Edit user',
};
export const mutationTypes = {
  getUsersStart: '[users] Get users start',
  getUsersSuccess: '[users] Get users success',

  addUserStart: '[users] Add user start',
  addUserSuccess: '[users] Add user success',

  removeUserStart: '[users] Remove user start',
  removeUserSuccess: '[users] Remove user success',

  editUserStart: '[users] Edit user start',
  editUserSuccess: '[users] Edit user success',
};

const actions = {
  [actionTypes.getUsers](ctx, users: IUser[]) {
    return new Promise((resolve) => {
      ctx.commit(mutationTypes.getUsersStart);
      setTimeout(() => {
        ctx.commit(mutationTypes.getUsersSuccess, users);
        resolve(users);
      }, 2000);
    });
  },
  [actionTypes.addUser](ctx, user: IUser) {
    return new Promise((resolve) => {
      ctx.commit(mutationTypes.addUserStart);
      setTimeout(() => {
        ctx.commit(mutationTypes.addUserSuccess, user);
        resolve(user);
      }, 2000);
    });
  },
  [actionTypes.removeUser](ctx, id: number) {
    return new Promise((resolve) => {
      ctx.commit(mutationTypes.removeUserStart);
      setTimeout(() => {
        ctx.commit(mutationTypes.removeUserSuccess, id);
        resolve(id);
      }, 2000);
    });
  },
  [actionTypes.editUser](ctx, user: IUser) {
    return new Promise((resolve) => {
      ctx.commit(mutationTypes.editUserStart);
      setTimeout(() => {
        ctx.commit(mutationTypes.editUserSuccess, user);
        resolve(user);
      }, 2000);
    });
  },
};

const mutations = {
  [mutationTypes.getUsersStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getUsersSuccess](state, users: IUser[]) {
    state.isLoading = false;
    state.data = users;
  },
  [mutationTypes.addUserStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.addUserSuccess](state, user: IUser) {
    state.isSubmitting = false;
    state.data.push(user);
  },
  [mutationTypes.removeUserStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.removeUserSuccess](state, id: number) {
    state.isSubmitting = false;
    state.data = state.data.filter((item) => +item.id !== id);
  },
  [mutationTypes.editUserStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.editUserSuccess](state, user: IUser) {
    state.isSubmitting = false;
    state.data = state.data.map((item) => {
      if (+item.id === +user.id) {
        item = user;
        console.log('iD is not same');
      }
      return item;
    });
  },
};

const getters = {
  getUser: (state) => (id: number) => {
    return state.data.find((item) => +item.id === id);
  },
  getDisplayData: (state) => (searchValue: string) => {
    return state.data.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key]
          .toString()
          .toLowerCase()
          .includes(searchValue.toString().toLowerCase())
      );
    });
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
