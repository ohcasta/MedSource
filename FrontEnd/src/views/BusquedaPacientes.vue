<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Buscar Paciente</h2>
      <form v-on:submit.prevent="processSignUp">
        <div class="ml-auto mr-auto col-12 col-md-6">
          <div class="form-group text-left">
            <input
              class="form-control"
              placeholder="Número de Identificación"
              type="number"
              v-model="patient.identification"
            />
          </div>
          <div class="form-group text-left">
            <input
              class="form-control"
              placeholder="Nombre Completo"
              type="text"
              v-model="patient.full_name"
            />
          </div>
          <div class="form-group text-left">
            <input
              class="form-control"
              type="date"
              v-model="patient.date_of_birth"
            />
          </div>
          <div class="form-group text-left">
            <input
              placeholder="EPS"
              class="form-control"
              type="text"
              v-model="patient.eps_name"
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary m-1"
          v-on:click="searchPatient"
        >
          Buscar Paciente
        </button>
        <button type="button" class="btn btn-primary" v-on:click="goBackHome">
          Volver
        </button>
        <div v-if="patients.length != 0" class="row ml-3 mt-3 " >
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Identificacion</th>
                      <th>Nombre completo</th>
                      <th>Fecha de Nacimiento</th>
                      <th>Tipo de sangre</th>
                      <th>Telefono</th>
                      <th>Estado civil</th>
                      <th>EPS</th>
                      <th>Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template
                      v-for="patient in patients"
                      :key="patient.identification"
                    >
                      <tr>
                        <td>
                          {{ patient.identification }}
                        </td>
                        <td>
                          {{ patient.full_name }}
                        </td>
                        <td>
                          {{ patient.date_of_birth }}
                        </td>
                        <td>
                          {{ patient.blood_type }}
                        </td>
                        <td>
                          {{ patient.phone }}
                        </td>
                        <td>
                          {{ patient.marital_status }}
                        </td>
                        <td>
                          {{ patient.eps.name }}
                        </td>
                        <td>
                            <router-link :to="{ name: 'editarPaciente', params: { identification: patient.identification }}">
                                <button type="button" class="btn btn-primary">Editar</button>
                            </router-link>
                        </td>
                      </tr>
                    </template>
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
    import { useStore } from '@/state';
    import { alert } from "../scripts/utils.js";
    export default {
      name: "BusquedaPaciente",
      data: function () {
        return {
          patient: {
            identification: null,
            full_name: "",
            date_of_birth: null,
            eps_name: null,
          },
          patients: [],
        };
      },
      methods: {
        goBackHome: function () {
          this.$router.push({ name: "home" });
        },
        searchPatient: function () {
          axios
            .get(this.store.state.backURL + "/pacientes/", {
              params: {
                identification: this.patient.identification,
                full_name: this.patient.full_name,
                date_of_birth: this.patient.date_of_birth,
                eps_name: this.patient.eps_name,
              },
            })
            .then((response) => {
              this.patients = response.data;
            })
            .catch((error) => {
              if (error.response.status == 404)
                alert("No se obtuvieron resultados para tu búsqueda", "warning");
              else alert("Ocurrió un error en el servidor", "danger");
            });
        },
      },
      setup() {
        const store = useStore();
        return { store};
      },
    };
</script>