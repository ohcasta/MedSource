<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Buscar antecedentes</h2>
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">Nombre del antecedente</label>
          <input class="form-control" type="text" v-model="record.name" />
        </div>
        <div class="form-group text-left">
          <label for="">Clase de antecedente</label>
          <select class="custom-select" v-model="record.kind">
            <option disabled value="">Seleccione una clase</option>
            <option v-for="kind in kindsArray" :key="kind">
              {{ kind }}
            </option>
          </select>
        </div>
        <div class="form-group text-left">
          <label for="">Tipo de antecedente</label>
          <input class="form-control" type="text" v-model="record.sort" />
        </div>
        <button
          type="submit"
          class="btn btn-primary m-1"
          v-on:click="getAntecedentes"
        >
          Buscar antecedentes
        </button>
        <button
          type="button"
          class="btn m-1 btn-primary"
          v-on:click="goBackHome"
        >
          Volver
        </button>
        <div v-if="records.length != 0" class="row ml-3 mt-3">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Clase</th>
                      <th>Tipo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="record in records" :key="record.id">
                      <td>{{ record.name }}</td>
                      <td>{{ record.kind }}</td>
                      <td>{{ record.sort }}</td>
                      <td>
                        <a
                          type="button"
                          class="btn-floating btn-sm purple-gradient"
                          v-on:click="editar(record.id)"
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
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "@/state";
import { alert } from "../scripts/utils.js";

export default {
  name: "BusquedaAntecedente",
  data: function() {
    return {
      record: {
        name: "",
        kind: "",
        sort: "",
      },
      records: [],
      kindsArray: [
        "Personal",
        "Gineco-Obstetricos",
        "Psicosociales",
        "Familiares",
      ],
    };
  },
  methods: {
    goBackHome: function() {
      this.$router.push({ name: "home" });
    },
    getAntecedentes() {
      axios
        .get(this.store.state.backURL + "/antecedentes", {
          params: {
            name: this.record.name,
            kind: this.record.kind,
            sort: this.record.sort,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.records = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("No se pudo conectar al servidor", "danger");
        });
    },
    editar: function(id) {
      console.log(id);
      this.$router.push({ name: "editarAntecedente", params: { id: id } });
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>
