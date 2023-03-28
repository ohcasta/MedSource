<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Editar Antecedente</h2>
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">Nombre</label>
          <input
            class="form-control"
            placeholder="Antecedente"
            type="text"
            v-model="record.name"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Clase</label>
          <select class="custom-select" v-model="record.kind">
            <option disabled value="">Seleccione una clase</option>
            <option v-for="kind in kindsArray" :key="kind">
              {{ kind }}
            </option>
          </select>
        </div>
        <div class="form-group text-left">
          <label for="">Tipo</label>
          <input
            class="form-control"
            placeholder="Antecedente"
            type="text"
            v-model="record.sort"
          />
        </div>
        <button type="submit" class="btn m-1 btn-primary">
          Actualizar Antecedente
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
  name: "EdicionAntecedente",
  props: ["id"],
  data: function() {
    return {
      record: {
        name: "",
        sort: "",
      },
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
    processSignUp: function() {
      axios
        .put(
          this.store.state.backURL + "/antecedente/RUD/" + this.id,
          this.record
        )
        .then((result) => {
          alert("El antecedente ha sido actualizado con éxito", "success");
          this.goBackHome();
        })
        .catch((error) => {
          console.log(error.response);
          alert("Ocurrió un error actualizando el antecedente", "danger");
        });
    },
    loadRecord: function() {
      axios
        .get(this.store.state.backURL + "/antecedente/RUD/" + this.id)
        .then((result) => {
          this.record = result.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("Ocurrió un error cargando el antecedente", "danger");
        });
    },
  },
  created() {
    this.loadRecord();
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>
