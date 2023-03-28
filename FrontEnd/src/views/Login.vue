<template>
  <div class="container-fluid text-center" style="height: 100vh">
    <div class="row" style="height: 100%">
      <div class="col-4 col-md-8 d-none d-md-block">
        <img
          src="../assets/images/background3.jpg"
          style="height: 100%; object-fit: cover"
          class="img-fluid"
          alt="Responsive image"
        />
      </div>
      <div class="col col-12 col-md-4 mt-1">
        <img
          src="../assets/medsourceLogo.png"
          style="height: 30%"
          class="img-fluid"
          alt="Responsive image"
        />
        <h2 class="default-title h1 pt-3">Iniciar Sesión</h2>
        <form v-on:submit.prevent="processLogin" class="p-3">
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Correo Electrónico"
              type="email"
              v-model="user.username"
              required
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              type="password"
              v-model="user.password"
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Ingresar</button>
        </form>
        <router-link to="recuperarContrasena" class="link-primary">
          ¿Olvidaste tu contraseña?
        </router-link>
        <br />
        <router-link :to="{ name: 'medicoregistro' }" class="link-primary">
          Regístrate aquí si eres un médico </router-link
        ><br />
        <router-link :to="{ name: 'enfermeroregistro' }" class="link-primary">
          Regístrate aquí si eres un enfermero
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setAuthenticationToken, setRefreshToken } from "@/services/login";
import { MutationTypes, useStore } from "@/state";
import { alert } from "../scripts/utils.js";
export default {
  name: "Login",

  data: function() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    processLogin: function() {
      console.log(this.store.state.backURL);
      axios
        .post(this.store.state.backURL + "/login", this.user)
        .then((result) => {
          setAuthenticationToken(result.data.access);
          setRefreshToken(result.data.refresh);
          this.store.commit(MutationTypes.LOGIN);
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
          alert("No se pudo autenticar tu cuenta", "danger");
        });
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>
