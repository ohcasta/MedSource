import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@fortawesome/fontawesome-free/js/all";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { store, MutationTypes } from "./state";

import axios from "axios";
import { getAuthenticationToken, isAuth } from "@/services/login";

let numberRequests = 0;

axios.interceptors.request.use(
  (request) => {
    if (
      request.url?.startsWith(store.state.backURL) &&
      request.url !== store.state.backURL + "/refresh" &&
      isAuth() &&
      request.headers
    ) {
      request.headers.Authorization = `Bearer ${getAuthenticationToken()}`;
    }
    store.commit(MutationTypes.LOAD);
    return request;
  },
  (err) => {
    store.commit(MutationTypes.STOP);
    return err;
  }
);

axios.interceptors.response.use(
  (response) => {
    store.commit(MutationTypes.STOP);
    return response;
  },
  (err) => {
    store.commit(MutationTypes.STOP);
    return err;
  }
);

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
