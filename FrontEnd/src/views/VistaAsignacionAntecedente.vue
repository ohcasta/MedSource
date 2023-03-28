<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Buscar antecedentes vinculados</h2>
      <form v-on:submit.prevent="buscar" class="col-11">
        <div class="form-group text-left">
          <label for="">Nombre del paciente</label>
          <input class="form-control" type="text" v-model="paciente_nombre" />
        </div>
        <div class="form-group text-left">
          <label for="">Identificación del paciente</label>
          <input
            type="number"
            class="form-control"
            v-model="paciente_identificacion"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Nombre del antecedente</label>
          <input
            type="text"
            class="form-control"
            v-model="antecedente_nombre"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Tipo de antecedente</label>
          <input type="text" class="form-control" v-model="antecedente_tipo" />
        </div>
        <div class="form-group text-left">
          <label for="">Clase de antecedente</label>
          <input type="text" class="form-control" v-model="antecedente_calse" />
        </div>
        <button class="btn btn-primary" type="submit">Buscar</button>
      </form>
      <div v-if="resultados">
        <h2>Resultados de busqueda</h2>
        <div class="row row-cols-auto justify-content-evenly">
          <AntecedenteListItem
            v-for="antecedente in antecedentes"
            :antecedente="antecedente"
            :key="antecedente"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AntecedenteListItem from "@/components/AntecedenteListItem.vue";
import axios from "axios";
import { useStore } from "@/state";
import { alert } from "../scripts/utils.js";

export default {
  name: "VistaAsignacionAntecedente",

  data: function() {
    return {
      antecedentes: [],
      paciente_nombre: null,
      paciente_identificacion: null,
      antecedente_nombre: null,
      antecedente_tipo: null,
      antecedente_calse: null,
      resultados: false,
    };
  },

  components: {
    AntecedenteListItem,
  },

  methods: {
    buscar: async function() {
      axios
        .get(this.store.state.backURL + "/mostrar_antecedentes", {
          params: {
            patient__identification__icontains: this.paciente_identificacion,
            patient__full_name__icontains: this.paciente_nombre,
            record__name__icontains: this.antecedente_nombre,
            record__kind__icontains: this.antecedente_calse,
            record__sort__icontains: this.antecedente_tipo,
          },
        })
        .then((response) => {
          this.resultados = true;
          this.antecedentes = response.data;
        })
        .catch((e) => {
          console.log(e);
          alert("Ocurrió un error realizando la búsqueda", "danger");
        });
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>

<style></style>
