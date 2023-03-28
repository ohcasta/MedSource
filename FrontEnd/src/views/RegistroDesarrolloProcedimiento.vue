<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Registro Desarrollo de Procedimiento</h2>
      <br />
      <p v-if="result">
        Errror:, server returned:<br />
        {{ result }}
      </p>
      <form v-on:submit.prevent="processSignUp">
        <div class="form-group text-left">
          <label for="">Numero de Documento del Paciente</label>
          <input
            type="number"
            class="form-control"
            placeholder="Documento del Paciente"
            :disabled="validPatient"
            v-model="procedimiento.identification_patient"
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
            placeholder="Documento del Doctor"
            type="number"
            :disabled="validDoctor"
            v-model="procedimiento.identification_doctor"
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
        <div class="form-group text-left" v-if="validPatient && validDoctor">
          <label for="">Numero de Documento de la Enfermera</label>
          <input
            class="form-control"
            placeholder="Documento de la Enfermera"
            type="number"
            v-model="procedimiento.identification_nurse"
            :disabled="validNurse"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary"
          v-if="validPatient && validDoctor && !validNurse"
          v-on:click="searchNurse"
        >
          Buscar Enfermera/o
        </button>
        <p v-if="validNurse">
          <strong>Enfermera/o: </strong>
          {{ nurse.user.first_name + " " + nurse.user.last_name }}
        </p>
        <div v-if="validPatient && validDoctor && validNurse">
          <div class="row text-left align-items-center">
            <div class="col-12 col-md-6">
              <div class="form-group text-left">
                <label for="">Fecha</label>
                <input
                  class="form-control"
                  type="date"
                  v-model="procedimiento.date"
                />
              </div>
              <div class="form-group text-left">
                <label for="">Numero de la Sala</label>
                <input
                  class="form-control"
                  placeholder="Sala"
                  type="number"
                  v-model="procedimiento.room"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group mb-3">
                <label for="inputGroupSelect00">Procedimiento</label>
                <select
                  class="custom-select"
                  v-model="procedimiento.id_procedure"
                >
                  <option disabled value="">Seleccione un elemento</option>
                  <option
                    v-for="procedimiento in procedimientos"
                    :key="procedimiento"
                    :value="procedimiento.id"
                  >
                    {{ procedimiento.name }}
                  </option>
                </select>
              </div>
              <div class="form-group mb-3">
                <label for="inputGroupSelect01">Hospital</label>
                <select
                  class="custom-select"
                  v-model="procedimiento.id_hospital"
                >
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
            </div>
            <div class="form-group text-left">
              <label for="">Comentario</label><br />
              <textarea class="form-control" v-model="procedimiento.comment">
                Enter text here...
                </textarea
              >
            </div>
          </div>
          <button
            type="submit"
            class="btn m-1 btn-primary"
            v-on:click="registro"
          >
            Registrar
          </button>
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
      name: "RegistroDesarrolloProcedimiento",

      data: function () {
        return {
          doctor: null,
          patient: null,
          nurse: null,
          validPatient: false,
          validDoctor: false,
          validNurse: false,
          procedimiento: {
            room: null,
            date: null,
            id_hospital: null,
            identification_patient: null,
            identification_nurse: null,
            identification_doctor: null,
            id_procedure: null,
            comment: "",
          },
          procedimientos: [],
          hospitales: [],
          result: null,
        };
      },

      methods: {
        backLogin: function () {
          this.$router.push({ name: "home" });
        },
        registro: function () {
          console.log(this.procedimiento);
          if (this.validPatient && this.validDoctor && this.validNurse)
            axios
              .post(
                this.store.state.backURL + "/desarrollo/ingreso",
                this.procedimiento
              )
              .then((result) => {
                alert("El procedimiento ha sido registrado con éxito", "success");
                this.backLogin();
              })
              .catch((error) => {
                console.log(error.response);
                this.result = error.response.data;
                alert("Ocurrió un error registrando el procedimiento", "danger");
              });
        },

        getProcedimientos: function () {
          axios
            .get(this.store.state.backURL + "/procedimientos/")
            .then((response) => {
              this.procedimientos = response.data;
            })
            .catch((error) => {
              console.log(error.response);
              alert("No se pudo conectar al servidor", "danger");
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
                this.procedimiento.identification_patient
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
                this.procedimiento.identification_doctor
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

        searchNurse: function () {
          axios
            .get(
              this.store.state.backURL +
                "/enfermero/" +
                this.procedimiento.identification_nurse
            )
            .then((response) => {
              this.nurse = response.data;
              this.validNurse = true;
            })
            .catch((error) => {
              if (error.response.status == 404)
                  alert("El enfermero no se encuentra registrado en el sistema", "warning");
              else alert("Ocurrió un error en el servidor", "danger");
            });
        },
      },

      created: function () {
        this.getHospitales();
        this.getProcedimientos();
      },
      setup() {
        const store = useStore();
        return { store};
      },
    };
</script>
