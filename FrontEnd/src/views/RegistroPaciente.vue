<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Registrar Paciente</h2>
      <br />
      <form v-on:submit.prevent="processSignUp" name="patientForm">
        <div class="form-group text-left">
          <label for="">Número de Identificación</label>
          <input
            class="form-control"
            required
            type="number"
            step="1"
            min="1000000"
            max="9999999999"
            v-model="patient.identification"
          />
        </div>
        <div class="row">
          <div class="col-12 col-md-6 form-group text-left">
            <label for="">Nombre Completo</label>
            <input
              class="form-control"
              required
              type="text"
              v-model="patient.full_name"
            />
          </div>
          <div class="col-12 col-md-6 form-group text-left">
            <label for="">Fecha de Nacimiento</label>
            <input
              class="form-control"
              required
              type="date"
              name="dateField"
              min="1900-01-01"
              max="2021-12-31"
              v-model="patient.date_of_birth"
            />
          </div>
          <div class="col-12 col-md-6 form-group text-left">
            <label for="">Número de Teléfono</label>
            <input
              class="form-control"
              type="number"
              step="1"
              min="2000000"
              max="3099999999"
              v-model="patient.phone"
            />
          </div>
          <div class="col-12 col-md-6 form-group text-left">
            <label for="">Estado Civil</label>
            <select class="custom-select" v-model="patient.marital_status">
              <option disabled value="">Seleccione un Estado Civil</option>
              <option
                v-for="maritalStatus in maritalStatusArray"
                :key="maritalStatus"
              >
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
            <select class="custom-select" required v-model="patient.idEps">
              <option disabled value="">Seleccione una EPS</option>
              <option v-for="eps in EPSs" :key="eps" :value="eps.id">
                {{ eps.name }}
              </option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn m-1 btn-primary">
          Registrar Paciente
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
      name: "RegistroPaciente",
      data: function () {
        return {
          patient: {
            identification: null,
            full_name: "",
            date_of_birth: null,
            phone: null,
            blood_type: null,
            marital_status: null,
            idEps: null,
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
        goBackHome: function () {
          this.$router.push({ name: "home" });
        },
        processSignUp: function () {
          axios
            .post(this.store.state.backURL + "/paciente/ingreso", this.patient)
            .then((result) => {
              alert("El paciente ha sido registrado con éxito", "success");
              this.goBackHome();
            })
            .catch((error) => {
              console.log(error.response);
              alert("Ocurrió un error registrando el paciente", "danger");
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
      created: function () {
        this.getEPSs();
      },
      setup() {
        const store = useStore();
        return { store};
      },
    };
</script>