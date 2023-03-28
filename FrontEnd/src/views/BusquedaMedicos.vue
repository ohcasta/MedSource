<template>
  <div class="container mt-4 text-center">
    <div class="col">
      <h2 class="default-title">Buscar medicos</h2>
      <form v-on:submit.prevent="processSignUp">
        <div class="ml-auto mr-auto col-12 col-md-6">
          <div class="form-group text-left">
            <input
              class="form-control"
              placeholder="Identificación"
              type="number"
              v-model="doctor.identification"
            />
          </div>
          <div class="form-group text-left">
            <input
              class="form-control"
              placeholder="Especialización"
              type="text"
              v-model="doctor.specialization"
            />
          </div>
          <div class="form-group text-left">
            <input
              class="form-control"
              placeholder="Hospital"
              type="text"
              v-model="doctor.hospital"
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn m-1 btn-primary"
          v-on:click="getMedicos"
        >
          Buscar medicos
        </button>
        <button
          type="button"
          class="btn m-1 btn-primary"
          v-on:click="goBackHome"
        >
          Volver
        </button>
        <div v-if="doctors.length != 0" class="row ml-3 mt-3">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Identificacion</th>
                      <th>Nombre completo</th>
                      <th>Especializacion</th>
                      <th>Hospital</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="doctor in doctors" :key="doctor.id">
                      <td>{{ doctor.id }}</td>
                      <td>{{ doctor.identification }}</td>
                      <td>{{ doctor.full_name }}</td>
                      <td>{{ doctor.specialization }}</td>
                      <td>{{ doctor.hospital }}</td>
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
    import { useStore } from '@/state';
    import { alert } from "../scripts/utils.js";
    export default {
      name: "BusquedaMedico",
      data: function () {
        return {
          doctor: {
            identification: null,
            specialization: "",
            hospital: "",
          },
          doctors: [],
        };
      },
      methods: {
        goBackHome: function () {
          this.$router.push({ name: "home" });
        },
        getMedicos() {
          axios
            .get(this.store.state.backURL + "/mostrar_medicos/", {
              params: {
                identification: this.doctor.identification,
                specialization: this.doctor.specialization,
                hospital: this.doctor.hospital,
              },
            })
            .then((response) => {
              console.log(response.data);
              this.doctors = response.data;
            })
            .catch((error) => {
              console.log(error.response);
              alert("No se pudo conectar al servidor", "danger");
            });
        },
      },
      setup() {
        const store = useStore();
        return { store};
      },
    };
</script>