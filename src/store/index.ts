import {
  createStore,
  MutationTree,
  ActionTree,
  GetterTree,
  ActionContext,
} from 'vuex';
import { setItem } from '../helpers/persistanceStorage';
import { IUser } from '../models/index';

export type State = {
  isSubmitting: boolean;
  isLoading: boolean;
  data: IUser[];
};

const state: State = {
  isSubmitting: false,
  isLoading: false,
  data: [],
};

export enum MutationTypes {
  GET_USERS_START = 'GET_USERS_START',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  ADD_USER_START = 'ADD_USER_START',
  ADD_USER_SUCCESS = 'ADD_USER_SUCCESS',
  REMOVE_USER_START = 'REMOVE_USER_START',
  REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS',
  EDIT_USER_START = 'EDIT_USER_START',
  EDIT_USER_SUCCESS = '[users] Edit user success',
}

export enum ActionTypes {
  GET_USERS = 'GET_USERS',
  ADD_USER = 'ADD_USER',
  REMOVE_USER = 'REMOVE_USER',
  EDIT_USER = 'EDIT_USER',
}

export type Mutations<S = State> = {
  [MutationTypes.GET_USERS_START](state: S): void;
  [MutationTypes.GET_USERS_SUCCESS](state: S, users: IUser[]): void;
  [MutationTypes.ADD_USER_START](state: S): void;
  [MutationTypes.ADD_USER_SUCCESS](state: S, user: IUser): void;
  [MutationTypes.REMOVE_USER_START](state: S): void;
  [MutationTypes.REMOVE_USER_SUCCESS](state: S, id: number): void;
  [MutationTypes.EDIT_USER_START](state: S): void;
  [MutationTypes.EDIT_USER_SUCCESS](state: S, user: IUser): void;
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.GET_USERS](
    { commit }: AugmentedActionContext,
    users: IUser[]
  ): void;
  [ActionTypes.ADD_USER]({ commit }: AugmentedActionContext, user: IUser): void;
  [ActionTypes.REMOVE_USER](
    { commit }: AugmentedActionContext,
    id: number
  ): void;
  [ActionTypes.EDIT_USER](
    { commit }: AugmentedActionContext,
    user: IUser
  ): void;
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.GET_USERS_START](state: State) {
    state.isLoading = true;
  },
  [MutationTypes.GET_USERS_SUCCESS](state: State, users: IUser[]) {
    state.isLoading = false;
    state.data = users;
  },
  [MutationTypes.ADD_USER_START](state: State) {
    state.isSubmitting = true;
  },
  [MutationTypes.ADD_USER_SUCCESS](state: State, user: IUser) {
    state.isSubmitting = false;
    state.data.push(user);
  },
  [MutationTypes.REMOVE_USER_START](state: State) {
    state.isSubmitting = true;
  },
  [MutationTypes.REMOVE_USER_SUCCESS](state: State, id: number) {
    state.isSubmitting = false;
    state.data = state.data.filter((item) => +item.id !== id);
  },
  [MutationTypes.EDIT_USER_START](state: State) {
    state.isSubmitting = true;
  },
  [MutationTypes.EDIT_USER_SUCCESS](state: State, user: IUser) {
    state.isSubmitting = false;
    state.data = state.data.map((item) => {
      if (+item.id === +user.id) {
        item = user;
      }
      return item;
    });
  },
};

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.GET_USERS]({ commit }, users: IUser[]) {
    return new Promise((resolve) => {
      commit(MutationTypes.GET_USERS_START);
      setTimeout(() => {
        commit(MutationTypes.GET_USERS_SUCCESS, users);
        resolve(users);
      }, 2000);
    });
  },
  [ActionTypes.ADD_USER]({ commit }, user: IUser) {
    return new Promise((resolve) => {
      commit(MutationTypes.ADD_USER_START);
      setTimeout(() => {
        commit(MutationTypes.ADD_USER_SUCCESS, user);
        resolve(user);
      }, 2000);
    });
  },
  [ActionTypes.REMOVE_USER]({ commit }, id: number) {
    return new Promise((resolve) => {
      commit(MutationTypes.REMOVE_USER_START);
      setTimeout(() => {
        commit(MutationTypes.REMOVE_USER_SUCCESS, id);
        resolve(id);
      }, 2000);
    });
  },
  [ActionTypes.EDIT_USER]({ commit }, user: IUser) {
    return new Promise((resolve) => {
      commit(MutationTypes.EDIT_USER_START);
      setTimeout(() => {
        commit(MutationTypes.EDIT_USER_SUCCESS, user);
        resolve(user);
      }, 2000);
    });
  },
};

export const getters: GetterTree<State, State> = {
  getUser:
    (state: State) =>
    (id: number): IUser | undefined => {
      return state.data.find((item) => +item.id === id);
    },
  getDisplayData:
    (state: State) =>
    (searchValue: string): IUser[] => {
      return state.data.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key as keyof typeof item]
            .toString()
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase())
        );
      });
    },
};

const store = createStore({
  state,
  actions,
  mutations,
  getters,
});

store.subscribe((mutation, state) => {
  setItem<IUser[]>('users', state.data);
});

export default store;
