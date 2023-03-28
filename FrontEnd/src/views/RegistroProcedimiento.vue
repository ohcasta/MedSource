<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Registrar Procedimiento</h2>
      <form v-on:submit.prevent="processSignUp">
        <div class="ml-auto mr-auto col-12 col-md-6">
          <div class="form-group text-left">
            <input
              class="form-control"
              placeholder="Nombre del procedimiento"
              type="text"
              v-model="procedure.name"
            />
          </div>

          <div class="form-group text-left">
            <input
              class="form-control"
              placeholder="Unidad de Valor Relativa"
              type="number"
              v-model="procedure.uvr"
            />
          </div>
        </div>

        <button type="submit" class="btn m-1 btn-primary">
          Registrar Procedimiento
        </button>
        <button
          type="button"
          class="btn m-1 btn-primary"
          v-on:click="goBackHome"
        >
          Volver
        </button>
      </form>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
    import { useStore } from '@/state';
    import { alert } from "../scripts/utils.js";

    export default {
      name: "RegistroProcedimiento",
      data: function () {
        return {
          procedure: {
            name: "",
            uvr: null,
          },
        };
      },
      methods: {
        goBackHome: function () {
          this.$router.push({ name: "home" });
        },
        processSignUp: function () {
          axios
            .post(
              this.store.state.backURL + "/procedimiento/ingreso",
              this.procedure
            )
            .then((result) => {
              alert("El procedimiento ha sido registrado con éxito", "success");
              this.goBackHome();
            })
            .catch((error) => {
              console.log(error.response);
              alert("Ocurrió un error registrando el procedimiento", "danger");
            });
        },
      },
      setup() {
        const store = useStore();
        return { store};
      },
    };
</script>
