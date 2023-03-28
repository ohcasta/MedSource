<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Buscar procedimientos</h2>
      <br />
      <form v-on:submit.prevent="processSignUp">
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
            placeholder="Número de uvr mínimo"
            type="number"
            v-model="procedure.uvr"
          />
        </div>
        <div v-if="procedures.length != 0" class="row mb-3">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Nombre</th>
                      <th>UVR</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="procedure in procedures" :key="procedure.id">
                      <td>{{ procedure.id }}</td>
                      <td>{{ procedure.name }}</td>
                      <td>{{ procedure.uvr }}</td>
                      <td>
                        <a
                          type="button"
                          class="btn-floating btn-sm purple-gradient"
                          v-on:click="editar(procedure.id)"
                        >
                          <i class="fas fa-edit fa-lg"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="btn m-1 btn-primary"
          v-on:click="getProcedimientos"
        >
          Buscar procedimientos
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
import { useStore } from "@/state";
import { alert } from "../scripts/utils.js";
export default {
  name: "BusquedaProcedimiento",
  data: function() {
    return {
      procedure: {
        name: "",
        uvr: null,
      },
      procedures: [],
    };
  },
  methods: {
    goBackHome: function() {
      this.$router.push({ name: "home" });
    },
    getProcedimientos() {
      axios
        .get(this.store.state.backURL + "/procedimientos/", {
          params: {
            name: this.procedure.name,
            uvr: this.procedure.uvr,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.procedures = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("No se pudo conectar al servidor", "danger");
        });
    },
    editar: function(id) {
      this.$router.push({ name: "editarProcedimiento", params: { id: id } });
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>
