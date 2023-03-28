import {
  createStore,
  MutationTree,
  Store as VuexStore,
  CommitOptions,
  createLogger,
} from "vuex";
import { isAuth } from "./services/login";

//declare state
export type State = {
  backURL: string;
  isAuth: boolean;
  loading: boolean;
};

//set state
const state: State = {
  backURL: "https://med-source.herokuapp.com",
  isAuth: isAuth(),
  loading: false,
};

// mutations and action enums

export enum MutationTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  LOAD = "LOAD",
  STOP = "STOP",
}

//Mutation Types
export type Mutations<S = State> = {
  [MutationTypes.LOGIN](state: S): void;
  [MutationTypes.LOGOUT](state: S): void;
  [MutationTypes.LOAD](state: S): void;
  [MutationTypes.STOP](state: S): void;
};

//define mutations
const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.LOGIN](state: State) {
    state.isAuth = true;
  },
  [MutationTypes.LOGOUT](state: State) {
    state.isAuth = false;
  },
  [MutationTypes.LOAD](state: State) {
    state.loading = true;
  },
  [MutationTypes.STOP](state: State) {
    state.loading = false;
  },
};

//setup store type
export type Store = Omit<VuexStore<State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

export const store = createStore({
  state,
  mutations,
  plugins: [createLogger()],
});

export function useStore() {
  return store as Store;
}
