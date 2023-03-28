<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Buscar Desarrollos de procedimientos</h2>
      <br />
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">Nombre del paciente</label>
          <input
            class="form-control"
            placeholder="Nombre Paciente"
            type="text"
            v-model="desarrollo.patient"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Identificacion del medico</label>
          <input
            class="form-control"
            placeholder="Documento Médico"
            type="number"
            v-model="desarrollo.doctor"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Identificacion del enfermero</label>
          <input
            class="form-control"
            placeholder="Documento enfermero"
            type="number"
            v-model="desarrollo.nurse"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Nombre del procedimiento</label>
          <input
            class="form-control"
            placeholder="Procedimiento"
            type="text"
            v-model="desarrollo.procedure"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Nombre del hospital</label>
          <input
            class="form-control"
            placeholder="Hospital"
            type="text"
            v-model="desarrollo.hospital"
          />
        </div>
        <div class="form-group text-left">
          <label for="">Fecha</label>
          <input
            class="form-control"
            placeholder="Número de Documento del Doctor"
            type="date"
            v-model="desarrollo.date"
          />
        </div>
        <button
          type="submit"
          class="btn m-1 btn-primary"
          v-on:click="getProcedimientosDesarrollados"
        >
          Buscar desarrollos
        </button>
        <button
          type="button"
          class="btn m-1 btn-primary"
          v-on:click="goBackHome"
        >
          Volver
        </button>
        <div v-if="desarrollos.length != 0" class="row ml-3 m-3">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Fecha</th>
                      <th>Habitación</th>
                      <th>Procedimiento</th>
                      <th>Paciente</th>
                      <th>Doctor</th>
                      <th>Enfermera</th>
                      <th>Comentario</th>
                      <th>Hospital</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="desarrollo in desarrollos" :key="desarrollo.id">
                      <td>{{ desarrollo.id }}</td>
                      <td>{{ desarrollo.date }}</td>
                      <td>{{ desarrollo.room }}</td>
                      <td>{{ desarrollo.procedure }}</td>
                      <td>{{ desarrollo.patient }}</td>
                      <td>{{ desarrollo.doctor }}</td>
                      <td>{{ desarrollo.nurse }}</td>
                      <td>{{ desarrollo.comment }}</td>
                      <td>{{ desarrollo.hospital }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'editarDesarrollo',
                            params: { id: desarrollo.id },
                          }"
                        >
                          <button type="button" class="btn btn-primary">
                            Editar
                          </button>
                        </router-link>
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
  name: "BusquedaDesarrollo",
  data: function() {
    return {
      desarrollo: {
        procedure: "",
        patient: "",
        doctor: "",
        nurse: "",
        hospital: "",
        date: null,
      },
      desarrollos: [],
    };
  },
  methods: {
    goBackHome: function() {
      this.$router.push({ name: "home" });
    },
    getProcedimientosDesarrollados() {
      axios
        .get(this.store.state.backURL + "/mostrar_desarrollos/", {
          params: {
            patient: this.desarrollo.patient,
            doctor: this.desarrollo.doctor,
            nurse: this.desarrollo.nurse,
            procedure: this.desarrollo.procedure,
            hospital: this.desarrollo.hospital,
            date: this.desarrollo.date,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.desarrollos = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("No se pudo conectar al servidor", "danger");
        });
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>
