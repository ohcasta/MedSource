<template>
  <div class="container mt-4 text-center">
      <div class="col">
          <h2 class="default-title">Editar Paciente</h2>
          <br />
          <form v-on:submit.prevent="processSignUp" name="patientForm">
              <div class="form-group text-left">
                  <label for="">Número de Identificación</label>
                  <input class="form-control"
                         required
                         type="number"
                         step="1"
                         min="1000000"
                         max="9999999999"
                         v-model="patient.identification" />
              </div>
              <div class="row">
                  <div class="col-12 col-md-6 form-group text-left">
                      <label for="">Nombre Completo</label>
                      <input class="form-control"
                             required
                             type="text"
                             v-model="patient.full_name" />
                  </div>
                  <div class="col-12 col-md-6 form-group text-left">
                      <label for="">Fecha de Nacimiento</label>
                      <input class="form-control"
                             required
                             type="date"
                             name="dateField"
                             min="1900-01-01"
                             max="2021-12-31"
                             v-model="patient.date_of_birth" />
                  </div>
                  <div class="col-12 col-md-6 form-group text-left">
                      <label for="">Número de Teléfono</label>
                      <input class="form-control"
                             type="number"
                             step="1"
                             min="2000000"
                             max="3099999999"
                             v-model="patient.phone" />
                  </div>
                  <div class="col-12 col-md-6 form-group text-left">
                      <label for="">Estado Civil</label>
                      <select class="custom-select" v-model="patient.marital_status">
                          <option disabled value="">Seleccione un Estado Civil</option>
                          <option v-for="maritalStatus in maritalStatusArray"
                                  :key="maritalStatus">
                              {{ maritalStatus }}
                          </option>
                      </select>
                  </div>
                  <div class="col-12 col-md-6 form-group text-left">
                      <label for="">Grupo Sanguíneo</label>
                      <select class="custom-select" required v-model="patient.blood_type">
                          <option class="custom-select" disabled value="">
                              Seleccione un Grupo Sanguíneo
                          </option>
                          <option v-for="bloodType in bloodTypesArray" :key="bloodType">
                              {{ bloodType }}
                          </option>
                      </select>
                  </div>
                  <div class="col-12 col-md-6 form-group text-left">
                      <label for="">EPS</label>
                      <select class="custom-select" required v-model="patient.eps.id">
                          <option disabled value="">Seleccione una EPS</option>
                          <option v-for="eps in EPSs" :key="eps" :value="eps.id">
                              {{ eps.name }}
                          </option>
                      </select>
                  </div>
              </div>
              <button type="submit" class="btn m-1 btn-primary">
                  Actualizar Paciente
              </button>
              <button type="button"
                      class="btn m-1 btn-primary"
                      v-on:click="goBack">
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
  name: "EditarPaciente",
  props: ["identification"],
  data: function() {
    return {
        patient: {
            identification: null,
            full_name: "",
            date_of_birth: null,
            phone: null,
            marital_status: null,
            blood_type: null,
            eps: { id: null, name: null }, // así llega desde el backend
            idEps: null // así se envía desde el frontend
        },
        maritalStatusArray: [
            "Soltero",
            "Casado",
            "Unión Libre",
            "Viudo",
            "Divorciado",
        ],
        bloodTypesArray: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
        EPSs: [],
    };
  },
  methods: {
    goBack: function() {
        this.$router.push({ name: "pacientebusqueda" });
    },
      processSignUp: function () {
        this.patient.idEps = this.patient.eps.id // para que coincida con lo que solicita el back para actualizar
      axios
        .put(
          this.store.state.backURL + "/pacientes/RUD/" + this.identification,
          this.patient
        )
        .then((result) => {
          alert("El paciente ha sido actualizado con éxito", "success");
          this.goBack();
        })
        .catch((error) => {
          console.log(error.response);
          alert("Ocurrió un error actualizando el paciente", "danger");
        });
    },
    loadRecord: function() {
      axios
        .get(this.store.state.backURL + "/pacientes/RUD/" + this.identification)
          .then((result) => {
            console.log(result.data)
          this.patient = result.data;
        })
        .catch((error) => {
          console.log(error.response);
          alert("Ocurrió un error cargando el paciente", "danger");
        });
      },
      getEPSs: function () {
          axios
              .get(this.store.state.backURL + "/eps")
              .then((response) => {
                  this.EPSs = response.data;
              })
              .catch((error) => {
                  console.log(error.response);
                  alert("No se pudo conectar al servidor", "danger");
              });
      },
  },
  created() {
      this.getEPSs();
      this.loadRecord();
      
  },
  setup() {
      const store = useStore();
      return { store };
  },
 };
</script>
