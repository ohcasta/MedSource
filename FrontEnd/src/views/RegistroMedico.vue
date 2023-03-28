<template>
  <div class="container mt-4 text-center" ref="page">
    <div class="col">
      <h2 class="default-title">Registro para Médicos</h2>
      <div v-if="!valid">
        <p class="alert alert-danger" role="alert">
          {{ error }}
        </p>
      </div>
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">{{ fields.username }}*</label>
          <input
            type="email"
            class="form-control"
            v-model="medico.user.username"
            required
          />
        </div>
        <div class="row row-cols-md-2 row-cols-1 justify-content-evenly">
          <div class="form-group text-left col">
            <label for="">{{ fields.password }}*</label>
            <input
              type="password"
              class="form-control"
              v-model="medico.user.password"
              required
            />
          </div>
          <div class="form-group text-left col">
            <label for="">Confirma tu contraseña*</label>
            <input
              type="password"
              class="form-control"
              v-model="verifyPassword"
              required
            />
          </div>
          <div class="form-group text-left col">
            <label for="">{{ fields.first_name }}*</label>
            <input
              type="text"
              class="form-control"
              v-model="medico.user.first_name"
              required
            />
          </div>
          <div class="form-group text-left col">
            <label for="">{{ fields.last_name }}*</label>
            <input
              type="text"
              class="form-control"
              v-model="medico.user.last_name"
              required
            />
          </div>
          <div class="form-group text-left col">
            <label for="">{{ fields.identification }}*</label>
            <input
              type="number"
              class="form-control"
              v-model="medico.identification"
              required
            />
          </div>
          <div class="form-group text-left col">
            <label for="">{{ fields.education }}*</label>
            <select class="custom-select" v-model="medico.education" required>
              <option disabled value="">Seleccione un elemento</option>
              <option v-for="nivel in nivelesEducativos" :key="nivel">
                {{ nivel }}
              </option>
            </select>
          </div>
          <div class="form-group text-left col">
            <label for="">{{ fields.specialization }}</label>
            <input
              type="text"
              class="form-control"
              v-model="medico.specialization"
            />
          </div>
          <div class="form-group text-left col">
            <label for="">{{ fields.idHospital }}*</label>
            <select class="custom-select" v-model="medico.idHospital" required>
              <option disabled value="">Seleccione un elemento</option>
              <option
                v-for="hospital in hospitales"
                :key="hospital"
                :value="hospital.id"
              >
                {{ hospital.name }}
              </option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn m-1 btn-primary">Registrarse</button>
        <button
          type="button"
          class="btn m-1 btn-primary"
          v-on:click="backLogin"
        >
          Volver
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  email,
  required,
  helpers,
  minLength,
  between,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { MutationTypes, useStore } from "@/state";
import { alert } from "../scripts/utils.js";

const regexPassword = helpers.regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export default {
  name: "RegistroMedico",

  data: function() {
    return {
      valid: true,
      error: "",
      medico: {
        user: {
          username: "",
          email: "",
          password: "",
          first_name: "",
          last_name: "",
        },
        identification: "",
        education: null,
        specialization: "",
        idHospital: null,
      },
      verifyPassword: "",
      nivelesEducativos: [
        "Pregrado",
        "Postgrado",
        "Maestria",
        "Doctorado",
        "PostDoctorado",
      ],
      hospitales: [],
      fields: {
        username: "Correo Electronico",
        password: "Contraseña",
        first_name: "Nombres",
        last_name: "Apellidos",
        identification: "Numero de documento",
        education: "Nivel educativo",
        specialization: "Especialidad",
        idHospital: "Hospital",
      },
    };
  },

  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      medico: {
        user: {
          username: { required, email },
          password: { required, regexPassword },
          first_name: { required, minLength: minLength(5) },
          last_name: { required, minLength: minLength(5) },
        },
        identification: { required, between: between(1000000, 9999999999) },
        education: { required },
        idHospital: { required },
      },
    };
  },

  methods: {
    backLogin: function() {
      this.$router.push({ name: "login" });
    },

    errorCase: function() {
      console.log(this.$refs);
      switch (this.v$.$errors[0].$validator) {
        case "email":
          this.error = "Ingresa un correo electronico valido";
          break;
        case "required":
          this.error = `El campo ${
            this.fields[this.v$.$errors[0].$property]
          } es requerido  `;
          break;
        case "regexPassword":
          this.error = `La contraseña debe contener mínimo una mayúscula, una minúscula, un número y un caracter especial`;
          break;
        case "minLength":
          this.error = `El campo ${
            this.fields[this.v$.$errors[0].$property]
          } debe contener minimo 5 caracteres`;
          break;
        case "between":
          this.error = `El campo ${
            this.fields[this.v$.$errors[0].$property]
          } debe contener entre 7 y 10 dígitos`;
          break;
        default:
          break;
      }
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      });
    },

    processSignUp: async function() {
      this.valid = await this.v$.$validate();
      if (!this.valid) {
        this.errorCase();
        return;
      }
      if (this.medico.user.password !== this.verifyPassword) {
        this.error = "Las contraseñas no coinciden";
        this.valid = false;
        return;
      }
      this.medico.user.email = this.medico.user.username;
      axios
        .post(this.store.state.backURL + "/medico/registro", this.medico)
        .then((result) => {
          alert("Te has registrado en nuestro sistema con éxito", "success");
          this.backLogin();
        })
        .catch((error) => {
          console.log(error.response);
          alert(
            "No se pudo completar tu registro satisfactoriamente",
            "danger"
          );
        });
    },

    getHospitales: function() {
      axios
        .get(this.store.state.backURL + "/hospital")
        .then((response) => {
          this.hospitales = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("No hay conexión al servidor", "danger");
        });
    },
  },

  created: function() {
    this.getHospitales();
  },
  setup() {
    const store = useStore();
    return { store, v$: useVuelidate() };
  },
};
</script>
