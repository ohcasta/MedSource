<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">
        Actualizar Asignación de Antecedentes a Pacientes
      </h2>
      <form v-on:submit.prevent="update">
        <div class="form-group text-left">
          <label for="">Paciente</label>
          <input
            type="text"
            class="form-control"
            v-model="paciente_antecedente.patient.full_name"
            disabled
          />
        </div>
        <div class="form-group text-left">
          <label for="">Antecedente</label>
          <select class="custom-select" v-model="paciente_antecedente.idRecord">
            <option disabled value="">Seleccione un elemento</option>
            <option
              v-for="antecedente in antecedentes"
              :key="antecedente"
              :value="antecedente.id"
            >
              {{ antecedente.name }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn m-1 btn-primary">
          Actualizar Vinculo Antecedente con Paciente
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
  name: "EdicionVinculacionAntecedente",
  props: ["id"],
  data: function() {
    return {
      paciente_antecedente: {},
      antecedentes: [],
    };
  },
  methods: {
    goBackHome: function() {
      this.$router.push({ name: "home" });
    },
    update: function() {
      axios
        .put(
          this.store.state.backURL + "/vinculacion_antecedente/RUD/" + this.id,
          {
            id: this.paciente_antecedente.id,
            idPatient: this.paciente_antecedente.patient.identification,
            idRecord: this.paciente_antecedente.idRecord,
          }
        )
        .then((result) => {
          alert("La asignación ha sido actualizada correctamente", "success");
          this.goBackHome();
        })
        .catch((error) => {
          console.log(error.response);
          alert("Ocurrió un error actualizando la asignación", "danger");
        });
    },

    getAntecedentes: function() {
      axios
        .get(this.store.state.backURL + "/antecedentes")
        .then((response) => {
          this.antecedentes = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("No se pudo conectar al servidor", "danger");
        });
    },
    loadPatientRecord: function() {
      axios
        .get(
          this.store.state.backURL + "/vinculacion_antecedente/RUD/" + this.id
        )
        .then((result) => {
          this.paciente_antecedente = result.data;
          this.paciente_antecedente.idRecord = this.paciente_antecedente.record.id;
        })
        .catch((error) => {
          console.log(error.response);
          alert("Ocurrió un error cargando el registro", "danger");
        });
    },
  },
  created: function() {
    this.getAntecedentes();
    this.loadPatientRecord();
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>
