<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Registrar Consulta</h2>
      <br />
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">Numero de Documento del Paciente</label>
          <input
            class="form-control"
            placeholder="Documento del Paciente"
            type="number"
            :disabled="validPatient"
            v-model="consulta.identification_patient"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary"
          v-if="!validPatient"
          v-on:click="searchPatient"
        >
          Buscar paciente
        </button>
        <p v-if="validPatient">
          <strong>Paciente: </strong> {{ patient.full_name }}
        </p>
        <div class="form-group text-left" v-if="validPatient">
          <label for="">Numero de Documento del Doctor</label>
          <input
            class="form-control"
            placeholder="Número de Documento del Doctor"
            type="number"
            :disabled="validDoctor"
            v-model="consulta.identification_doctor"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary"
          v-if="validPatient && !validDoctor"
          v-on:click="searchDoctor"
        >
          Buscar doctor
        </button>
        <p v-if="validDoctor">
          <strong>Medico: </strong>
          {{ doctor.user.first_name + " " + doctor.user.last_name }}
        </p>
        <div v-if="validPatient && validDoctor">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-group text-left">
                <label for="">Pulso</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="consulta.pulse"
                />
              </div>
              <div class="form-group text-left">
                <label for="">Altura</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="consulta.height"
                />
              </div>
              <div class="form-group text-left">
                <label for="">Peso</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="consulta.weight"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group text-left">
                <label for="">Pa</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="consulta.pa"
                />
              </div>
              <div class="form-group text-left">
                <label for="">Pr</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="consulta.pr"
                />
              </div>
              <div class="form-group text-left">
                <label for="">T</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="consulta.t"
                />
              </div>
            </div>
          </div>

          <div class="form-group text-left">
            <label for="">Medicamentos</label><br />
            <textarea class="form-control" v-model="consulta.medication">
 Enter text here...</textarea
            >
          </div>

          <div class="form-group text-left">
            <label for="">Sintoma</label><br />
            <textarea class="form-control" v-model="consulta.symptom">
 Enter text here...</textarea
            >
          </div>

          <div class="form-group text-left">
            <label for="">Diagnostico</label><br />
            <textarea class="form-control" v-model="consulta.diagnosis">
 Enter text here...</textarea
            >
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01"
                >Hospital</label
              >
            </div>
            <select class="custom-select" v-model="consulta.id_hospital">
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

          <button type="submit" class="btn m-1 btn-primary">Registrarse</button>
          <button
            type="button"
            class="btn m-1 btn-primary"
            v-on:click="backLogin"
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
    import { useStore } from '@/state';
    import { alert } from "../scripts/utils.js";

    export default {
      name: "RegistroConsulta",

      data: function () {
        return {
          doctor: null,
          patient: null,
          validPatient: false,
          validDoctor: false,
          consulta: {
            identification_patient: null,
            identification_doctor: null,
            pulse: null,
            height: null,
            weight: null,
            pa: null,
            pr: null,
            t: null,
            medication: "",
            symptom: "",
            diagnosis: "",
            id_hospital: null,
          },
          hospitales: [],
        };
      },

      methods: {
        backLogin: function () {
          this.$router.push({ name: "login" });
        },
        processSignUp: function () {
          console.log(this.procedimiento);
          if (this.validPatient && this.validDoctor)
            axios
              .post(this.store.state.backURL + "/consulta/ingreso", this.consulta)
              .then((result) => {
                alert("La consulta se ha registrado con éxito", "success");
                this.backLogin();
              })
              .catch((error) => {
                console.log(error.response);
                alert("Ocurrió un error registrando la consulta", "danger");
              });
        },

        getHospitales: function () {
          axios
            .get(this.store.state.backURL + "/hospital")
            .then((response) => {
              this.hospitales = response.data;
            })
            .catch((error) => {
              console.log(error.response);
              alert("No se pudo conectar al servidor", "danger");
            });
        },

        searchPatient: function () {
          axios
            .get(
              this.store.state.backURL +
                "/paciente/" +
                this.consulta.identification_patient
            )
            .then((response) => {
              this.patient = response.data;
              this.validPatient = true;
            })
            .catch((error) => {
              if (error.response.status == 404)
                alert("El paciente no se encuentra registrado en el sistema", "warning");
              else alert("Ocurrió un error en el servidor", "danger");
            });
        },

        searchDoctor: function () {
          axios
            .get(
              this.store.state.backURL +
                "/doctor/" +
                this.consulta.identification_doctor
            )
            .then((response) => {
              this.doctor = response.data;
              this.validDoctor = true;
            })
            .catch((error) => {
              if (error.response.status == 404)
                alert("El médico no se encuentra registrado en el sistema", "warning");
              else alert("Ocurrió un error en el servidor", "danger");
            });
        },
      },

      created: function () {
        this.getHospitales();
      },
      setup() {
        const store = useStore();
        return { store};
      },
    };
</script>
