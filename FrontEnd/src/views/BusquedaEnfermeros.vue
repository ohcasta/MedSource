<template>
    <div class="container mt-4 text-center">
        <div class="col">
            <h2 class="default-title">Buscar enfermeros</h2>
            <form v-on:submit.prevent="processSignUp">
                <div class="ml-auto mr-auto col-12 col-md-6">
                    <div class="form-group text-left">
                        <input class="form-control"
                               placeholder="Identificación"
                               type="number"
                               v-model="nurse.identification" />
                    </div>
                    <div class="form-group text-left">
                        <input class="form-control"
                               placeholder="Área"
                               type="text"
                               v-model="nurse.area" />
                    </div>
                    <div class="form-group text-left">
                        <input class="form-control"
                               placeholder="Hospital"
                               type="text"
                               v-model="nurse.hospital" />
                    </div>
                </div>
                <button type="submit"
                        class="btn m-1 btn-primary"
                        v-on:click="getEnfermeros">
                    Buscar enfermeros
                </button>
                <button type="button"
                        class="btn m-1 btn-primary"
                        v-on:click="goBackHome">
                    Volver
                </button>
                <div v-if="nurses.length != 0" class="row ml-3 mt-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Identificacion</th>
                                            <th>Nombre completo</th>
                                            <th>Area</th>
                                            <th>Hospital</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="nurse in nurses" :key="nurse.id">
                                            <td>{{ nurse.id }}</td>
                                            <td>{{ nurse.identification }}</td>
                                            <td>{{ nurse.full_name }}</td>
                                            <td>{{ nurse.area }}</td>
                                            <td>{{ nurse.hospital }}</td>
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
          nurse: {
            identification: null,
            area: "",
            hospital: "",
          },
          nurses: [],
        };
      },
      methods: {
        goBackHome: function () {
          this.$router.push({ name: "home" });
        },
        getEnfermeros() {
          axios
            .get(this.store.state.backURL + "/mostrar_enfermeros/", {
              params: {
                identification: this.nurse.identification,
                area: this.nurse.area,
                hospital: this.nurse.hospital,
              },
            })
            .then((response) => {
              console.log(response.data);
              this.nurses = response.data;
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